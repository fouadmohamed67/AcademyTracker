import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashbordComponent } from '../dashbord.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses:any; 
  levels:any;
  hidden=true
  submited!:boolean
  form:FormGroup;
  message:any;
  typeMessage:any;

  constructor(private http:HttpClient,private router:Router){
    this.form = new FormGroup({
      courseName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      levelId: new FormControl('',[Validators.required ]), 
    });
   this.getCourses();
   this.getLevels();
  }

  getCourses(){ 
    this.http.get<any>('https://academytracker.onrender.com/course',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe((res)=>{   
      this.courses=res.courses;  
      
    }) 
  }

  createCourse(form:FormGroup){
    this.submited=true
    if(this.form.valid)
    { 
      let testData = new FormData();
      testData.append('courseName', form.value.courseName );
      testData.append('levelId',form.value.levelId );
      this.http.post<any>('https://academytracker.onrender.com/course',testData,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe(res=>{
        form.reset();
        this.submited=false
        this.toggleClass();
        this.getCourses();  
      }) 
    }  
  }

  deleteCourse(id:number){ 
      this.http.delete('https://academytracker.onrender.com/course?id='+id,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe({
        next:res=>{
          this.getCourses();  
        }
        ,error:err=>{
          console.log(err)
        },
        complete:()=>{
          this.message="one course Deleted"
          this.typeMessage="red"
          setTimeout(()=>{
            this.message=undefined
            this.typeMessage=undefined
          },3000)  
        }
        
      })
  }

  getLevels(){
    this.http.get<any>('https://academytracker.onrender.com/level',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe((res)=>{   
      this.levels=res.levels;
    }) 
  }

  toggleClass() { 
    this.hidden=!this.hidden
   }

  get getFormControl() {
    return this.form.controls;
  }
  navigate(route:string,courseId:number){
    this.router.navigate([route+'/'+courseId])
  }
  
}
