import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpApisService {

  constructor(private http:HttpClient) { }
  headers={headers:{'Authorization':'Bearer '+localStorage.getItem('token')}}
  get(url:string){
    return this.http.get<any>("http://localhost:3000/"+url,this.headers);
  }
  post(url:string,postData:any){
    return this.http.post<any>("http://localhost:3000/"+url,postData,this.headers);
  }
  put(url:string,putData:any){
    return this.http.put<any>("http://localhost:3000/"+url,putData,this.headers)
  }
  delete(url:string){
    return this.http.delete<any>("http://localhost:3000/"+url,this.headers)
  }
}
