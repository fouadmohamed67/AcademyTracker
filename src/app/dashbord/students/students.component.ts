import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashbordComponent } from '../dashbord.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  levels:any;
  hidden=true
  submited!:boolean
  form:FormGroup;
  message:any;
  typeMessage:any;
  students:any;
  constructor(private http:HttpClient,public dash:DashbordComponent){
    this.form = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.minLength(3)]), 
      lastName: new FormControl('',[Validators.required,Validators.minLength(3)]), 
      age: new FormControl('',[Validators.required]),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]{11}')]),
      ParentPhoneNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]{11}')]),  
      levelId:new FormControl('',[Validators.required]) ,
       
    }); 
    this.getStudents();
   this.getLevels(); 
  } 

  onChange($event:any){ 
   
    const levelId=$event.target.value
    const teacherId=localStorage.getItem('teacherId') 
    if(isNaN(levelId))
    {
      this.http.get<any>('http://localhost:3000/studentOfTeacher?teacherId='+teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{    
       this.students=res.students; 
    }) 
    return
    } 
    this.http.get<any>('http://localhost:3000/studentOfTeacher?teacherId='+teacherId+'&level.id='+levelId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{    
       this.students=res.students; 

    }) 
  }
  createStudent(form:FormGroup){
    console.log(this.form)
    this.submited=true
    if(this.form.valid)
    { 
      let testData = {
        'firstName':form.value.firstName,
        'lastName': form.value.lastName ,
        'age':form.value.age,
        'phoneNumber': form.value.phoneNumber,
        'ParentPhoneNumber':form.value.ParentPhoneNumber,
        'levelId':form.value.levelId,
        'teacherId':localStorage.getItem('teacherId')
      };  
      this.http.post<any>('http://localhost:3000/student',testData,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
      .subscribe({
       next:(res)=>{ 
       
       },
       error:err=>{
        this.message="unexpected error"
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
        this.message="one student added";
        this.typeMessage='green' 
        setTimeout(()=>{
          this.message=undefined
          this.typeMessage=undefined
        },3000)
       }
      }) 
    }  
  }
 
 async getLevels(){
    this.http.get<any>('http://localhost:3000/level',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe( res =>{   
      this.levels=res.levels; 
    }) 
  } 
  getStudents(){
    const teacherId=localStorage.getItem('teacherId')
     
    this.http.get<any>('http://localhost:3000/studentOfTeacher?teacherId='+teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{   
       this.students=res.students;  
       
    }) 
  }  
  toggleClass() { 
    this.hidden=!this.hidden
   }

  get getFormControl() {
    return this.form.controls;
  }
  

}
