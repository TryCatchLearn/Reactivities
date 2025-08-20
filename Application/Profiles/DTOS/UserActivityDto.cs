using System;

namespace Application.Profiles.DTOS;

public class UserActivityDto
{
    public required string ActiveId { get; set; }

    public required string Title { get; set; }

    public required string Category { get; set; } 

    public  DateTime Date { get; set; }         
}
