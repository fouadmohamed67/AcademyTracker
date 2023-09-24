import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/guard/utils/util.service';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent {

  lessons:any;
  constructor(private http:HttpClient,public util:UtilService){
    this.getLessonsOfToday()
    
  }

  getLessonsOfToday(){
    const teacherId=localStorage.getItem('teacherId')  
    const date = new Date(); 
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();  
    let currentDate = `${year}-${month}-${day}`;  
    this.http.get<any>("http://localhost:3000/getAllLessonsOfDate?date='"+currentDate+"'&teacherId="+teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe((res)=>{   
        this.lessons=res.lessons 
        console.log(this.lessons)
    }) 
  }

  submitPrice($event:any){
    const lessonId=$event.target.id;
    const price=document.getElementById(lessonId) as HTMLInputElement
    const value=price.value
    const testData={id:lessonId,data:{price:value,paied:1}}
    this.http.post<any>('http://localhost:3000/findLessonAndUpdate',testData,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(res=>{
      this.getLessonsOfToday()
    })
     
  }

  onChange($event:any){
    const teacherId=localStorage.getItem('teacherId')  
     const currentDate= $event.target.value
    this.http.get<any>("http://localhost:3000/getAllLessonsOfDate?date='"+currentDate+"'&teacherId="+teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe((res)=>{   
        if(res.lessons[0]){
          this.lessons=res.lessons
        }
        else
        {
          this.lessons=undefined
        }
         
        
    }) 
  }
}
