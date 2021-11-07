export class Student{
  public firstName: string;
  public lastName: string;
  public dob: Date;
  public _id: string;

  constructor(firstName: string, lastName: string, dob: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
  }
}
