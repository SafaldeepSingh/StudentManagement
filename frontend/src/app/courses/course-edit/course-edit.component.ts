import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../course.service";
import {formatDate} from "@angular/common";
import {StudentService} from "../../students/student.service";
import {Student} from "../../students/student.model";
import {Subscription} from "rxjs";
import {Course} from "../course.model";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  course: Course;
  courseForm: FormGroup;
  studentsEnrolled: Student[];
  studentsToAdd;
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
  ) {
    console.log("constructor ")
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] !=null;
          if(this.editMode){
            this.course = this.courseService.getCourse(this.id);
            if(!this.course){
              this.subscription = this.courseService.coursesChanged.subscribe(courses => {
                this.course = courses[this.id];
                this.initForm();
              });
            }else{this.initForm();}
          }else{this.initForm();}
        }
      );
  }

  private initForm(){
    let name = '';
    let startDate = null;
    let duration = 0;

    if(this.editMode && this.course){
      name=this.course.name;
      startDate = this.course.start_date;
      duration=this.course.duration;
      this.studentsEnrolled = this.course.students;
    }
    this.courseForm = new FormGroup({
      'name': new FormControl(name,[Validators.required]),
      'start_date': new FormControl(startDate?formatDate(startDate, 'yyyy-MM-dd', 'en','UTC'):null,
        [Validators.required]),
      'duration': new FormControl(duration,[Validators.required,Validators.min(1)]),
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.courseService.updateCourse(this.id, this.courseForm.value);
    } else {
      this.courseService.addCourse(this.courseForm.value);
      console.log(this.courseForm.value)
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onRemoveStudent(studentId) {
      this.courseService.removeStudent(studentId,this.id);
      this.onCancel();
  }

  onStudentsAdd() {
    console.log(this.studentsToAdd);
    this.courseService.addStudents(this.studentsToAdd,this.id);
    this.onCancel();
  }
}
