import { Component } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { HttpApisService } from 'src/app/services/apisService/http-apis.service';
@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent {
  student:any;
  courses:any;
  studentId:number|undefined;

  constructor(private route:ActivatedRoute,private http:HttpApisService){
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
    this.http.get('student/'+studentId)
    .subscribe(res=>{  
      console.log(res.student)
       this.student=res.student;
    })
  }
  getStudentCourse(){
    const studentId=this.studentId;
    
  }
}
