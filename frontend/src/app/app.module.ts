import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseItemComponent } from './courses/course-list/course-item/course-item.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import {DropdownDirective} from "./directives/dropdown.directive";
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CourseStartComponent } from './courses/course-start/course-start.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentService} from "./students/student.service";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from "./login/auth-interceptor";
import {AuthGuard} from "./login/auth-guard";
import {LoginService} from "./login/login.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    CoursesComponent,
    CourseListComponent,
    CourseItemComponent,
    CourseDetailComponent,
    DropdownDirective,
    StudentEditComponent,
    CourseEditComponent,
    CourseStartComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [StudentService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
