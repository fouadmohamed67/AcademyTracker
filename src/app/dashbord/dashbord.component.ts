import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';   
import { UtilService } from '../services/guard/utils/util.service';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent { 
  
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
  

  getCountStudent(){ 
    this.http.get<any>('https://academytracker.onrender.com/studentOfTeacher?teacherId='+this.teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{    
       this.countTotalStudentAcademy=res.students.length;  
    }) 
  }

  getNextStudent(){
    this.http.get<any>('https://academytracker.onrender.com/nextStudent/'+this.teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{  
      this.nextStudent=res.student   
    }) 
  }

  getnumOfLessonsToday(){ 
    this.http.get<any>('https://academytracker.onrender.com/getnumLessonsOfDay/'+this.teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{    
       this.lessonsOfToday=res.data[0].num
    }) 
  }

  getappointmentForWeek(){
    this.http.get<any>('https://academytracker.onrender.com/appointmentForWeek/'+this.teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{    
     this.appointments=res.appointments
    
    }) 
  }

}
