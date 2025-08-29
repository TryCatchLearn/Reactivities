using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Resend;

namespace Infrastructure.Email;

public class EmailSender(IResend resend) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var subject = "Confirm Your Eamil Address";
        var body = $@"
            <p>Hi {user.DisplayName}</p>
            <p>Plase confirm you email by Clicking the Link Below</p>
            <p><a href='{confirmationLink}'>Click here to verify Email</p>
            <pThanks</p>      
            
        ";
        await SendEmailAsync(email, subject, body);
    }


    public Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        throw new NotImplementedException();
    }

    public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
    {
        throw new NotImplementedException();
    }


    private async Task SendEmailAsync(string email, string subject, string body)
    {
        var massage = new EmailMessage
        {
            From = "whatever@resend.dev",
            Subject = subject,
            HtmlBody = body
        };
        massage.To.Add(email);

        Console.WriteLine(massage.HtmlBody);

        await resend.EmailSendAsync(massage);
        // await Task.CompletedTask;

    }
}
