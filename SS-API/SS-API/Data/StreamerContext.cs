using Microsoft.EntityFrameworkCore;

using SS_API.Model;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SS_API.Data
{
    public class StreamerContext : DbContext
    {
        public StreamerContext(DbContextOptions<StreamerContext> option) : base(option) { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Project> Projects { get; set; }

    }
}
