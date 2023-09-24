import { Component } from '@angular/core';
import { DashbordComponent } from '../dashbord.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent {
  student:any;
  courses:any;
  studentId:number|undefined;
  constructor(private route:ActivatedRoute,private http:HttpClient){
    this.route.params.subscribe(param=>{
      this.studentId=param['studentId'] 
    }) 
  }
  ngOnInit(){
    this.getStudent()
  }
  getStudent()
  {
    const studentId=this.studentId;
    this.http.get<any>('http://localhost:3000/student/'+studentId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{  
      console.log(res.student)
       this.student=res.student;
    })
  }
  getStudentCourse(){
    const studentId=this.studentId;
    
  }
}
