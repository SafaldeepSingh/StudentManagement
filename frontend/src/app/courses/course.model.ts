import {Student} from "../students/student.model";

export class Course{
  public name:string;
  public start_date: Date;
  public duration: number;
  public _id: string;
  public students: Student[];
  public studentsNotAdded: Student[];
  constructor( name: string, start_date: Date, duration: number
  ) {
  }
}
