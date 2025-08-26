using System;
using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Update;
using Persistence;


namespace Application.Profiles.Commands;

public class AddPhoto
{
    public class Command : IRequest<Results<Photo>>
    {
        public required IFormFile File { get; set; }
    }


    public class Handler(IUserAccessor userAccessor,
    AppDbContext context,
    IPhotoService photoService) :
    IRequestHandler<Command, Results<Photo>>
    {
        public async Task<Results<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.UploadPhoto(request.File);

            if (uploadResult == null) return Results<Photo>.Failure("Failed to upload Photo", 400);

            var user = await userAccessor.GetUserAsyncs();

            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                UserId = user.Id
            };

            user.ImageUrl ??= photo.Url;

            context.Photos.Add(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Results<Photo>.Success(photo)
                : Results<Photo>.Failure("Poblem saving Photo to DB", 400);
        }
    }
}
