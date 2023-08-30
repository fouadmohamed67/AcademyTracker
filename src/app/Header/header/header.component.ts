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
    this.http.get<any>('https://academytracker.onrender.com/teacher',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{  
       this.teacher=res.clearedTeacher 
       
    }) 
  } 
   ngOnInit(){
  
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
