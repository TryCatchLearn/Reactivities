using System;
using AutoMapper.Configuration.Conventions;

namespace Application.Profiles.DTOS;

public class PhotoUploadResult
{
    public required string PublicId { get; set; }

    public required string  Url { get; set; }
}

