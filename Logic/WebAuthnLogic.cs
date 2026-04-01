using System.Security.Cryptography;
using System.Text;
using AventusSharp.Tools;
using Core.Data;
using Core.Permissions;
using Core.Routes;
using Core.Tools;
using Microsoft.AspNetCore.Authentication;
using PeterO.Cbor;

namespace Core.Logic;

public static class WebAuthnLogic
{
    public static ResultWithError<GetRegisterChallengeResponse> GetRegisterChallenge(HttpContext context)
    {
        ResultWithError<GetRegisterChallengeResponse> result = new ResultWithError<GetRegisterChallengeResponse>();
        int? id = context.GetUserId();
        if (id == null)
        {
            result.Errors.Add(new GenericError(400, "Not Login"));
            return result;
        }

        byte[] challenge = new byte[32];
        RandomNumberGenerator.Fill(challenge);
        string challengeTxt = Base64UrlTextEncoder.Encode(challenge);

        result.Result = new GetRegisterChallengeResponse()
        {
            Challenge = challengeTxt,
            UserId = (int)id,
        };
        return result;
    }

    public static async Task<ResultWithError<bool>> Register(HttpContext context, RegisterRequest credential)
    {
        ResultWithError<bool> result = new ResultWithError<bool>();
        int? id = context.GetUserId();
        if (id == null)
        {
            result.Errors.Add(new GenericError(400, "Not Login"));
            return result;
        }

        byte[] attestationObject = Convert.FromBase64String(credential.AttestationObject.Base64UrlToBase64()); // Base64-encoded attestationObject
        CBORObject attestationCbor = CBORObject.DecodeFromBytes(attestationObject);
        byte[] authData = attestationCbor["authData"].GetByteString();
        byte[] publicKeyCose = ExtractCoseKey(authData);
        (byte[] x, byte[] y) = ExtractXYFromCoseKey(publicKeyCose);
        byte[] combinedArr = CombineArrays(x, y);
        string publicKey = Convert.ToHexString(combinedArr);

        // Persist
        WebAuthnCredentials cred = new WebAuthnCredentials()
        {
            CredentialId = credential.Id,
            Name = credential.Name,
            PublicKey = publicKey,
            UserId = (int)id
        };
       await result.RunAsync(cred.CreateWithError);

        return new ResultWithError<bool>() { Result = true };
    }


    public static async Task<ResultWithError<GetVerifyChallengeResponse>> GetVerifyChallenge(int? userId = null)
    {
        ResultWithError<GetVerifyChallengeResponse> result = new();
        byte[] challenge = new byte[32];
        RandomNumberGenerator.Fill(challenge);
        string challengeTxt = Base64UrlTextEncoder.Encode(challenge);

        if (userId == null)
        {
            result.Result = new GetVerifyChallengeResponse
            {
                Challenge = challengeTxt
            };
        }
        else
        {
            ResultWithError<List<WebAuthnCredentials>> credentials = await WebAuthnCredentials.WhereWithError(p => p.UserId == userId);
            result.Errors = credentials.Errors;
            if (credentials.Result != null)
            {
                result.Result = new GetVerifyChallengeResponse
                {
                    Challenge = challengeTxt,
                    Ids = credentials.Result.Select(p => p.CredentialId).ToList()
                };
            }

        }



        // if we don't know the user 
        return result;
    }

    public static async Task<ResultWithError<WebAuthnCredentials>> Verify(VerifyRequest assertion)
    {
        ResultWithError<WebAuthnCredentials> result = await WebAuthnCredentials.SingleWithError(p => p.CredentialId == assertion.Id);

        if (result.Result == null || !VerifySignature(assertion, result.Result.PublicKey))
        {
            result.Errors.Add(new GenericError(400, "Invalid signature"));
        }

        if (result.Success && result.Result != null)
        {
            ResultWithError<int> resultQuery = await SettingsDM.GetInstance().GetGlobalSettingsInt(OsPermission.PassKey);
            // pas autorisé
            if (resultQuery.Result == 0)
            {
                result.Errors.Add(new GenericError(400, "PassKey not activated"));
                result.Result = null;
            }
            // utiliseur / groupe
            else if (resultQuery.Result == 1)
            {
                if (!await PermissionDM.GetInstance().Can(result.Result.UserId, OsPermission.QuickAuth))
                {
                    result.Errors.Add(new GenericError(403, "PassKey not allowed"));
                    result.Result = null;
                }
            }
        }

        return result;
    }




    private static byte[] ConvertDerToRawSignature(byte[] derSignature)
    {
        // Validate the DER signature structure
        if (derSignature[0] != 0x30)
        {
            throw new ArgumentException("Invalid DER signature: does not start with 0x30 (SEQUENCE).");
        }

        int offset = 2; // Skip the SEQUENCE and its length

        // Extract r
        if (derSignature[offset] != 0x02)
        {
            throw new ArgumentException("Invalid DER signature: expected INTEGER for r.");
        }

        int rLength = derSignature[offset + 1];
        byte[] r = new byte[rLength];
        Array.Copy(derSignature, offset + 2, r, 0, rLength);

        offset += 2 + rLength;

        // Extract s
        if (derSignature[offset] != 0x02)
        {
            throw new ArgumentException("Invalid DER signature: expected INTEGER for s.");
        }

        int sLength = derSignature[offset + 1];
        byte[] s = new byte[sLength];
        Array.Copy(derSignature, offset + 2, s, 0, sLength);

        // Strip leading zeros and pad to 32 bytes
        r = PadTo32Bytes(StripLeadingZeros(r));
        s = PadTo32Bytes(StripLeadingZeros(s));

        // Combine r and s into a single raw signature (r|s)
        byte[] rawSignature = new byte[64];
        Array.Copy(r, 0, rawSignature, 0, 32);
        Array.Copy(s, 0, rawSignature, 32, 32);

        return rawSignature;
    }
    private static byte[] ExtractCoseKey(byte[] authData)
    {
        // AuthData structure: [RP ID Hash (32 bytes) | Flags (1 byte) | SignCount (4 bytes) | AttestedCredentialData (variable)]
        int rpIdHashLength = 32;
        int flagsLength = 1;
        int signCountLength = 4;

        int offset = rpIdHashLength + flagsLength + signCountLength;

        // AttestedCredentialData: [AAGUID (16 bytes) | CredentialID Length (2 bytes) | CredentialID (variable) | Public Key (COSE Key)]
        int aaguidLength = 16;
        int credentialIdLength = (authData[offset + aaguidLength] << 8) | authData[offset + aaguidLength + 1];

        offset += aaguidLength + 2 + credentialIdLength;

        // Public Key (COSE Key) starts at the current offset
        return authData[offset..];
    }
    private static (byte[] x, byte[] y) ExtractXYFromCoseKey(byte[] coseKey)
    {
        // Decode the COSE Key
        CBORObject coseKeyCbor = CBORObject.DecodeFromBytes(coseKey);

        // COSE Key is a CBOR map
        // -1 represents x-coordinate, -2 represents y-coordinate
        byte[] x = coseKeyCbor[-2].GetByteString();
        byte[] y = coseKeyCbor[-3].GetByteString();

        return (x, y);
    }
    private static byte[] CombineArrays(params byte[][] arrays)
    {
        // Calculate the total length of the resulting array
        int totalLength = arrays.Sum(arr => arr.Length);

        // Create a new array to hold the combined result
        byte[] result = new byte[totalLength];

        // Copy each input array into the result array
        int offset = 0;
        foreach (byte[] array in arrays)
        {
            Buffer.BlockCopy(array, 0, result, offset, array.Length);
            offset += array.Length;
        }

        return result;
    }
    private static bool VerifySignature(VerifyRequest assertion, string publicKeyHex)
    {
        // Extract the client data
        byte[] clientDataJSON = Convert.FromBase64String(assertion.ClientDataJSON.Base64UrlToBase64());
        // Extract the authenticator data
        byte[] authenticatorData = Convert.FromBase64String(assertion.AuthenticatorData.Base64UrlToBase64());
        // Extract the signature from DER format
        byte[] signature = Convert.FromBase64String(assertion.Signature.Base64UrlToBase64());
        byte[] signatureBytes = ConvertDerToRawSignature(signature);

        // Construct the data to verify the signature
        string decodedString = Encoding.UTF8.GetString(clientDataJSON);
        byte[] clientDataHash = decodedString.ComputeSHA256Hash();
        byte[] dataToVerify = CombineArrays(authenticatorData, clientDataHash);

        // Create the public key from the HEX string
        byte[] publicKey = Convert.FromHexString(publicKeyHex);
        byte[] x = new byte[32];
        byte[] y = new byte[32];
        Array.Copy(publicKey, 0, x, 0, x.Length);
        Array.Copy(publicKey, x.Length, y, 0, y.Length);

        // Import the public key and validate
        bool isValidSignature = false;
        ECCurve curve = ECCurve.NamedCurves.nistP256;
        using (ECDsa ecdsa = ECDsa.Create(curve))
        {
            ecdsa.ImportParameters(new ECParameters
            {
                Curve = curve,
                Q = new ECPoint
                {
                    X = x,
                    Y = y
                }
            });

            // Verify the signature using the public key and the "dataToVerify" (combined client data and authenticator data)
            isValidSignature = ecdsa.VerifyData(dataToVerify, signatureBytes, HashAlgorithmName.SHA256);
        }

        return isValidSignature;
    }
    private static byte[] StripLeadingZeros(byte[] input)
    {
        int leadingZeros = 0;
        foreach (byte b in input)
        {
            if (b == 0)
                leadingZeros++;
            else
                break;
        }

        return input.Skip(leadingZeros).ToArray();
    }
    private static byte[] PadTo32Bytes(byte[] input)
    {
        if (input.Length == 32)
        {
            return input; // Already 32 bytes
        }
        else if (input.Length < 32)
        {
            byte[] padded = new byte[32];
            Array.Copy(input, 0, padded, 32 - input.Length, input.Length);
            return padded;
        }
        else
        {
            throw new ArgumentException("Value is longer than 32 bytes.");
        }
    }

}