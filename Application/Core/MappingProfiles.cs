using System;
using System.Runtime.CompilerServices;
using Application.Activities.DTOs;
using Application.Profiles.DTOS;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        string? currrentUserId = null;
        CreateMap<Activity, Activity>();
        CreateMap <Activity, UserActivityDto>();
        CreateMap<CreateActivityDTO, Activity>();
        CreateMap<EditActivityDTO, Activity>();
        CreateMap<Activity, ActivityDto>()
        .ForMember(d => d.HostDisplayName, o => o.MapFrom(s =>
         s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
         .ForMember(d => d.HostId, o => o.MapFrom(s =>
         s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
         .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
         .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
         .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
         .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
         .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followers.Count))
         .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.User.Followings.Count))
         .ForMember(d => d.Following, o => o.MapFrom(s => s.User.Followers.Any(x => x.Observer.Id == currrentUserId)));


        CreateMap<User, UserProfile>()
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.Id == currrentUserId)));
        CreateMap<Comment, CommnetDTO>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

        

    }
}
