using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilePhotos
{
    public class Query : IRequest<Results<List<Photo>>>

    {
        public required string UserId { get; set; }

    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Results<List<Photo>>>
    {
        public async Task<Results<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await context.Users
            .Where(x => x.Id == request.UserId)
            .SelectMany(x => x.Photos)
            .ToListAsync(cancellationToken);

            return Results<List<Photo>>.Success(photos);
        }
    }
}
