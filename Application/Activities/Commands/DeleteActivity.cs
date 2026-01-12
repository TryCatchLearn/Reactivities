using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken)
                           ?? throw new ArgumentException("Cannot find this activity in the DB");

            context.Remove(activity);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}