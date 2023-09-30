import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashbordComponent } from '../../dashbord.component';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/services/guard/utils/util.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent { 
  registeration:any;
  selectedDay:number | undefined
  submited!:boolean;
  form:FormGroup; 
  message:any;
  daysValue:any;
  daysKey:any;
  courseId:number|undefined
  constructor(private http:HttpClient,public util:UtilService,private route:ActivatedRoute,private router:Router){
    this.route.params.subscribe(param=>{
      this.courseId=param['courseId'] 
    }) 
    this.form = new FormGroup({
      day: new FormControl('',[Validators.required ]), 
      appointment: new FormControl('',[Validators.required ]), 
    });
   
    this.getRegisteration()
    this.daysKey=Object.keys(this.util.days)
    this.daysValue=Object.values(this.util.days) 
    
  }
  getRegisteration(){ 
    this.http.get<any>('https://academytracker.onrender.com/getRegisteration/'+this.courseId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe(res=>{
     this.registeration=res.registeration   
     this.form.controls['day'].setValue(this.registeration.day)
     this.form.controls['appointment'].setValue(this.registeration.appointment)
    })
  }
  update(form:FormGroup){
    this.submited=true;  
    
    if(this.form.valid){
      let testData = new FormData();
      testData.append('id',this.registeration.id); 
      testData.append('day',form.value.day);
      testData.append('appointment',form.value.appointment);   
      this.http.post<any>('https://academytracker.onrender.com/updatRegistration',testData,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
      .subscribe(res=>{
        form.reset();
        this.submited=false   
        this.message='Registration updated' 
        setTimeout(()=>{  
          this.router.navigate(['studentCourses/'+this.registeration.studentId])
        },3000)  
      }) 
    }
  }
  get getFormControl() {
    return this.form.controls;
  }
}
