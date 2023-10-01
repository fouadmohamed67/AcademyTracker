import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';   
import { UtilService } from '../services/utils/util.service';
import { HttpApisService } from '../services/apisService/http-apis.service';
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
  
  constructor(private http:HttpApisService,public util:UtilService){}

  ngOnInit(){
    this.teacherId=localStorage.getItem('teacherId') 
    this.getCountStudent();
    this.getnumOfLessonsToday();
    this.getNextStudent();
    this.getappointmentForWeek()
  }  

  getCountStudent(){ 

    this.http.get('studentOfTeacher?teacherId='+this.teacherId)
    .subscribe(res=>{    
       this.countTotalStudentAcademy=res.students.length;  
    }) 
  }

  getNextStudent(){
    this.http.get('nextStudent/'+this.teacherId)
    .subscribe(res=>{  
      this.nextStudent=res.student   
    }) 
  }

  getnumOfLessonsToday(){ 
    this.http.get('getnumLessonsOfDay/'+this.teacherId)
    .subscribe(res=>{    
       this.lessonsOfToday=res.data[0].num
    }) 
  }

  getappointmentForWeek(){
    this.http.get('appointmentForWeek/'+this.teacherId)
    .subscribe(res=>{    
     this.appointments=res.appointments
    
    }) 
  }

}
