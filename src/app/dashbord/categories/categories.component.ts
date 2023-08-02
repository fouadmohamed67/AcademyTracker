import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashbordComponent } from '../dashbord.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private router:Router,public dash:DashbordComponent){
    
  }
}
