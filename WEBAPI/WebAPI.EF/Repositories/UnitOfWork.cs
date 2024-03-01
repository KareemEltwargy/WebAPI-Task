using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Core.Interfaces;
using WebAPI.Core.Models;
using WebAPI.Core.Repositories;

namespace WebAPI.EF.Repositories
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly ApplicationDbContext Context;
        
        public IBaseRepository<Student> Students { get; private set; }
        public IBaseRepository<Department> Departments { get; private set; }
        public UnitOfWork(ApplicationDbContext _context)
        {
            Context = _context;
            Students = new BaseRepository<Student>(Context);
            Departments = new BaseRepository<Department>(Context);
        }

        public int Complete()
        {
            return Context.SaveChanges();
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
