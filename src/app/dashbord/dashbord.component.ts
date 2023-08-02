import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  dash=true;
  students=false;
  levels=false;
  lessons=false;
  lectures=false;
  courses=false;

 public loadLecturesComponent(){
    this.lectures=true;
    this.dash=false;
    this.students=false;
    this.levels=false;
    this.lessons=false;
    this.courses=false;
  }
  public loadLevelsComponent(){
    this.lectures=false;
    this.students=false;
    this.dash=false
    this.levels=true;
    this.lessons=false;
    this.courses=false;
  }
  public loadLessonsComponent(){
    this.lectures=false;
    this.dash=false;
    this.students=false;
    this.levels=false;
    this.lessons=true; 
    this.courses=false;
  }
  public  loadStudentsComponent(){
    this.lectures=false;
    this.dash=false;
    this.students=true;
    this.levels=false;
    this.lessons=false; 
    this.courses=false;
  }
  public loadCoursesComponent(){
    this.lectures=false;
    this.dash=false;
    this.students=false;
    this.courses=true;
    this.levels=false;
    this.lessons=false;
  }
}
