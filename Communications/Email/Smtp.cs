using System.Net;
using System.Net.Mail;

namespace Core.Communications.Email;


public class Smtp
{

    public void Connect()
    {
        SmtpClient mySmtpClient = new SmtpClient("my.smtp.exampleserver.net");

        mySmtpClient.UseDefaultCredentials = false;
        mySmtpClient.Credentials = new NetworkCredential("username", "password");

        // add from,to mailaddresses
        MailAddress from = new MailAddress("test@example.com", "TestFromName");
        MailAddress to = new MailAddress("test2@example.com", "TestToName");
        MailMessage myMail = new MailMessage(from, to);

        // add ReplyTo
        MailAddress replyTo = new MailAddress("reply@example.com");
        myMail.ReplyToList.Add(replyTo);

        // set subject and encoding
        myMail.Subject = "Test message";
        myMail.SubjectEncoding = System.Text.Encoding.UTF8;

        // set body-message and encoding
        myMail.Body = "<b>Test Mail</b><br>using <b>HTML</b>.";
        myMail.BodyEncoding = System.Text.Encoding.UTF8;
        // text or html
        myMail.IsBodyHtml = true;

        mySmtpClient.Send(myMail);
    }
}