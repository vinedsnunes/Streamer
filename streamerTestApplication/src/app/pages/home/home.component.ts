import { CourseModel } from './../../../models/course.model';
import { Component, OnInit } from '@angular/core';
import { StreamertestService } from 'src/services/streamertest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courseModel: CourseModel[];
  projectList: any;
  courseId: number;
  courseList: CourseModel[];

  configSelect = {
    displayKey: "name",      /** se a matriz de objetos passou a chave a ser exibida, o padrão é: @description */
    search: true,           /** true/false para a funcionalidade de pesquisa padronizada para: @false */
    height: 'auto',          /** altura da lista, para ela mostrar uma rolagem, o padrão é: @auto */
    placeholder: 'Select',/** texto a ser exibido quando nenhum item é selecionado, o padrão é @Select */
    moreText: 'mais',        /** texto a ser exibido quando mais de um item for selecionado, o padrão é @More */
  }

  constructor(
    private service: StreamertestService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses(){
    this.service.getAllCourses()
    .subscribe(result => {
      this.courseList = result;
      })
  }

  getByCourse(id: number) {
    this.service.GetByCourse(id)
      .subscribe(result => {
        this.projectList = result;
        console.log(this.projectList)
      })
  }

  changeCourse(ev) {
    this.courseId = ev.value.id;
    this.getByCourse(this.courseId)
  }

  DeleteProject(id){
    this.service.DeleteProject(id)
      .subscribe(() => {
        this.router.navigate(['']);
      })
    this.getAllCourses();
  }
}
