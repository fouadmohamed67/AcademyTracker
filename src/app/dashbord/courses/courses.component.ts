import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { HttpApisService } from 'src/app/services/apisService/http-apis.service';
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

  constructor(private http:HttpApisService,private router:Router){
    this.form = new FormGroup({
      courseName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      levelId: new FormControl('',[Validators.required ]), 
    });
   this.getCourses();
   this.getLevels();
  }

  getCourses(){ 
    this.http.get('course')
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
      this.http.post('course',testData)
      .subscribe(res=>{
        form.reset();
        this.submited=false
        this.toggleClass();
        this.getCourses();  
      }) 
    }  
  }

  deleteCourse(id:number){ 
      this.http.delete('course?id='+id).subscribe({
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
    this.http.get('level')
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
