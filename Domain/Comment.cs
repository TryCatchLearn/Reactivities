using System;
using System.Net.Http.Headers;

namespace Domain;

public class Comment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string Body { get; set; }

    public DateTime CreateAt { get; set; } = DateTime.UtcNow;

    //Navigation Properties

    public required string UserId { get; set; }
    public User User { get; set; } = null!;


    public required string ActivityId { get; set; }

    public Activity Activity { get; set; } = null!;
}


