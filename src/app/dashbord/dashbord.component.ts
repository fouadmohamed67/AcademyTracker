import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
   components={
    dash:true,
    students:false,
    levels:false,
    lessons:false,
    lectures:false,
    courses:false,
    manageStudent:false,
    studentCourses:false
  };
  falseComponent={
    dash:false,
    students:false,
    levels:false,
    lessons:false,
    lectures:false,
    courses:false,
    manageStudent:false,
    studentCourses:false
  } 
  data:any;
constructor(){ 
  
}

public loadComponent(componentName:any,data:object){
  this.data=data;  
  this.falseAll();
  for (let property in this.components) {
    if(property == componentName)
    { 
      this.components[property as keyof typeof this.components]=true
    } 
  } 
 }

falseAll(){
  Object.assign(this.components,this.falseComponent)  
} 
  
}
