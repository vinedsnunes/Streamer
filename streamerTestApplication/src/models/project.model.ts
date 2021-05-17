import { ProjectStatus } from './project-status.enum';
export class ProjectModel {
  public constructor(init?: Partial<ProjectModel>,) {
    Object.assign(this, init);
  }
  id?: number;
  name: string;
  image: string;
  why: string;
  what: string;
  whatWillWeDo: string;
  projectStatus: ProjectStatus;
  courseId: number;
}
