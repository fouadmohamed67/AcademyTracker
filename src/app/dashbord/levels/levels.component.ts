import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpApisService } from 'src/app/services/apisService/http-apis.service';

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

  constructor(private http:HttpApisService){

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
      this.http.post('level',testData)
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
     
      this.http.delete('level?id='+id).subscribe({
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

    this.http.get('level')
    .subscribe(res =>{   
      this.levels=res.levels;
    })

  }

  getStudentPerLevel(){

    this.http.get('studentPerLevel')
    .subscribe(res=>{   
      this.countStudent=res.countStudent;  
    }) 

  }

  getCoursesPerLevel(){

    this.http.get('coursesPerLevel')
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
