using System;

namespace Application.Core;

public class PaginationParams<TCursor>
{
    public TCursor? Cursor { get; set; }
    private const int MaxPageSize = 50; 

    private int _pageSize = 3; // Default page size

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value; // Enforce max limit
    }
}