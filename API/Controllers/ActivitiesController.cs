using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Core;
using SQLitePCL;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
   
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));

    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDTO)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDTO = activityDTO }));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDTO activity)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDTO = activity }));

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));

    }
}
