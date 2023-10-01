import { Component } from '@angular/core';
import { HttpApisService } from 'src/app/services/apisService/http-apis.service';
import { UtilService } from 'src/app/services/utils/util.service';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent {

  lessons:any;
  constructor(private http:HttpApisService,public util:UtilService){
    this.getLessonsOfToday()
    
  }

  getLessonsOfToday(){
    const teacherId=localStorage.getItem('teacherId')  
    const date = new Date(); 
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();  
    let currentDate = `${year}-${month}-${day}`;  
    this.http.get("getAllLessonsOfDate?date='"+currentDate+"'&teacherId="+teacherId)
    .subscribe((res)=>{  
      if(res.lessons[0])
      {
        this.lessons=res.lessons 
      }
      else
      {
        this.lessons=undefined
      }  
        
    }) 
  }

  submitPrice($event:any){
    const lessonId=$event.target.id;
    const price=document.getElementById(lessonId) as HTMLInputElement
    const value=price.value
    const testData={id:lessonId,data:{price:value,paied:1}}

    this.http.post('findLessonAndUpdate',testData).subscribe(res=>{
      this.getLessonsOfToday()
    }) 

  }

  onChange($event:any){
    const teacherId=localStorage.getItem('teacherId')  
    const currentDate= $event.target.value

    this.http.get("getAllLessonsOfDate?date='"+currentDate+"'&teacherId="+teacherId)
    .subscribe((res)=>{   
      console.log(res.lessons)
        if(res.lessons[0])
        {
          this.lessons=res.lessons 
        }
        else
        {
          this.lessons=undefined
        } 
    }) 

  }

}
