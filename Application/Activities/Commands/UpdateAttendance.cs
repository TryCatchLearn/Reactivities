using System;
using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Results<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context)
    : IRequestHandler<Command, Results<Unit>>
    {
        public async Task<Results<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
            .Include(x => x.Attendees)
            .ThenInclude(x => x.User)
            .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null) return Results<Unit>.Failure("Activity Not Found", 400);

            var user = await userAccessor.GetUserAsyncs();

            var atteendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);

            var isHost = activity.Attendees.Any(x => x.IsHost && x.UserId == user.Id);


            if (atteendance != null)
            {
                if (isHost) activity.IsCancelled = !activity.IsCancelled;
                else activity.Attendees.Remove(atteendance);

            }
            else
            {
                activity.Attendees.Add(new ActivityAttendee
                {
                    UserId = user.Id,
                    ActivityId = activity.Id,
                    IsHost = false
                });
            }
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result
            ? Results<Unit>.Success(Unit.Value)
            : Results<Unit>.Failure("Problmem Updating DB", 400);
        }
    }
}
