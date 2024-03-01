using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Core.Models;

namespace WebAPI.Core.Filters
{
    public class ValidationAddressAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Student student = context.ActionArguments["student"] as Student;
            if (student == null || student.Address.Length < 10)
            {
                context.ModelState.AddModelError("Address", "Address is so short!");
                context.Result = new BadRequestObjectResult(context.ModelState);
            }
        }
    }
}
