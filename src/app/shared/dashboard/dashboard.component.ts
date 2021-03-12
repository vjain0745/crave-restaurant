import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color, BaseChartDirective } from 'ng2-charts';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // fromdate: Date;
  // todate: Date;
  // optionsFrom: DatepickerOptions = {
  //   minYear: 1990,
  //   maxDate: new Date(),
  //   locale: enLocale
  // };
  // optionsTo: DatepickerOptions = {
  //   minDate: this.todate,
  //   maxDate: new Date(),
  // };
  // fromDate($event){
  //   this.todate = $event;
  //   this.optionsTo = {
  //     minDate: this.todate,
  //     maxDate: new Date(),
  //     locale: enLocale
  //   }
  // };

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  // public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor() {}

  
  ngOnInit() {

    // $('.datepicker').datepicker({
    //   opens: 'bottom',
    // });

    // var minDate = new Date();
    $("#start_date").datepicker({
      minDate: 'today',
      orientation: 'auto bottom',
      autoclose: true
    }).on('changeDate', function(selected){
      var startDate = new Date(selected.date.valueOf());
      $('#end_date').datepicker('setStartDate', startDate);
    });  

    $("#end_date").datepicker({
      orientation: 'auto bottom',
      autoclose: true
    }).on('changeDate', function(selected){
        var startDate = new Date(selected.date.valueOf());
        $('#start_date').datepicker('setEndDate', startDate);
    });
  
  }

}
