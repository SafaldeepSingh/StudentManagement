import { Component, OnInit } from '@angular/core';
import {StudentService} from "./student.service";
import {Student} from "./student.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  // providers: [StudentService]
})
export class StudentsComponent implements OnInit {
  students: Student[];
  private subscription: Subscription;
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.students = this.studentService.getStudents()
    this.subscription = this.studentService.studentsChanged
      .subscribe(
        (students: Student[]) => {
          this.students = students;
        }
      )
  }
  onEditItem(index: number) {
    this.studentService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
