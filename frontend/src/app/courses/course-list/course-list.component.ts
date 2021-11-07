import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../course.service";
import {Course} from "../course.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  courses: Course[];
  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses= [];
  }

  ngOnInit(): void {
    this.subscription = this.courseService.coursesChanged.subscribe(courses =>{
      this.courses = courses;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewCourse() {
    this.router.navigate(['new'],{relativeTo: this.route})
  }

}
