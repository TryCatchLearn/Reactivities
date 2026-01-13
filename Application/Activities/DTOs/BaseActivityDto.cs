using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
    public string Title { get; set; } = "";

    public DateTime Date { get; set; }
    public string Description { get; set; } = "";
    public string Category { get; set; } = string.Empty;

    // location details
    public string City { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
