using Microsoft.EntityFrameworkCore;

using SS_API.Data;
using SS_API.Model;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SS_API.Services
{
    public interface IProjectService
    {
        Task<Project> GetByIdProject(int id);
        Task<List<Project>> GetByCourse(int courseId);
        Task UpdateProject(Project model);
        Task DeleteProject(int id);
        Task CreateProject(Project model);
    }

    public class ProjectService : IProjectService
    {
        private readonly StreamerContext Db;

        public ProjectService(StreamerContext db)
        {
            Db = db;
        }
        public async Task<Project> GetByIdProject(int id)
        {
            try
            {
                Project project = await Db.Set<Project>()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id);

                return project;
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        public async Task<List<Project>> GetByCourse(int courseId)
        {
            try
            {
                IQueryable<Project> query = Db.Set<Project>().AsQueryable();

                query = query.AsNoTracking().OrderBy(x => x.Name).Where(y => y.CourseId == courseId);

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        public async Task UpdateProject(Project model)
        {
            try
            {
                Db.Set<Project>().Update(model);
                await Db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        public async Task DeleteProject(int id)
        {
            try
            {
                Project project = await Db.Set<Project>()
                    .FirstOrDefaultAsync(x => x.Id == id);

                Db.Set<Project>().Remove(project);
                await Db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        public async Task CreateProject(Project model)
        {
            try
            {
                Db.Set<Project>().Add(model);
                await Db.SaveChangesAsync();
                //return (nameof(GetByIdProject), new { id = model.Id }, model);
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

    }

}
