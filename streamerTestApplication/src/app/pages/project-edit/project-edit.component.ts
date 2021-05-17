import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/models/course.model';
import { ProjectModel } from 'src/models/project.model';
import { StreamertestService } from 'src/services/streamertest.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  projectForm;
  project: ProjectModel;
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
    placeholder: 'Select',/** texto a ser exibido quando nenhum item é selecionado, o padrão é @Select */
    moreText: 'mais',        /** texto a ser exibido quando mais de um item for selecionado, o padrão é @More */
  }

  configSelect_1 = {
    displayKey: "name",      /** se a matriz de objetos passou a chave a ser exibida, o padrão é: @description */
    search: true,           /** true/false para a funcionalidade de pesquisa padronizada para: @false */
    height: 'auto',          /** altura da lista, para ela mostrar uma rolagem, o padrão é: @auto */
    placeholder: 'Select',/** texto a ser exibido quando nenhum item é selecionado, o padrão é @Select */
    moreText: 'mais',        /** texto a ser exibido quando mais de um item for selecionado, o padrão é @More */
  }
  submitted: boolean;

  constructor(
    private service: StreamertestService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getProject();
    this.getAllCourses();
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

  updateForm() {
    this.projectForm = this.fb.group({
      id: [this.project.id],
      name: [this.project.name],
      image: [this.project.image],
      why: [this.project.why],
      what: [this.project.what],
      whatWillWeDo: [this.project.whatWillWeDo],
      courseId: [this.project.courseId],
      projectStatus: [this.project.projectStatus],
    });
  }

  getProject() {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.GetByIdProject(id)
      .subscribe(result => {
        this.project = result;
        this.projectForm.patchValue(this.project);
        this.updateForm();
      });
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

  changeCourse(ev) {
    this.courseSelectd = ev.value.id;
    this.projectForm.controls.courseId.setValue(this.courseSelectd);
  }
  onSubmit() {
    this.submitted = true;
    if (this.projectForm.valid) {
      const model = new ProjectModel(this.projectForm.value);
      this.service.UpdateProject(model)
        .subscribe(() => {
          this.router.navigate(['/project-details/' + this.projectForm.get('id').value]);
        })
    }
  }


}
