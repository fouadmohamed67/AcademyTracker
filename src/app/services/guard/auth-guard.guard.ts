import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpApisService } from '../apisService/http-apis.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private http:HttpApisService,private router:Router){
    this.getBoolean();
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const res=  this.getBoolean(); 
      return !!res
  }
  
  getBoolean(){
    const res= this.http.get('auth/ChekToken')
      .subscribe(res=>{
        if(res.status===401)
           { 
              this.router.navigate(['login']) 
              return false
           }  
           return true
      }) 
   return res; 
  }
}
