export class CourseModel {
  public constructor(init?: Partial<CourseModel>) {
    Object.assign(this, init);
  }
  id?: number;
  name: string;
}
