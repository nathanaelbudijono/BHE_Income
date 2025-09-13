using Microsoft.AspNetCore.Mvc;

namespace Income_BHE.Controllers
{
    public class AuthenticationController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult UnAuthorized()
        {
            return View();
        }
    }
}
