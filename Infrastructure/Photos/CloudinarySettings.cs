using System;

namespace Infrastructure.Photos;

public class CloudinarySettings
{
    public required string CloudName { get; set; }
    public required string ApiKey { get; set; }
    public required string ApiSecret { get; set; }
}
