import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  teacher:any;
  constructor( private router:Router,private http:HttpClient){
      this.getUserInfo();
  } 
 async getUserInfo(){
   await this.http.get<any>('http://localhost:3000/teacher',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{  
       this.teacher=res.clearedTeacher 
    })
    
  } 
   ngOnInit(){
  
  } 
  
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
