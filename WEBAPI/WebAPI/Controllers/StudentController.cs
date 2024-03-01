using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.DTOs;
using WebAPI.Core.Filters;
using WebAPI.Core.Interfaces;
using WebAPI.Core.Models;
using WebAPI.EF.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public StudentController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Student> students = await _unitOfWork.Students.FindAll(student => student.Id > 0, student => student.Department);
            List<StudentDTO> result = new List<StudentDTO>();
            foreach (Student student in students)
            {
                result.Add(new StudentDTO(student));
            }
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            Student student = await _unitOfWork.Students.Find(student => student.Id == id, student => student.Department);
            if(student == null)
            {
                return NotFound();
            }
            else
            return Ok(new StudentDTO(student));
        }
        [HttpPost]
        public async Task<IActionResult> Add(Student student)
        {
            Student std = await _unitOfWork.Students.Add(student);
            _unitOfWork.Complete();
            if(std == null)
            {
                return BadRequest();
            }
            else
            return Created(new Uri("http://localhost:5151/api/Student?id="+std.Id), std);
        }
        [HttpPost("v2")]
        [ValidationAddress]
        public async Task<IActionResult> AddV2(Student student)
        {
            Student std = await _unitOfWork.Students.Add(student);
            _unitOfWork.Complete();
            if(std == null)
            {
                return BadRequest();
            }
            else
            return Created(new Uri("http://localhost:5151/api/Student?id="+std.Id), std);
        }
        [HttpPatch]
        public async Task<IActionResult> Update(Student student)
        {
            Student std = await _unitOfWork.Students.GetById(student.Id);
            if(std == null)
            {
                return BadRequest();
            }
            else
            {
                std.BirthDate = student.BirthDate;
                std.Name = student.Name;
                std.Age = student.Age;
                std.Image = student.Image;
                std.DeptID = student.DeptID;
                std.Address = student.Address;
                _unitOfWork.Students.Update(std);
                int noRowsAffected = _unitOfWork.Complete();
                if (noRowsAffected > 0)
                {
                    return Ok(std);
                }
                else return BadRequest();
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(Student student)
        {
            Student std = await _unitOfWork.Students.GetById(student.Id);
            if (std == null)
                return BadRequest("Wrong Student Data!");
            else
            {
                _unitOfWork.Students.Delete(std);
                _unitOfWork.Complete();
                return Ok("Student Got Deleted!");
            }
        }
    }
}
