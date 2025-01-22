using System;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }

    // nav properties
    public ICollection<ActivityAttendee> Activities { get; set; } = [];
    public ICollection<Photo> Photos { get; set; } = [];
}
