using Microsoft.AspNetCore.Mvc;

namespace Income_BHE.Controllers
{
    public class AccountSettingsController : Controller
    {
        public IActionResult MyAccount()
        {
            return View();
        }
    }
}
