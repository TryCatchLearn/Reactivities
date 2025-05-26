using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validator;

public class EditActivityValidator : BASEACTIVITYVALIDATOR< EditActivity.Command, EditActivityDTO>
{
public EditActivityValidator() : base(x=> x.ActivityDTO)
{
        RuleFor(x => x.ActivityDTO).NotEmpty().WithMessage("Id is required");
}
}
