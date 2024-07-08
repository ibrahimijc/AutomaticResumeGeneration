namespace ResumeBuilderService.API.ApiResponse;

public class Response<T>
{
    public string Status { get; set; }
    public string Message { get; set; }
    public Error Error { get; set; }
    public T Data { get; set; }
}

public class PagedResponse<T> : Response<T>
{
    public Pagination Pagination { get; set; }
}

public class Error
{
    public string Code { get; set; }
    public string Message { get; set; }
}

public class ErrorCode
{
    public const string UNAUTHORIZED = "401";
    public const string BAD_REQUEST = "400";
    public const string NO_RESPONSE = "444";
    public const string VALIDATION_FAILED = "412";
    public const string SERVICE_UNAVAILABLE = "504";
    public const string INTERNAL_ERROR = "500";
    public const string NOT_SUPPORTED = "405";
    public const string FORBIDDEN = "403";
    public const string NOT_FOUND = "404";
    public const string DEFAULT_ERROR_CODE = INTERNAL_ERROR;
}

public class ResponseStatus
{
    public const string SUCCESS = "SUCCESS";
    public const string Error = "ERROR";
}

public static class CreateResponse<T> where T : class
{
    public static Response<T> CreateErrorResponse(string errorCode, string message)
    {
        return new Response<T>
            { Status = ResponseStatus.Error, Error = new Error { Code = errorCode, Message = message } };
    }

    public static Response<T> CreateSuccessResponse(T data)
    {
        return new Response<T> { Status = ResponseStatus.SUCCESS, Data = data };
    }

    public static PagedResponse<T> CreatePagedErrorResponse(string errorCode, string message)
    {
        return new PagedResponse<T>
        {
            Status = ResponseStatus.Error, Error = new Error { Code = errorCode, Message = message }, Pagination = null
        };
    }

    public static PagedResponse<T> CreatePagedSuccessResponse(T data, Pagination pagination)
    {
        return new PagedResponse<T> { Status = ResponseStatus.SUCCESS, Data = data, Pagination = pagination };
    }
}