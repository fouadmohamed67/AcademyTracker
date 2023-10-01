import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

 public days={
    1:"sun",
    2:"mon",
    3:"tue",
    4:"wed",
    5:"thu",
    6:"fri",
    7:"sat"
  }
  constructor() { }

  getDay(index:number)
  {
   return Object.values(this.days)[index-1]
  }
  getDayIndex(value:any)
  {
   return Object.values(this.days).findIndex(o=>{ 
    return (o==value)
   })+1
  }
  reshapeTime(time:any){ 
    const splitedtime=time.split(':');
    
    let hours=splitedtime[0];
    let min=splitedtime[1];
    let zone="am";
    if(hours>12){
      hours-=12
      zone="bm"
    }
    return hours+":"+min+" "+zone
  }
  dateFromDateObject(dateObject:any){
    const date = new Date(dateObject); 
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();  
    return `${year}-${month}-${day}`;  
  }
}
