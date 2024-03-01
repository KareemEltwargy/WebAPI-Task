using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Core.Models;

namespace WebAPI.Core.DTOs
{
    public class DepartmentDTO
    {
        public DepartmentDTO()
        {
            
        }
        public DepartmentDTO(Department department)
        {
            ID = department.ID;
            Name = department.Name;
            Description = department.Description;
        }
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
