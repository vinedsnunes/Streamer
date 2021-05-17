import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CourseModel } from '../models/course.model';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class StreamertestService {
  private readonly endPoint = environment.urlBase;
  constructor(
    private http: HttpClient
  ) { }


  getAllCourses() {
    const subUrl = 'api/Course/GetAllCourses';
    const request = this.http.get<CourseModel[]>(this.endPoint + subUrl);
    return request;
  }

  CreateCourse(course: CourseModel) {
    const subUrl = 'api/Course/CreateCourse';
    const request = this.http.post<CourseModel>(this.endPoint + subUrl, course);
    return request;
  }

  UpdateCourse(id: any) {
    const subUrl = 'api/Course/UpdateCourse';
    const request = this.http.put<CourseModel>(this.endPoint + subUrl, id);
    return request;
  }

  DeleteCourse(id: number) {
    const subUrl = 'api/Course/DeleteCourse';
    const request = this.http.delete(this.endPoint + subUrl + '/' + id);
    return request;
  }

  CreateProject(model: ProjectModel) {
    const subUrl = 'api/Project/CreateProject';
    const request = this.http.post<CourseModel>(this.endPoint + subUrl, model);
    return request;
  }

  GetByCourse(id: number) {
    const subUrl = 'api/Project/GetByCourse';
    const request = this.http.get<ProjectModel[]>(this.endPoint + subUrl + '/' + id);
    return request;
  }

  UpdateProject(model: ProjectModel) {
    const subUrl = 'api/Project/UpdateProject';
    const request = this.http.put<ProjectModel>(this.endPoint + subUrl, model);
    return request;
  }

  DeleteProject(id: number){
    const subUrl = 'api/Project/DeleteProject';
    const request = this.http.delete<ProjectModel>(this.endPoint + subUrl + '/' + id);
    return request;
  }

  GetByIdProject(id: any){
    const subUrl = 'api/Project/GetByIdProject';
    const request = this.http.get<ProjectModel>(this.endPoint + subUrl + '/' + id);
    return request;
  }
}
