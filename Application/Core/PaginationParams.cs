using System;

namespace Application.Core;

public class PaginationParams<TCursor>
{
    private const int MaxpageSize = 50;

    public TCursor? Cursor { get; set; }

    public int _pageSize = 3;

    public int Pagesize
    {

        get => _pageSize;
        set => _pageSize = (value > MaxpageSize) ? MaxpageSize : value;
    }


}
