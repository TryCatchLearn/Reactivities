using System;
using Application.Core;
using Application.Interface;
using Application.Profiles.DTOS;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivity
{
    public class Query : IRequest<Results<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Results<List<UserActivityDto>>>
    {
        public async Task<Results<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.ActivityAttendees
            .Where(u => u.User.Id == request.UserId)
            .OrderBy(a => a.Activity.Date)
            .Select(x => x.Activity)
            .AsQueryable();

            var today = DateTime.UtcNow;

            query = request.Filter switch
            {
                "past" => query.Where(a => a.Date <= today && a.Attendees.Any(x => x.UserId == request.UserId)),
                "hosting" => query.Where(a => a.Attendees.Any(x => x.IsHost && x.UserId == request.UserId)),
                _ => query.Where(a => a.Date >= today && a.Attendees.Any(x => x.UserId == request.UserId))
            };

            var projectedActivities = query.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);

            var activities = await projectedActivities.ToListAsync(cancellationToken);

            return Results<List<UserActivityDto>>.Success(activities);


        }
    }
}

