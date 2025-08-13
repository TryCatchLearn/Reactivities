using System;
using System.Net.Http.Headers;

namespace Application.Activities.DTOs;

public class CommnetDTO
{
    public required string Id { get; set; }

    public required string Body { get; set; }

    public DateTime CreateAt { get; set; }

    public required string UserId { get; set; }

    public required string DisplayName { get; set; }

    public string? ImageUrl { get; set; }
}
