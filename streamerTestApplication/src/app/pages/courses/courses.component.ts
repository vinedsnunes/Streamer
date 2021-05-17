import { CourseModel } from './../../../models/course.model';
import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../../../models/project.model';
import { StreamertestService } from '../../../services/streamertest.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courseForm;
  idCourse: number;
  name: string;
  model: CourseModel;
  submitted: boolean;
  courseList: CourseModel[];

  constructor(
    private service: StreamertestService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllCourses();
  }


  createForm() {
    this.courseForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(100)]],
      }
    )
  }

  onSubmit() {
    this.model = {
      name: this.courseForm.get('name').value,
    }
    this.service.CreateCourse(this.model)
      .subscribe(() => {
        this.router.navigate(['']);
      })
  }

  getAllCourses() {
    this.service.getAllCourses()
     .subscribe(result =>{
       this.courseList = result;
       console.log(this.courseList)
     })
  }
}
