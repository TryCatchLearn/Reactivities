using System;

namespace Application.Core;

public class AppException(int StatusCode, string message, string? details)
{
    public int StatusCode { get; set; } = StatusCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
