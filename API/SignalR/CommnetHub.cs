using System;
using System.Text.RegularExpressions;
using Application.Activities.Commands;
using Application.Activities.Queries;
using CloudinaryDotNet.Actions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub
{

    public async Task SendComment(AddCommnet.Command command)
    {
        var commnet = await mediator.Send(command);
        await Clients.Group(command.ActivityId).SendAsync("ReceiveComment", commnet.Value);
        
    }
    public override async Task OnConnectedAsync()
    {
        var httpcontext = Context.GetHttpContext();
        var activityId = httpcontext?.Request.Query["ActivityId"].ToString();

        // if (string.IsNullOrEmpty(activityId)) throw new HubException("No Activity with this ID");

        await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);

        var results = await mediator.Send(new GetComments.Query { ActivityId = activityId! });

        await Clients.Caller.SendAsync("LoadComment", results.Value);




    }
}
