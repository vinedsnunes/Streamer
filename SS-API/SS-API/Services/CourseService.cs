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
        Task<List<Course>> GetAllCourses();
        Task<Course> GetByCourseId(int id);
        Task CreateCourse(Course model);
        void DeleteCourse(int id);
        Task UpdateCourse(Course model);
    }

    public class CourseService : ICourseService
    {
        private readonly StreamerContext Db;
        public CourseService(StreamerContext db)
        {
            Db = db;
        }

        public async Task<List<Course>> GetAllCourses()
        {
            return await Db.Set<Course>()
                .AsNoTracking()
                .ToListAsync();
        }
        public async Task<Course> GetByCourseId(int id)
        {
            try
            {
                Course course = await Db.Set<Course>()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id);

                return course;
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        public async Task CreateCourse(Course model)
        {
            try
            {
                await Db.Set<Course>().AddAsync(model);
                await Db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        public async Task UpdateCourse(Course model)
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

        public void DeleteCourse(int id)
        {
            foreach (var pro in Db.Set<Project>().Where(e => e.CourseId == id))
            {
                Db.Set<Project>().Remove(pro);
            }
            Db.SaveChanges();

            Course course = Db.Set<Course>()
                    .FirstOrDefault(x => x.Id == id);

            Db.Set<Course>().Remove(course);
            Db.SaveChanges();
        }
    }


}
