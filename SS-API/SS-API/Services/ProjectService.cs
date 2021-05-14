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
        Task<Project> GetById(int id);
        Task<List<Project>> GetByCourse(int courseId);
        Task Update(Project model);
        Task Delete(int id);
        Task Create(Project model);
    }

    public class ProjectService : IProjectService
    {
        private readonly StreamerContext Db;

        public ProjectService(StreamerContext db)
        {
            Db = db;
        }
        public async Task<Project> GetById(int id)
        {
            //Método retorna objeto através de um ID informado
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
            //Método retorna uma Lista de objetos cujo o CourseId seja igual ao parâmetro informado, ordenando por nome de Projeto
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

        public async Task Update(Project model)
        {
            //Método para atualizar um registro de acordo com o objeto informado
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

        public async Task Delete(int id)
        {
            //Método realiza a exclusão do Projeto de acordo com o ID informaodo
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

        public async Task Create(Project model)
        {
            //Método cria um registro de acordo com o objeto informado
            try
            {
                Db.Set<Project>().Add(model);
                await Db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

    }

}
