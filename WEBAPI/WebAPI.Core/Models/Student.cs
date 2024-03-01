using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Core.Models;
using WebAPI.Core.Validators;

namespace WebAPI.Core.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [AgeAllowed(ErrorMessage ="Age Must Be between 18 and 30!")]
        public int? Age { get; set; }
        public string? Image { get; set; }
        public string? Address { get; set; }
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        [ForeignKey(nameof(Department))]
        public int DeptID { get; set; }
        public virtual Department? Department { get; set; }
    }
}
