using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using System.Text;
using MimeKit;

namespace Core.Communications.Email;


public class Gmail
{
    public void Connect()
    {
        UserCredential credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
            new ClientSecrets
            {
                ClientId = "TON_CLIENT_ID",
                ClientSecret = "TON_CLIENT_SECRET"
            },
            new[] { GmailService.Scope.GmailSend },
            "user",
            CancellationToken.None).Result;

        var service = new GmailService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = credential,
            ApplicationName = "EnvoiGmailViaAPI",
        });

        // Construire le message MIME
        var msg = new MimeMessage();
        msg.From.Add(MailboxAddress.Parse("maxime@gmail.com"));
        msg.To.Add(MailboxAddress.Parse("destinataire@example.com"));
        msg.Subject = "Test via API Gmail";

        // Partie texte HTML
        var body = new TextPart("html")
        {
            Text = "<p>Bonjour, voici une pièce jointe.</p>"
        };

        // Charger la pièce jointe
        var attachment = new MimePart("application", "pdf")
        {
            Content = new MimeContent(File.OpenRead("chemin/vers/le/fichier.pdf")),
            ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
            ContentTransferEncoding = ContentEncoding.Base64,
            FileName = "fichier.pdf"
        };

        // Regrouper les parties
        var multipart = new Multipart("mixed");
        multipart.Add(body);
        multipart.Add(attachment);

        msg.Body = multipart;

        using var stream = new MemoryStream();
        msg.WriteTo(stream);
        var rawMessage = Convert.ToBase64String(stream.ToArray())
            .Replace('+', '-')
            .Replace('/', '_')
            .Replace("=", "");

        var gmailMessage = new Message { Raw = rawMessage };
        service.Users.Messages.Send(gmailMessage, "me").Execute();

    }
}