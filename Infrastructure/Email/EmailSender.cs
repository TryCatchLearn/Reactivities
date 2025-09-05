using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Resend;

namespace Infrastructure.Email;

public class EmailSender(IResend resend, IConfiguration config) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var subject = "Confirm Your Eamil Address";
        var body = $@"
            <p>Hi {user.DisplayName}</p>
            <p>Plase confirm you email by Clicking the Link Below</p>
            <p><a href='{confirmationLink}'>Click here to verify Email</a></p>
            <pThanks</p>      
            
        ";
        await SendEmailAsync(email, subject, body);
    }


    public async Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {

        var subject = "Reset Your Password and Enjoy(हर हर महादेव)";
        var body = $@"
            <p>Hi{user.DisplayName}</p>
            <p>Please click this link to reset your password</p>
            <p><a href='{config["ClinetAppUrl"]}/resetPassword?email={email}&code={resetCode}'>
            Click to Reset your Password</a>
            </p>
            <p> Please ignore it like we are ingoring Trumph these days if you did not wish to send this Email हर हर महादेव</p>      
            
        ";
        await SendEmailAsync(email, subject, body);
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
