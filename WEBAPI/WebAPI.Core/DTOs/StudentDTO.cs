using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Core.Models;

namespace WebAPI.Core.DTOs
{
    public class StudentDTO
    {
        public StudentDTO()
        {
            
        }
        public StudentDTO(Student student)
        {
            Id = student.Id;
            Name = student.Name;
            Age = student.Age;
            Image = student.Image;
            Address = student.Address;
            BirthDate = student.BirthDate;
            DeptName = student.Department.Name;
        }
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int? Age { get; set; }
        public string? Image { get; set; }
        public string? Address { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd MMM yyyy}")]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        public string DeptName { get; set; }
    }
}
