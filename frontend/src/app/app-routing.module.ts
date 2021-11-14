import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentsComponent} from "./students/students.component";
import {CoursesComponent} from "./courses/courses.component";
import {CourseStartComponent} from "./courses/course-start/course-start.component";
import {CourseEditComponent} from "./courses/course-edit/course-edit.component";
import {CourseDetailComponent} from "./courses/course-detail/course-detail.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./login/auth-guard";

const routes: Routes = [
  { path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  { path:'courses', component: CoursesComponent,
    canActivate: [AuthGuard]
    , children: [
      { path: '', component: CourseStartComponent},
      { path: 'new', component: CourseEditComponent},
      { path: ':id', component: CourseDetailComponent},
      { path: ':id/edit', component: CourseEditComponent},
    ]},
  { path:'students', component: StudentsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
