import { Component } from '@angular/core';
import { DashbordComponent } from '../dashbord.component';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/utils/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApisService } from 'src/app/services/apisService/http-apis.service';
@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent {
  student:any; 
  availableCourses:any; 
  hidden=true; 
  submited!:boolean
  form:FormGroup;
  registeredCourses:any;
  message:any;
  typeMessage:any;
  studentId:number|undefined

  constructor(private route:ActivatedRoute,private http:HttpApisService,public util:UtilService,private router:Router){

    this.form = new FormGroup({
      day: new FormControl('',[Validators.required ]),
      courseId: new FormControl('',[Validators.required ]), 
      appointment: new FormControl('',[Validators.required ]), 
    });

    this.route.params.subscribe(param=>{
      this.studentId=param['studentId'] 
    }) 

  }

  ngOnInit(){
    this.getStudent()  
  }

  getStudent()
  {  
    this.http.get('student/'+this.studentId)
    .subscribe({
      next: res=>{
          this.student=res.student;  
      },
      complete:()=>{
         this.getAvailableCourses();
         this.getRegisteredCourses()
      }
    })
    
  }
  registerAtCourse(form:FormGroup){

    this.submited=true  
    if(this.form.valid)
    { 
      let testData = new FormData();
      testData.append('studentId',this.student.studentId);
      testData.append('courseId',form.value.courseId);
      testData.append('day',form.value.day);
      testData.append('appointment',form.value.appointment);
      this.http.post('registerAtCourse',testData)
      .subscribe(res=>{
        form.reset();
        this.submited=false
        this.toggleClass(); 
        this.getRegisteredCourses()
      }) 
    }  
  }
  getAvailableCourses(){ 

    this.http.get('CoursesOfLevel/'+this.student.levelId)
    .subscribe(res=>{  
      this.availableCourses=res.courses;
    })

  }  

  getRegisteredCourses(){

    this.http.get('studentCourses/'+this.student.studentId)
    .subscribe(res=>{  
      this.registeredCourses=res.studentCourses 
    })

  }
  removeRegisteration(id:any){

    this.http.delete('removeRegistration?id='+id).subscribe({
      next:res=>{
      }
      ,error:err=>{
        console.log(err)
      },
      complete:()=>{
        this.message="registration removed"
        this.typeMessage="red"
        setTimeout(()=>{
          this.message=undefined
          this.typeMessage=undefined
        },3000)  
        this.getRegisteredCourses()

      }
    })
  }
  toggleClass() { 
    this.hidden=!this.hidden
   } 
  get getFormControl() {
    return this.form.controls;
  }
  navigate(route:string, courseId:number){
    this.router.navigate([route+'/'+courseId])
  }
  
}
