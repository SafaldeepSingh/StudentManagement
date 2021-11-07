import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Course} from "../course.model";
import {CourseService} from "../course.service";
import {StudentService} from "../../students/student.service";
import {Student} from "../../students/student.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit,OnDestroy {

  course: Course;
  students: Student[];
  id: number;
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    console.log("init detail")
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
      this.course = this.courseService.getCourse(this.id);
      this.subscription = this.courseService.coursesChanged.subscribe(courses =>{
          this.course = courses[this.id];
        });
        // this.course = this.courseService.getCourse(this.id);
      }
    );
  }
  onEditCourse() {
    this.router.navigate(['edit'],{relativeTo: this.route});
  }

  getStudent(studentID) {
    return this.students[studentID]
  }

  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }

  onDeleteCourse() {
    this.courseService.deleteCourse(this.id);
    this.router.navigate(['/courses']);

  }
}
