using System;
using System.ComponentModel;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interface;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class AddCommnet
{
    public class Command : IRequest<Results<CommnetDTO>>

    {
        public required string Body { get; set; }
        public required string ActivityId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Results<CommnetDTO>>
    {
        public async Task<Results<CommnetDTO>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(x => x.comments)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

            if (activity == null) return Results<CommnetDTO>.Failure("Could not Found activitu", 404);

            var user = await userAccessor.GetUserAsyncs();

            var comment = new Comment
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                Body = request.Body
            };

            activity.comments.Add(comment);

            var result = await context.SaveChangesAsync(cancellationToken) > 0 ;

            return result
            ? Results<CommnetDTO>.Success(mapper.Map<CommnetDTO>(comment))
            : Results<CommnetDTO>.Failure("Faild to add Comment", 400);


             
        }
    }
}
