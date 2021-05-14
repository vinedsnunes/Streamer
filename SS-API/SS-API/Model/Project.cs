using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SS_API.Model
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Why { get; set; }
        public string What { get; set; }
        public string WhatWillWeDo { get; set; }
        public ProjectStatus ProjectStatus { get; set; }
        public int CourseId { get; set; }

    }
}
