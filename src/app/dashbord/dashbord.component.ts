import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';   
import { UtilService } from '../services/guard/utils/util.service';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
   components={
    dash:true,
    students:false,
    levels:false,
    lessons:false,
    lectures:false,
    courses:false,
    manageStudent:false,
    studentCourses:false,
    editRegistration:false
  };
  falseComponent={
    dash:false,
    students:false,
    levels:false,
    lessons:false,
    lectures:false,
    courses:false,
    manageStudent:false,
    studentCourses:false,
    editRegistration:false
  } 
  data:any;
  countTotalStudentAcademy:any;
  lessonsOfToday:any;
  teacherId:any;
  nextStudent:any;
  appointments:any;
  
  constructor(private http:HttpClient,public util:UtilService){
   
   
  }
  ngOnInit(){
    this.teacherId=localStorage.getItem('teacherId') 
    this.getCountStudent();
    this.getnumOfLessonsToday();
    this.getNextStudent();
    this.getappointmentForWeek()
  }

  public loadComponent(componentName:any,data:object){
    this.data=data;  
    this.falseAll();
    for (let property in this.components) {
      if(property == componentName)
      { 
        this.components[property as keyof typeof this.components]=true
      } 
    } 
  }

  falseAll(){
    Object.assign(this.components,this.falseComponent)  
  } 

  getCountStudent(){ 
    this.http.get<any>('http://localhost:3000/studentOfTeacher?teacherId='+this.teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{    
       this.countTotalStudentAcademy=res.students.length;  
    }) 
  }

  getNextStudent(){
    this.http.get<any>('http://localhost:3000/nextStudent/'+this.teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{  
      this.nextStudent=res.student   
    }) 
  }

  getnumOfLessonsToday(){ 
    this.http.get<any>('http://localhost:3000/getnumLessonsOfDay/'+this.teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{    
       this.lessonsOfToday=res.data[0].num
    }) 
  }

  getappointmentForWeek(){
    this.http.get<any>('http://localhost:3000/appointmentForWeek/'+this.teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{    
     this.appointments=res.appointments
    
    }) 
  }

}
