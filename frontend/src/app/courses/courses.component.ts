import { Component, OnInit } from '@angular/core';
import {CourseService} from "./course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CourseService]
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
