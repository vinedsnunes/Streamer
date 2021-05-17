import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamertestService } from 'src/services/streamertest.service';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss']
})

export class ProjectsDetailsComponent implements OnInit {

  id: any;
  courseId: number;
  image: string;
  name: string;
  projectStatus: number;
  what: string;
  whatWillWeDo: string;
  why: string;

  constructor(
    private service: StreamertestService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.GetByIdProject();
  }

  GetByIdProject() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.GetByIdProject(this.id)
      .subscribe(result => {
        this.id = result['id'],
          this.name = result['name'],
          this.image = result['image'],
          this.why = result['why'],
          this.what = result['what'],
          this.whatWillWeDo = result['whatWillWeDo'],
          this.projectStatus = result['projectStatus'],
          this.courseId = result['courseId']
        console.log(result)
      })
  }

}
