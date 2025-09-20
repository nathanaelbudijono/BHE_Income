using Microsoft.AspNetCore.Mvc;

namespace Income_BHE.Controllers
{
    [Route("[controller]")]
    public class BankMutationController : Controller
    {
        [Route("Overview")]
        public IActionResult Overview()
        {
            return View();
        }

        [Route("VirtualAccount")]
        public IActionResult VirtualAccount()
        {
            return View();
        }

        [Route("VirtualAccount/Detail")]
        public IActionResult Detail()
        {
            return View("~/Views/BankMutation/Detail/VaDetail.cshtml");
        }


        [Route("BluAutodebet")]
        public IActionResult BluAutodebet()
        {
            return View();
        }

        [Route("BluAutodebet/Detail")]
        public IActionResult BluDetail()
        {
            return View("~/Views/BankMutation/Detail/BluDetail.cshtml");
        }

        [Route("OfflineAutodebet")]
        public IActionResult OfflineAutodebet()
        {
            return View();
        }

        [Route("OfflineAutodebet/Detail")]
        public IActionResult OfflineDetail()
        {
            return View("~/Views/BankMutation/Detail/OfflineDetail.cshtml");
        }

        [Route("Atm")]
        public IActionResult Atm()
        {
            return View();
        }

        [Route("Atm/Detail")]
        public IActionResult AtmDetail()
        {
            return View("~/Views/BankMutation/Detail/AtmDetail.cshtml");
        }
    }
}
