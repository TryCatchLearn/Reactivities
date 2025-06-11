using System;
using Domain;

namespace Application.Interface;

public interface IUserAccessor
{
    string GetUserId();

    Task<User> GetUserAsyncs();
    
}
