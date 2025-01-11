using System;
using Application.Activities.Commands;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(100).WithMessage("Title must not exceed 100 characters");
        RuleFor(x => x.ActivityDto.Description)
            .NotEmpty().WithMessage("Description is required");
        RuleFor(x => x.ActivityDto.Date)
            .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future");
        RuleFor(x => x.ActivityDto.Category)
            .NotEmpty().WithMessage("Category is required");
        RuleFor(x => x.ActivityDto.City)
            .NotEmpty().WithMessage("City is required");
        RuleFor(x => x.ActivityDto.Venue)
            .NotEmpty().WithMessage("Venue is required");
        RuleFor(x => x.ActivityDto.Latitude)
            .NotEmpty().WithMessage("Latitude is required")
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90");
        RuleFor(x => x.ActivityDto.Longitude)
            .NotEmpty().WithMessage("Longitude is required")
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180");
    }
}
