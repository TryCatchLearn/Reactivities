using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validator;

public class BASEACTIVITYVALIDATOR<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDTO
{
    public BASEACTIVITYVALIDATOR(Func<T, TDto> Selector)
    {
        RuleFor(x => Selector(x).Title)
        .NotEmpty().WithMessage("Title is Required")
        .MaximumLength(100).WithMessage("Title Must NOT EXCEED 100 characted lenhth");
        RuleFor(x => Selector(x).Description).NotEmpty().WithMessage("Description is Required");
        RuleFor(x => Selector(x).Date).GreaterThan(DateTime.UtcNow).WithMessage("Date Must be in THE FUTURE");
        RuleFor(x => Selector(x).Category).NotEmpty().WithMessage("Category is Required");
        RuleFor(x => Selector(x).City).NotEmpty().WithMessage("City is Required");
        RuleFor(x => Selector(x).Venue).NotEmpty().WithMessage("Venue is Required");
        RuleFor(x => Selector(x).Latitude).NotEmpty().WithMessage("Latitude is Required").InclusiveBetween(-90, 90).WithMessage("Lattitude Must be Between -90 to 90");
        RuleFor(x => Selector(x).Longitude).NotEmpty().WithMessage("Longitude is Required").InclusiveBetween(-180, 180).WithMessage("Lattitude Must be Between -180 to 180");
    }

}
