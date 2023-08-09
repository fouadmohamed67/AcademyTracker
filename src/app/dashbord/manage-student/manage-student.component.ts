import { Component } from '@angular/core';
import { DashbordComponent } from '../dashbord.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent {
  student:any;
  courses:any;
  constructor(private dash:DashbordComponent,private http:HttpClient){
    
  }
  ngOnInit(){
    this.getStudent()
  }
  getStudent()
  {
    const studentId=this.dash.data.studentId;
    this.http.get<any>('http://localhost:3000/student/'+studentId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{  
      console.log(res.student)
       this.student=res.student;
    })
  }
  getStudentCourse(){
    const studentId=this.dash.data.studentId;
    
  }
}
