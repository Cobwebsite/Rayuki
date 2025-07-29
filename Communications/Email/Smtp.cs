using System.Net;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
namespace Core.Communications.Email;


public class Smtp
{

    public void Connect()
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Maxime", "maxime.betrisey@cobwebsite.ch"));
        message.To.Add(MailboxAddress.Parse("maxime.betrisey@hotmail.com"));
        message.Subject = "Test SMTP avec MailKit";

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

        message.Body = multipart;
       
        // message.Body = new TextPart("html")
        // {
        //     Text = "<h1>Test 2</h1><p>Ceci est un test envoyé via MailKit sur le port 465.</p>"
        // };

        using (var client = new SmtpClient())
        {
            try
            {
                client.Connect("elara.kreativmedia.ch", 465, SecureSocketOptions.SslOnConnect);
                client.Authenticate("maxime.betrisey@cobwebsite.ch", "");

                client.Send(message);
                client.Disconnect(true);

                Console.WriteLine("E-mail envoyé !");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur : " + ex.Message);
            }
        }
    }
}