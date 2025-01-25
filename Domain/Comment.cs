using System;

namespace Domain;

public class Comment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Body { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Nav properties
    public required string UserId { get; set; }
    public User User { get; set; } = null!;

    public required string ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
}
