using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Activities.Queries;

public class GetComments
{
    public class Query : IRequest<Results<List<CommnetDTO>>>
    {
        public required string ActivityId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Results<List<CommnetDTO>>>
    {
        public async Task<Results<List<CommnetDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var commnets = await context.Comments
            .Where(x => x.ActivityId == request.ActivityId)
            .OrderByDescending(x => x.CreateAt)
            .ProjectTo<CommnetDTO>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

            return Results<List<CommnetDTO>>.Success(commnets);

        }
    }
}
