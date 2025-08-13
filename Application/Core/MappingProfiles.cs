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
        CreateMap<Activity, Activity>();
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
         .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));


        CreateMap<User, UserProfile>();
        CreateMap<Comment, CommnetDTO>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

    }
}
