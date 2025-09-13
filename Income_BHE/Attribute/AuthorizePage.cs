using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Income_BHE.Attribute
{
    public class AuthorizePage :ActionFilterAttribute
    {
        private readonly IHttpClientFactory _clientFactory;

        public AuthorizePage(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var client = _clientFactory.CreateClient();
            var token = context.HttpContext.Request.Cookies["stamp-token"];

            if (string.IsNullOrEmpty(token))
            {
                context.Result = new RedirectToActionResult("UnAuthorized", "Authentication", null);
                return;
            }

            var request = new HttpRequestMessage(HttpMethod.Get, "https://localhost:44354/api/v1/authentication/validate-token");
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                context.Result = new RedirectToActionResult("UnAuthorized", "Authentication", null);
                return;
            }

            await next(); 
        }

    }
}
