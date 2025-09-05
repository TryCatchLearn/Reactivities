using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class ChangePassDto
{
    [Required]
    public string CurrentPassword { get; set; } = "";

    [Required]
    public string NewPassword { get; set; } = "";
}
