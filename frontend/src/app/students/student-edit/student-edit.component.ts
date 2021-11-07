import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Student} from "../student.model";
import {StudentService} from "../student.service";
import {newArray} from "@angular/compiler/src/util";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  @ViewChild('f', { static: false }) sForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.subscription = this.studentService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.studentService.getStudent(index);
          this.sForm.setValue({
            first_name: this.editedItem.firstName,
            last_name: this.editedItem.lastName,
            dob: formatDate(this.editedItem.dob, 'yyyy-MM-dd', 'en')
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newStudent = new Student(value.first_name, value.last_name,value.dob);
    if (this.editMode) {
      this.studentService.updateStudent(this.editedItemIndex, newStudent);
    } else {
      this.studentService.addStudent(newStudent);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.sForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.studentService.deleteStudent(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
