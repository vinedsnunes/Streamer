using Microsoft.EntityFrameworkCore;

using SS_API.Data;
using SS_API.Model;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SS_API.Services
{
    public interface ICourseService
    {
        Task<List<Course>> GetAll();
        Task Create(Course model);
        Task Delete(int id);
        Task Update(Course model);

    }

    public class CourseService : ICourseService
    {
        private readonly StreamerContext Db;
        public CourseService(StreamerContext db)
        {
            Db = db;
        }

        public async Task<List<Course>> GetAll()
        {
            List<Course> courses = await Db.Set<Course>().AsNoTracking().ToListAsync();
            return courses;
        }

        public async Task Create(Course model)
        {
            try
            {
                Db.Set<Course>().Add(model);
                await Db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        public async Task Update(Course model)
        {
            try
            {
                Db.Set<Course>().Update(model);
                await Db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        public async Task Delete(int id)
        {
            try
            {
                Course course = await Db.Set<Course>()
                    .FirstOrDefaultAsync(x => x.Id == id);

                Db.Set<Course>().Remove(course);
                await Db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }
    }


}
