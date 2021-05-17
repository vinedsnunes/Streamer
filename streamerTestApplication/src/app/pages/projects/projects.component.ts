import { ProjectStatus } from './../../../models/project-status.enum';
import { ProjectModel } from './../../../models/project.model';
import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CourseModel } from 'src/models/course.model';
import { StreamertestService } from 'src/services/streamertest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectForm;
  model: ProjectModel;
  courseList: CourseModel[];
  courseSelectd: any;
  image64: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

  projectStatusList: any[] = [
    {
      id: 0,
      status: 'Em desenvolvimento',
    },
    {
      id: 1,
      status: 'Publicado',
    }

  ];
  projectStatusSelected: any;

  configSelect = {
    displayKey: "status",      /** se a matriz de objetos passou a chave a ser exibida, o padrão é: @description */
    search: true,           /** true/false para a funcionalidade de pesquisa padronizada para: @false */
    height: 'auto',          /** altura da lista, para ela mostrar uma rolagem, o padrão é: @auto */
    placeholder: 'Selecione',/** texto a ser exibido quando nenhum item é selecionado, o padrão é @Select */
    moreText: 'mais',        /** texto a ser exibido quando mais de um item for selecionado, o padrão é @More */
  }

  configSelect_1 = {
    displayKey: "name",      /** se a matriz de objetos passou a chave a ser exibida, o padrão é: @description */
    search: true,           /** true/false para a funcionalidade de pesquisa padronizada para: @false */
    height: 'auto',          /** altura da lista, para ela mostrar uma rolagem, o padrão é: @auto */
    placeholder: 'Selecione',/** texto a ser exibido quando nenhum item é selecionado, o padrão é @Select */
    moreText: 'mais',        /** texto a ser exibido quando mais de um item for selecionado, o padrão é @More */
  }

  constructor(
    private service: StreamertestService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {

    this.createForm();
    this.getAllCourses();
    this.changeImage64();

  }

  createForm() {
    this.projectForm = this.fb.group(
      {
        name: [''],
        image: [''],
        why: [''],
        what: [''],
        whatWillWeDo: [''],
        courseId: [''],
        projectStatus: ['']
      }
    )
  }


  onSubmit() {
    this.changeImage64();
    this.model = {
      name: this.projectForm.get('name').value,
      image: this.projectForm.get('image').value,
      why: this.projectForm.get('why').value,
      what: this.projectForm.get('what').value,
      whatWillWeDo: this.projectForm.get('whatWillWeDo').value,
      courseId: this.projectForm.get('courseId').value,
      projectStatus: this.projectForm.get('projectStatus').value,
    }

    this.service.CreateProject(this.model)
      .subscribe(() =>
        this.router.navigate([''])
      ).add();
  }

  getAllCourses() {
    this.service.getAllCourses()
      .subscribe(result => {
        this.courseList = result;
      })
  }


  changeImage64() {
    this.projectForm.controls.image.setValue(this.image64);
  }

  changeProjectStatus(ev) {
    this.projectStatusSelected = ev.value.id;
    this.projectForm.controls.projectStatus.setValue(this.projectStatusSelected);
  }

  changeCourse(ev){
    this.courseSelectd = ev.value.id;
    this.projectForm.controls.courseId.setValue(this.courseSelectd);
  }

}
