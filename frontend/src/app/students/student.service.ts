import {Student} from "./student.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class StudentService{
  host = environment.host+"students/"
  studentsChanged = new Subject<Student[]>();
  startedEditing = new Subject<number>();
  private students: Student[];
  // private students: Student[] = [
  //   new Student("Safaldeep","Singh",new Date("1996-04-29")),
  //   new Student("Anuj","Narang",new Date("1996-08-29")),
  //   new Student("Ansh","Narang",new Date("1996-08-29"))
  // ];
  constructor(
    private http: HttpClient
  ) {
    this.initStudents();
  }
  initStudents(){
    this.http.get<{status: string,students: Student[]}>(this.host+"list").subscribe(data => {
      console.log(data.students);
      this.students = data.students;
      console.log(this.students);
      this.studentsChanged.next(this.students);
    })
  }
  getStudents() {
    return this.students;
  }

  getStudent(index: number) {
    return this.students[index];
  }

  addStudent(student: Student) {
    this.http.post<{status: string,student: Student}>(this.host,{first_name: student.firstName,last_name:student.lastName,dob: student.dob})
      .subscribe(data =>{
        if(data.status=="Success"){
          this.students.push(data.student);
          this.studentsChanged.next(this.students);
        }else{
          alert("Something Went Wrong! Try Again")
        }
      })
  }

  // addStudents(students: Student[]) {
  //   this.students.push(...students);
  //   this.studentsChanged.next(this.students.slice());
  // }

  updateStudent(index: number, newStudent: Student) {
    this.http.put<{status: string,student: Student}>(this.host+this.students[index]._id
      ,{first_name: newStudent.firstName,last_name:newStudent.lastName,dob: newStudent.dob})
      .subscribe(data =>{
        if(data.status=="Success"){
          this.students[index] = data.student;
          this.studentsChanged.next(this.students);
        }else{
          alert("Something Went Wrong! Try Again")
        }
      })
  }

  deleteStudent(index: number) {
    //unlink student form all courses also
    this.http.delete<{status: string, student: Student}>(this.host+this.students[index]._id).subscribe(
      data =>{
        if(data.status=="Success"){
          this.students.splice(index, 1);
          console.log(this.students)
          this.studentsChanged.next(this.students);
        }
      }
    )
  }

}
