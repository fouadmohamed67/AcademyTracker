import { Component } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApisService } from 'src/app/services/apisService/http-apis.service';

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
  courseId:number | undefined;

  constructor(private route:ActivatedRoute,private httpClient:HttpClient,private http:HttpApisService){

    this.form = new FormGroup({
      lectureName: new FormControl('',[Validators.required,Validators.minLength(3)]) ,
      courseId:new FormControl('')
    }); 

    this.route.params.subscribe(param=>{
      this.courseId=param['courseId'] 
    }) 

    this.getCourse();
    this.getLecturesOfCourse();

  }

  createLecture(form:FormGroup){

    this.submited=true 

    if(this.form.valid && this.file)
    { 
      form.value.courseId=this.courseId
      let testData:FormData = new FormData();
      testData.append('lectureName',form.value.lectureName)
      testData.append('courseId',form.value.courseId)
      testData.append('lecture',this.file) 
        
      this.http.post('lecture',testData).subscribe(res=>{
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
    const courseId=this.courseId;
    this.http.get('getAllLecturesCourse/'+courseId)
    .subscribe(res=>{ 
      this.lectures=res.lectures 
    }) 
  }

  getCourse(){
    const courseId=this.courseId;
    this.http.get('course/'+courseId).subscribe(res=>{
      this.course=res.course
    })
  }

  downloadPDF(id:number){
     this.httpClient.get<Blob>('http://localhost:3000/getFileLecture/'+id, {headers:{'Authorization':'Bearer '+localStorage.getItem('token')},responseType:'blob' as 'json'}) .subscribe(x=>{
      let file = new Blob([x], { type: 'application/pdf' });            
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
     })
  }

  deleteLecture(id:any){
    this.http.delete('lecture?id='+id).subscribe({
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
