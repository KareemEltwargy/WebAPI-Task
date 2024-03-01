using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Core.Validators
{
    public class AgeAllowedAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            int age = (int)value;
            if(age > 18 && age < 30)
                return true;
            else return false;
        }
    }
}
