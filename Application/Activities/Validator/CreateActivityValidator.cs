using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validator;

public class CreateActivityValidator : BASEACTIVITYVALIDATOR< CreateActivity.Command, CreateActivityDTO>
{
    public CreateActivityValidator() : base(x=> x.ActivityDTO)
    {
        
        

}
}
