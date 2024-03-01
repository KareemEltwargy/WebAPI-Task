using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.DTOs;
using WebAPI.Core.Interfaces;
using WebAPI.Core.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public DepartmentController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("GetAll")]
        //[Authorize]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Department> departments = await _unitOfWork.Departments
                .FindAll(dept => dept.ID > 0, dept => dept.Students);
            List<DepartmentDTO> result = new List<DepartmentDTO>();
            foreach (Department department in departments)
            {
                result.Add(new DepartmentDTO(department));
            }
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            Department department = await _unitOfWork.Departments.Find(dept => dept.ID == id, dept => dept.Students);
            if (department == null)
            {
                return NotFound();
            }
            else
                return Ok(new DepartmentDTO(department));
        }
        [HttpPost]
        public async Task<IActionResult> Add(Department department)
        {
            Department dept = await _unitOfWork.Departments.Add(department);
            _unitOfWork.Complete();
            if (dept == null)
            {
                return BadRequest();
            }
            else
                return Created(new Uri("http://localhost:5151/api/Department?id=" + dept.ID), dept);
        }
        [HttpPatch]
        public async Task<IActionResult> Update(Department department)
        {
            Department dept = await _unitOfWork.Departments.GetById(department.ID);
            if (dept == null)
            {
                return BadRequest();
            }
            else
            {
                dept.Description = department.Description;
                dept.Name = department.Name;
                _unitOfWork.Departments.Update(dept);
                int noRowsAffected = _unitOfWork.Complete();
                if (noRowsAffected > 0)
                {
                    return Ok(dept);
                }
                else return BadRequest();
            }
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(Department department)
        {
            Department dept = await _unitOfWork.Departments.GetById(department.ID);
            if (dept == null)
                return BadRequest("Wrong Student Data!");
            else
            {
                _unitOfWork.Departments.Delete(dept);
                _unitOfWork.Complete();
                return Ok("Student Got Deleted!");
            }
        }
    }
}
