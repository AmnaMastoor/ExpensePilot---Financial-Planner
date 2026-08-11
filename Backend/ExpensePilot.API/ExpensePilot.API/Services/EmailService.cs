using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace ExpensePilot.API.Services
{
    public class EmailService
    {
        public async Task SendEmailAsync(
            string toEmail,
            string subject,
            string body
        )
        {
            var emailHost =
                Environment.GetEnvironmentVariable("EMAIL_HOST");

            var emailPort =
                Environment.GetEnvironmentVariable("EMAIL_PORT");

            var emailUsername =
                Environment.GetEnvironmentVariable("EMAIL_USERNAME");

            var emailPassword =
                Environment.GetEnvironmentVariable("EMAIL_PASSWORD");

            var email = new MimeMessage();

            email.From.Add(
                new MailboxAddress(
                    "ExpensePilot",
                    emailUsername
                )
            );

            email.To.Add(
                new MailboxAddress(
                    "",
                    toEmail
                )
            );

            email.Subject = subject;

            email.Body = new TextPart("html")
            {
                Text = body
            };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                emailHost,
                int.Parse(emailPort!),
                SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(
                emailUsername,
                emailPassword
            );

            await smtp.SendAsync(email);

            await smtp.DisconnectAsync(true);
        }
    }
}