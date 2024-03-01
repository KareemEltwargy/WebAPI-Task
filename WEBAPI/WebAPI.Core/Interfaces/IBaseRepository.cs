using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Core.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T> GetById(int id);
        Task<IEnumerable<T>> GetAll();
        Task<T> Find(Expression<Func<T, bool>> criteria, params Expression<Func<T, object>>[] includes);
        Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> criteria, params Expression<Func<T, object>>[] includes);
        Task<T> Add(T entity);
        T Update(T entity);
        void Delete(T entity);

    }
}
