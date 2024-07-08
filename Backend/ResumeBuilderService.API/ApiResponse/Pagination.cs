using System.Text.Json;

namespace ResumeBuilderService.API.ApiResponse;

public static class PagingDefaults
{
    public const string SortBy = "Id";

    public const bool SortOrderIsAscending = false;

    public const int PageSize = 50;
}

public class PagingParams
{
    public PagingParams()
    {
        PageOffset = 0;
        SortBy = PagingDefaults.SortBy;
        IsAscending = PagingDefaults.SortOrderIsAscending;
        PageSize = PagingDefaults.PageSize;
        OrderBy = new List<SortingParams>();
        Token = string.Empty;
    }

    protected PagingParams(PagingParams paging)
    {
        PageOffset = paging.PageOffset;
        SortBy = paging.SortBy;
        IsAscending = paging.IsAscending;
        PageSize = paging.PageSize;
        OrderBy = paging.OrderBy;
        Token = paging.Token;
    }

    public int PageOffset { get; set; }
    public int PageSize { get; set; }

    /// <summary>
    /// Obselete to be replaced with Order by
    /// </summary>
    public string SortBy { get; set; }

    /// <summary>
    /// Obselete to be replaced with Order by
    /// </summary>
    public bool IsAscending { get; set; }

    public IList<SortingParams> OrderBy { get; set; }

    /// <summary>
    /// Using for searchAfter parameter in elastic search
    /// </summary>
    public string Token { get; set; }

    public Dictionary<string, string> ToDictionary()
    {
        return new()
        {
            { "PageSize", PageSize.ToString() },
            { "PageOffset", PageOffset.ToString() },
            { "SortBy", SortBy },
            { "IsAscending", IsAscending.ToString() },
            { "OrderBy", JsonSerializer.Serialize(OrderBy) },
            { "Token", Token }
        };
    }

    public static bool IsValidParam(string name)
    {
        var propName = name.ToLower();
        return typeof(PagingParams).GetProperties().Any(prop => prop.Name.ToLower() == propName);
    }
}

public class Pagination : PagingParams
{
    public Pagination()
    {
    }

    public Pagination(PagingParams paging) : base(paging)
    {
        Total = 0;
    }

    public long Total { get; set; }
}

public class SortingParams
{
    public string SortBy { get; set; }
    public bool IsAscending { get; set; }
}