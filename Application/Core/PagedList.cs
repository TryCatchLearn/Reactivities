using System;

namespace Application.Core;

public class PagedList<T, TCursor>
{
    public List<T> Items { get; set; } = [];

    public required TCursor NextCursor { get; set; }
}
