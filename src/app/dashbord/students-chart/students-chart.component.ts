import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-students-chart',
  templateUrl: './students-chart.component.html',
  styleUrls: ['./students-chart.component.css']
})
export class StudentsChartComponent {
  chartData=[0,0,0,0,0,0,0];
   
  constructor(private http:HttpClient ){
    this.getStudentsPerDay()
  }
  
   chartOptions = {
	  
	}
  getStudentsPerDay(){
    const teacherId=localStorage.getItem('teacherId')
    this.http.get<any>('https://academytracker.onrender.com/getStudentsPerDay/'+teacherId,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .subscribe((res)=>{   
     const data=res.data 
      for(let i=0;i<res.data.length;i++)
      {
        this.chartData[data[i].day-1]=data[i].num  
      } 
     
      this.chartOptions={
        title: {
          text: "students per day"
        },
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        axisY: {
        includeZero: true,
        valueFormatString: " #,##0 "
        },
        data: [{
        type: "line", //change type to bar, line, area, pie, etc 
        color: "#01b8aa",
        dataPoints: [
          { label: "sat", y: this.chartData[6] },
          { label: "sun", y: this.chartData[0] },
          { label: "mon", y: this.chartData[1] },
          { label: "tue", y: this.chartData[2] },
          { label: "wed", y: this.chartData[3] },
          { label: "thu", y: this.chartData[4] },
          { label: "fri", y: this.chartData[5] } 
        ]
        }]
      }
    }) 
  }
}
