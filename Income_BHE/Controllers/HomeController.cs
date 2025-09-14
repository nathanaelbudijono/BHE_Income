using Income_BHE.Attribute;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Income_BHE.Controllers
{
    public class HomeController : Controller
    {
        //[TypeFilter(typeof(AuthorizePage))]
        public IActionResult Index()
        {
            return View();
        }
    }
}
