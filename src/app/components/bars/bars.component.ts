import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styles: [
  ]
})
export class BarsComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  public colors: Color[] = [
    { backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ] }
  ];

  ngOnInit(): void {
  }

}
