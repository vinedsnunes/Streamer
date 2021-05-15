using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SS_API.Data;
using SS_API.Model;
using SS_API.Services;

namespace SS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IMapper Mapper;
        private readonly IProjectService _projectService;

        public ProjectController(IMapper mapper, IProjectService projectService)
        {
            Mapper = mapper;
            _projectService = projectService;
        }

        [HttpGet("GetByIdProject")]
        public async Task<IActionResult> GetByIdProject(int id)
        {
            try
            {
                Project result = await _projectService.GetByIdProject(id);
                Project model = Mapper.Map<Project>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        [HttpGet("GetByCourse/{courseId}")]
        public async Task<IActionResult> GetByCourse(int courseId)
        {
            try
            {
                List<Project> result = await _projectService.GetByCourse(courseId);
                List<Project> model = Mapper.Map<List<Project>>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        [HttpPut("UpdateProject")]
        public async Task<IActionResult> UpdateProject([FromBody] Project model)
        {
            try
            {
                Project project = await _projectService.GetByIdProject(model.Id);
                project = Mapper.Map<Project>(model);

                await _projectService.UpdateProject(project);

                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        [HttpDelete("DeleteProject/{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                Project project = await _projectService.GetByIdProject(id);
                await _projectService.DeleteProject(project.Id);

                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        [HttpPost("CreateProject")]
        public async Task<IActionResult> CreateProject([FromBody] Project model)
        {
            try
            {
                Project project = Mapper.Map<Project>(model);
                await _projectService.CreateProject(project);

                return Ok(project.Id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }
    }
}
