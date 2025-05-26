using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Results<string>>
    {
        public required CreateActivityDTO ActivityDTO { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Results<string>>
    {
        public async Task<Results<string>> Handle(Command request, CancellationToken cancellationToken)
        {

            var activity = mapper.Map<Activity>(request.ActivityDTO);
            context.Activities.Add(activity);

           var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Results<string>.Failure("Failed to create the Activity", 400);
            return Results < string >.Success(activity.Id);
        }
    }
}
