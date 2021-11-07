import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../course.model";
import {CourseService} from "../../course.service";

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course
  @Input() index: number
  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
  }
  onSelected(){
    this.courseService.courseSelected.emit(this.course);
  }

}
