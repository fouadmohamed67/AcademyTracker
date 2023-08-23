import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { CategoriesComponent } from './dashbord/categories/categories.component';
import { DashbordComponent } from './dashbord/dashbord.component';

import { AuthGuardGuard } from './services/guard/auth-guard.guard';
import { StudentsComponent } from './dashbord/students/students.component';
import { LecturesComponent } from './dashbord/lectures/lectures.component';
import { LessonsComponent } from './dashbord/lessons/lessons.component';
import { LevelsComponent } from './dashbord/levels/levels.component';
import { CoursesComponent } from './dashbord/courses/courses.component';
import { ManageStudentComponent } from './dashbord/manage-student/manage-student.component';
import { StudentCoursesComponent } from './dashbord/student-courses/student-courses.component'; 
import { EditRegistrationComponent } from './dashbord/student-courses/edit-registration/edit-registration.component';
import { StudentsChartComponent } from './dashbord/students-chart/students-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    CategoriesComponent,
    DashbordComponent,
    StudentsComponent,
    LecturesComponent,
    LessonsComponent,
    LevelsComponent,
    CoursesComponent,
    ManageStudentComponent,
    StudentCoursesComponent ,
    EditRegistrationComponent,
    StudentsChartComponent
  ],
  exports: [
    HeaderComponent 
  ],
  imports: [
     CanvasJSAngularChartsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([  
      {
        path:'login',
        component:LoginComponent,
        canActivate:[]
      },
      {
        path:'signUp',
        component:SignUpComponent
      },
      {
        path:'',
        component:DashbordComponent,
        canActivate:[AuthGuardGuard]
      },
      {
        path:'student',
        component:StudentsComponent
      }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
