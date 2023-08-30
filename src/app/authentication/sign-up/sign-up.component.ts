import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  submited!:boolean
  form:FormGroup
  validResponse=true
  errorMessage:string|undefined

  constructor(private router:Router,private http:HttpClient){
    this.form = new FormGroup({
      firstName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      lastName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]{11}')]),
      email: new FormControl('',[Validators.required,Validators.minLength(5),Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]), 
     
    }); 
    
  } 
  createUser(form:FormGroup){ 
    this.submited=true; 
    if(this.form.valid)
    {
      let testData=new FormData();
      testData.append('firstName',form.value.firstName);
      testData.append('lastName',form.value.firstName);
      testData.append('phoneNumber',form.value.phoneNumber);
      testData.append('email',form.value.email);
      testData.append('password',form.value.password);
      this.http.put<any>('https://academytracker.onrender.com/auth/signUp',testData)
      .subscribe({
        next: res=>{
          
        },
        error:err=>{
         
          this.errorMessage=err.error.message
          setTimeout(()=>{
            this.errorMessage=undefined;
            this.submited=false; 
          },3000) 
         
        },
        complete:()=>{
          this.router.navigate(['login']);
        } 
      })
    }
    
    
  }
  get getFormControl() {
    return this.form.controls;
  }
}
