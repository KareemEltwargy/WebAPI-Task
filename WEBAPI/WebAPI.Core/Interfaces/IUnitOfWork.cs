using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Core.Models;
using WebAPI.Core.Repositories;

namespace WebAPI.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IBaseRepository<Student> Students { get; }
        IBaseRepository<Department> Departments { get; }
        int Complete();
    }
}
