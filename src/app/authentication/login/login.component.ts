import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { HttpApisService } from 'src/app/services/apisService/http-apis.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submited!:boolean
  form:FormGroup  
  errorMessage:string|undefined

  constructor(
    private router:Router,private http:HttpApisService){
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.minLength(5),Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    }); 
  } 
  login(form:FormGroup){
    this.submited=true; 
    if(this.form.valid)
    {
      let testData=new FormData(); 
      testData.append('email',form.value.email);
      testData.append('password',form.value.password);
      this.http.post('auth/login',testData)
      .subscribe({  
        next: res=>{   
            localStorage.setItem('teacherId',res.teacherId) 
            localStorage.setItem("token",res.token)
        },
        error:err=>{ 
          this.errorMessage=err.error.message
          setTimeout(()=>{
            this.errorMessage=undefined;
            this.submited=false; 
          },3000) 
        },
        complete:()=>{
          this.router.navigate(['']);
        } 
      })
    }
  
  }
  get getFormControl() {
    return this.form.controls;
  }
}
