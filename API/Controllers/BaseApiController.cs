using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
                ?? throw new InvalidOperationException("IMediator service is unavailable");
        protected ActionResult HandleResult<T>(Results<T> results)
        {
            if (!results.IsSuccess && results.Code == 404) return NotFound();

            if (results.IsSuccess && results.Value != null) return Ok(results.Value);
            return BadRequest(results.Error);
        }
    }
}
