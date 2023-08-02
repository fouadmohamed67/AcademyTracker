import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackendRequestService {

  constructor(private router:Router,private http:HttpClient) {

   }
   async get(req:string,options:any){
     return this.http.get<any>("http://localhost:3000/"+req,options);
   }

}
