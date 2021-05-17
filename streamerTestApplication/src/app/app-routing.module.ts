import { ProjectsDetailsComponent } from './pages/projects-details/projects-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CoursesComponent },
  { path: 'project', component: ProjectsComponent },
  { path: 'project-details/:id', component: ProjectsDetailsComponent },
  { path: 'project-edit/:id', component: ProjectEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
