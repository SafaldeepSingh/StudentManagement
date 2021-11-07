import {EventEmitter, Injectable} from "@angular/core";
import {Course} from "./course.model";
import {Student} from "../students/student.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {StudentService} from "../students/student.service";
import {Subject} from "rxjs";

@Injectable()
export class CourseService{
  private host = environment.host+"courses/";
  coursesChanged = new Subject<Course[]>();
  courseSelected = new EventEmitter<Course>();
  private courses: Course[];
  private students: any;

  constructor(
    private http: HttpClient,
  ){
    this.initCourses();
  }
  initCourses(){
    this.courses=[];
    this.http.get<{status: string, courses: Course[],courseStudentMap: any,students: any}>(this.host+"list")
      .subscribe(data =>{
        if(data.status=="Success"){
          this.courses=data.courses;
          this.students = data.students;
          for (const key in data.courseStudentMap){
            var studentIds = data.courseStudentMap[key];
            for(var j=0;j<studentIds.length;j++){
              data.courseStudentMap[key][j] = this.students[data.courseStudentMap[key][j]]
            }
          }
          for(var i=0;i<this.courses.length;i++){
            this.courses[i].students = [];
            if(data.courseStudentMap.hasOwnProperty(this.courses[i]._id)){
              this.courses[i].students = data.courseStudentMap[this.courses[i]._id];
            }
          }
          for(i=0;i<this.courses.length;i++){
            this.courses[i].studentsNotAdded=[];
            for(const id in this.students){
              var student = this.students[id];
              if(this.courses[i].students.indexOf(student)==-1){
                this.courses[i].studentsNotAdded.push(student);
              }
            }
          }
          console.log(this.courses);
          this.coursesChanged.next(this.courses);
        }
      })
  }
  getCourses() {
    return this.courses;
  }
  getStudents(){
    return this.students;
  }
  getCourse(id: number){
    return this.courses[id];
  }

  addCourse(course: Course) {
    this.http.post<{status: string,course: Course}>(this.host
      ,{name: course.name,start_date:course.start_date,duration: course.duration})
      .subscribe(data =>{
        if(data.status=="Success"){
          this.courses.push(data.course);
          this.coursesChanged.next(this.courses);
        }else{
          alert("Something Went Wrong! Try Again")
        }
      });
  }

  updateCourse(index: number, newCourse: Course) {
    this.http.put<{status: string,course: Course}>(this.host+this.courses[index]._id
      ,{name: newCourse.name,start_date:newCourse.start_date,duration: newCourse.duration})
      .subscribe(data =>{
        if(data.status=="Success"){
          this.courses[index] = data.course;
          this.coursesChanged.next(this.courses);
        }else{
          alert("Something Went Wrong! Try Again")
        }
      });
  }

  deleteCourse(index: number) {
    this.http.delete<{status: string, course: Course}>(this.host+this.courses[index]._id).subscribe(
      data =>{
        if(data.status=="Success"){
          this.courses.splice(index, 1);
          this.coursesChanged.next(this.courses);
        }
      }
    );
  }


  addStudents(studentsToAdd, index: number) {
    this.http.post<{status: string}>(this.host+"students",
      {student_ids: studentsToAdd,course_id: this.courses[index]._id})
      .subscribe(data =>{
        if(data.status=="Success"){
          this.initCourses();
        }
      });
  }

  removeStudent(studentId,courseIndex) {
    this.http.post<{status:string}>(this.host+"students/remove",
      {student_id: studentId,course_id: this.courses[courseIndex]._id}).subscribe(
      data=>{
        if(data.status=="Success"){
          this.initCourses();
        }
      }
    )
  }
}
