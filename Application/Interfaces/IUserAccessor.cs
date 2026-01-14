using System;
using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
    Task<User> GetUserWithPhotosAsync();
}
