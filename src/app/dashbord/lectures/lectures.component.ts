import { Component } from '@angular/core';
import { DashbordComponent } from '../dashbord.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { map } from 'rxjs';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent {
  file:any; 
  lectures:any;
  hidden=true
  submited!:boolean
  form:FormGroup;
  message:any;
  typeMessage:any;
  course:any;
  constructor(private dash:DashbordComponent,private http:HttpClient){
    this.form = new FormGroup({
      lectureName: new FormControl('',[Validators.required,Validators.minLength(3)]) 
    }); 
    this.getCourse();
    this.getLecturesOfCourse();
  }

  createLecture(form:FormGroup){
    this.submited=true 
    if(this.form.valid && this.file)
    { 
      let testData = new FormData();
      testData.append('lectureName', form.value.lectureName );
      testData.append('courseId',this.dash.data.courseId );
      testData.append('lecture',this.file); 
      this.http.post<any>('http://localhost:3000/lecture',testData,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(res=>{
        form.reset();
        this.submited=false
        this.toggleClass(); 
      }) 
    }  
    this.getLecturesOfCourse();
  } 

  onFileChange($event:any){ 
    this.file=$event.target.files[0]  
  }

  getLecturesOfCourse(){
    const courseId=this.dash.data.courseId;
    this.http.get<any>('http://localhost:3000/getAllLecturesCourse/'+courseId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{ 
      this.lectures=res.lectures 
    }) 
  }

  getCourse(){
    const courseId=this.dash.data.courseId;
    this.http.get<any>('http://localhost:3000/course/'+courseId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(res=>{
      this.course=res.course
    })
  }

  downloadPDF(id:number){
     this.http.get<Blob>('http://localhost:3000/getFileLecture/'+id, {headers:{'Authorization':'Bearer '+localStorage.getItem('token')},responseType:'blob' as 'json'}) .subscribe(x=>{
      let file = new Blob([x], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
     })
  }

  deleteLecture(id:any){
    this.http.delete('http://localhost:3000/lecture?id='+id,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe({
        next:res=>{
          
        }
        ,error:err=>{
          this.message="can not delete lecture"
          this.typeMessage="orange"
          setTimeout(()=>{
            this.message=undefined
            this.typeMessage=undefined
          },3000) 
          
        },
        complete:()=>{
          this.message="one lecture Deleted"
          this.typeMessage="red"
          setTimeout(()=>{
            this.message=undefined
            this.typeMessage=undefined
          },3000) 
          this.getLecturesOfCourse(); 
        }
        
      })
  }
  toggleClass() { 
    this.hidden=!this.hidden
   }  
  get getFormControl() {
    return this.form.controls;
  }
}
