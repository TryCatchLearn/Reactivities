using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Microsoft.AspNetCore.Mvc;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class FriendGridController : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<PagedList<ActivityDto, DateTime?>>> GetFriendGrid([FromQuery] ActivityParams activityParams)
    {
        return HandleResult(await Mediator.Send(new GetActivityList.Query { Params = activityParams }));
    }



    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivityDetail(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));

    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDTO)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDTO = activityDTO }));
    }

    [HttpPut("{id}")]
    [Authorize(Policy ="IsActivityHost")]
    public async Task<ActionResult> EditActivity(string id, EditActivityDTO activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDTO = activity }));

    }

    [HttpDelete("{id}")]
    [Authorize(Policy ="IsActivityHost")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));

    }
    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(string id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
    }
}
