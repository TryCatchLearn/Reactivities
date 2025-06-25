using System;
using System.Security.Claims;
using Application.Interface;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor

{
    public async Task<User> GetUserAsyncs()
    {
        return await dbContext.Users.FindAsync(GetUserId())
            ?? throw new UnauthorizedAccessException("No User is Logged In");
    }

    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)

        ?? throw new Exception("No User Found");
    }

    public async Task<User> GetUserWithPhotosAsync()
    {

        var userId = GetUserId();

        
        return await dbContext.Users
        .Include(x => x.Photos)
        .FirstOrDefaultAsync(x => x.Id == userId)
            ?? throw new UnauthorizedAccessException("No User is Logged In");
    }
}
