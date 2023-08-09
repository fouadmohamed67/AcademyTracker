import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  days={
    1:"sat",
    2:"sun",
    3:"mon",
    4:"tue",
    5:"wed",
    6:"thu",
    7:"fri"
  }
  constructor() { }

  getDay(index:number)
  {
   return Object.values(this.days)[index-1]
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
}
