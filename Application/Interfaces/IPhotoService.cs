using System;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoService
{
    Task<UploadResult?> UploadPhoto(IFormFile file);
    Task<DeletionResult> DeletePhoto(string publicId);
}
