using System;
using Application.Core;

namespace Application.Activities.Queries;

public class ActivityParams : PaginationParams<DateTime?>
{
    public string? Filter { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
}
