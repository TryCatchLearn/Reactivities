using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<List<ActivityDto>>> { }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
        public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await context.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, 
                    new { currentUserId = userAccessor.GetUserId() })
                .ToListAsync();

            return Result<List<ActivityDto>>.Success(activities);
        }
    }
}
