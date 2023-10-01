import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpApisService } from 'src/app/services/apisService/http-apis.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  teacher:any;

  constructor( public router:Router,private http:HttpApisService){
      this.getUserInfo();
  } 

  getUserInfo(){
    this.http.get('teacher')
    .subscribe(res=>{  
       this.teacher=res.clearedTeacher 
    }) 
  }

  logOut(){

    localStorage.removeItem('token');
    localStorage.removeItem('teacherId')
    this.router.navigate(['login']);
  }

  navigate(route:string){
    this.router.navigate([route])
  }
  
}
