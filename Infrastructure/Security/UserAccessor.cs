using System;
using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? throw new Exception("No user found");
    }

    public async Task<User> GetUserAsync()
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedAccessException("No user is logged in");
        }

        var user = await dbContext.Users.FindAsync(userId)
                   ?? throw new UnauthorizedAccessException("Cannot find user in the DB");

        return user;
    }
}