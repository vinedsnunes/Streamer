using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SS_API.Data;
using SS_API.Model;
using SS_API.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly IMapper Mapper;

        public CourseController(ICourseService courseService, IMapper mapper)
        {
            _courseService = courseService;
            Mapper = mapper;
        }

        [HttpGet("GetAllCourses")]
        public async Task<IActionResult> GetAllCourses()
        {
            try
            {
                List<Course> result = await _courseService.GetAllCourses();
                List<Course> model = Mapper.Map<List<Course>>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        [HttpGet("GetByCourseId/{id}")]
        public async Task<IActionResult> GetByCourseId(int id)
        {
            try
            {
                Course result = await _courseService.GetByCourseId(id);
                Course model = Mapper.Map<Course>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        [HttpPost("CreateCourse")]
        public async Task<IActionResult> CreateCourse([FromBody] Course model)
        {
            try
            {
                Course course = Mapper.Map<Course>(model);
                await _courseService.CreateCourse(course);

                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        [HttpPut("UpdateCourse")]
        public async Task<IActionResult> UpdateCourse([FromBody] Course model)
        {
            try
            {
                Course course = await _courseService.GetByCourseId(model.Id);
                course = Mapper.Map<Course>(model);

                await _courseService.UpdateCourse(course);

                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }

        [HttpDelete("DeleteCourse/{id}")]
        public void DeleteCourse(int id)
        {
            try
            {
                _courseService.DeleteCourse(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error: ", ex);
            }
        }
    }
}
