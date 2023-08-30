import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent {
   
  levels:any;
  hidden=true
  submited!:boolean
  form:FormGroup;
  message:any;
  typeMessage:any;
  countCourses:any;
  countStudent:any;
  constructor(private http:HttpClient){
    this.form = new FormGroup({
      levelName: new FormControl('',[Validators.required,Validators.minLength(3)])
       
    });
    this.getCoursesPerLevel();
   this.getStudentPerLevel();
   this.getLevels();
   
  } 

  createlevel(form:FormGroup){
    this.submited=true
    if(this.form.valid)
    { 
      let testData = new FormData();
      testData.append('levelName', form.value.levelName ); 
      this.http.post<any>('https://academytracker.onrender.com/level',testData,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
      .subscribe({
       next:(res)=>{ 
        this.getCoursesPerLevel();
        this.getStudentPerLevel();
        this.getLevels(); 
       },
       error:err=>{
        this.message="try another name"
        this.typeMessage="red"
        setTimeout(()=>{
          this.message=undefined
          this.typeMessage=undefined
        },3000) 
       },
       complete:()=>{
        form.reset();
        this.submited=false;
        this.toggleClass();  
        this.message="one level added";
        this.typeMessage='green' 
        setTimeout(()=>{
          this.message=undefined
          this.typeMessage=undefined
        },3000)
       }
      }) 
    }  
  }

  deletelevel(id:number){
     
      this.http.delete('https://academytracker.onrender.com/level?id='+id,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}).subscribe({
        next:res=>{
          this.getLevels(); 
          this.getCoursesPerLevel();
          this.getStudentPerLevel(); 
        }
        ,error:err=>{
          this.message="can not delete"
          this.typeMessage="red"
          setTimeout(()=>{
            this.message=undefined
            this.typeMessage=undefined
          },3000) 
          
        },
        complete:()=>{
          this.message="one level Deleted"
          this.typeMessage="red"
          setTimeout(()=>{
            this.message=undefined
            this.typeMessage=undefined
          },3000)  
        }
        
      })
  }

 async getLevels(){
    this.http.get<any>('https://academytracker.onrender.com/level',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(   res =>{   
      this.levels=res.levels;
      
    }) 
  }

  getStudentPerLevel(){
    this.http.get<any>('https://academytracker.onrender.com/studentPerLevel',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{   
      this.countStudent=res.countStudent;  
    }) 
  }

  getCoursesPerLevel(){
    this.http.get<any>('https://academytracker.onrender.com/coursesPerLevel',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{   
      this.countCourses=res.countCourses;  
    }) 
  }

  toggleClass() { 
    this.hidden=!this.hidden
   }

  get getFormControl() {
    return this.form.controls;
  }
  
}
