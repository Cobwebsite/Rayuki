using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Text.Json;
using AventusSharp.Data.Manager.DB;
using AventusSharp.Tools;
using AventusSharp.Tools.Attributes;
using Core.Data;

namespace Core.Logic
{
    [Export("Errors")]
    public enum SsoCode
    {
        TokenFailed,
        UserInfoFailed,
        IdentifierNotFound,
        NameNotFound,
        PictureNotFound,
        UserNotRegistered
    }

    [Export("Errors")]
    public class SsoError : GenericError<SsoCode>
    {
        public SsoError(SsoCode code, string message, [CallerFilePath] string callerPath = "", [CallerLineNumber] int callerNo = 0) : base(code, message, callerPath, callerNo)
        {
        }
    }

    public class SsoProviderDM : DatabaseDM<SsoProviderDM, SsoProvider>
    {

        public async Task<ResultWithError<User>> Login(int ssoId, string code)
        {
            ResultWithError<User> result = new();
            ResultWithError<SsoProvider> providerQuery = await SsoProvider.GetByIdWithError(ssoId);
            if (!providerQuery.Success || providerQuery.Result == null)
            {
                result.Errors = providerQuery.Errors;
                return result;
            }
            SsoProvider provider = providerQuery.Result;
            string? token = await GetAccessToken(provider, code);
            if (token == null)
            {
                result.Errors.Add(new SsoError(SsoCode.TokenFailed, "Token validation failed"));
                return result;
            }

            ResultWithError<SsoUserInfo> userInfo = await GetUserInfo(provider, token);
            if (userInfo == null)
            {
                result.Errors.Add(new SsoError(SsoCode.UserInfoFailed, "User info failed"));
                return result;
            }

            if (!userInfo.Success || userInfo.Result == null)
            {
                result.Errors = userInfo.Errors;
                return result;
            }

            ResultWithError<User> identifyResult = await Identify(provider, userInfo.Result);

            if (!identifyResult.Success || identifyResult.Result == null)
            {
                result.Errors = identifyResult.Errors;
                return result;
            }
            result.Result = identifyResult.Result;
            return result;
        }

        private async Task<string?> GetAccessToken(SsoProvider provider, string code)
        {
            FormUrlEncodedContent requestBody = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("client_id", provider.ClientId),
                new KeyValuePair<string, string>("client_secret", provider.ClientSecret),
                new KeyValuePair<string, string>("code", code)
            });

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, provider.TokenEndpoint)
            {
                Content = requestBody
            };
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            string jsonResponse = await response.Content.ReadAsStringAsync();
            using JsonDocument jsonDoc = JsonDocument.Parse(jsonResponse);
            return jsonDoc.RootElement.GetProperty("access_token").GetString();
        }

        private async Task<ResultWithError<SsoUserInfo>> GetUserInfo(SsoProvider provider, string token)
        {
            ResultWithError<SsoUserInfo> result = new ResultWithError<SsoUserInfo>();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, provider.UserInfoEndpoint);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            request.Headers.UserAgent.Add(new ProductInfoHeaderValue("Rayuki", HttpServer.Version));

            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                result.Errors.Add(new SsoError(SsoCode.UserInfoFailed, "User info failed"));
                return result;
            }

            string jsonResponse = await response.Content.ReadAsStringAsync();
            using JsonDocument jsonDoc = JsonDocument.Parse(jsonResponse);

            JsonElement identifierElement;
            JsonElement? pictureElement = null;
            bool findIdentifier = jsonDoc.RootElement.TryGetProperty(provider.UserIdentifier, out identifierElement);
            if (provider.UserPicture != null)
            {
                JsonElement pictureElementTemp;
                bool findPicture = jsonDoc.RootElement.TryGetProperty((string)provider.UserPicture, out pictureElementTemp);
                if (findPicture)
                {
                    pictureElement = pictureElementTemp;
                }
                else
                {
                    result.Errors.Add(new SsoError(SsoCode.PictureNotFound, "Picture field not found"));
                }
            }
            if (!findIdentifier)
            {
                result.Errors.Add(new SsoError(SsoCode.IdentifierNotFound, "Identifier field not found"));
            }

            JsonElement nameElement;
            bool findName = jsonDoc.RootElement.TryGetProperty(provider.UserName, out nameElement);
            if (!findName)
            {
                result.Errors.Add(new SsoError(SsoCode.NameNotFound, "Name field not found"));
            }


            if (result.Success)
            {
                string[] parts = nameElement.ToString().Split(' ', 2);
                string firstname = parts[0];
                string lastname = parts.Length > 1 ? parts[1] : "";
                result.Result = new SsoUserInfo()
                {
                    Firstname = firstname,
                    Lastname = lastname,
                    Identifier = identifierElement.ToString(),
                    Picture = pictureElement != null ? pictureElement.ToString() : null
                };
            }

            return result;
            // return JsonSerializer.Deserialize<GithubUser>(jsonResponse);
        }

        private async Task<ResultWithError<User>> Identify(SsoProvider provider, SsoUserInfo userInfo)
        {
            ResultWithError<User> result = await User.SingleWithError(p => p.Username == userInfo.Identifier);
            if (result.Success && result.Result != null)
            {

                if (result.Result.Picture.Uri == "" && !string.IsNullOrEmpty(userInfo.Picture))
                {
                    result.Run(() => result.Result.Picture.Download(result.Result, userInfo.Picture));
                    await result.RunAsync(() => result.Result.UpdateWithError());
                }

                return result;
            }

            if (provider.AutoCreateUser)
            {
                User user = new User()
                {
                    Firstname = userInfo.Firstname,
                    Lastname = userInfo.Lastname,
                    Username = userInfo.Identifier,
                    Password = null,
                    SsoProviderId = provider.Id
                };
                result.Errors = await user.CreateWithError();
                if (result.Success)
                {
                    result.Result = user;
                    if (result.Result.Picture.Uri == "" && !string.IsNullOrEmpty(userInfo.Picture))
                    {
                        result.Run(() => result.Result.Picture.Download(result.Result, userInfo.Picture));
                        await result.RunAsync(() => result.Result.UpdateWithError());
                    }
                }
                return result;
            }

            result.Errors.Add(new SsoError(SsoCode.UserNotRegistered, "Username isn't registered"));

            return result;
        }
    }

    public class SsoUserInfo
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Identifier { get; set; }
        public string? Picture { get; set; }
    }
}