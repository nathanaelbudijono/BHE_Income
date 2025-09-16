using Microsoft.AspNetCore.Mvc;

namespace Income_BHE.Controllers
{
    public class BankMutationController : Controller
    {
        public IActionResult Overview()
        {
            return View();
        }

        public IActionResult VirtualAccount()
        {
            return View();
        }
    }
}
