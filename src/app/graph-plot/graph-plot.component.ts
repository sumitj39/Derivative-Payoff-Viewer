import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import {PortfolioService} from '../portfolio.service';

@Component({
  selector: 'app-graph-plot',
  templateUrl: './graph-plot.component.html',
  styleUrls: ['./graph-plot.component.css']
})
export class GraphPlotComponent implements OnInit {
  chart = [];
  chartDone = false;
  weatherDates = ['a', 'b', 'c'];
  temp_max = [10,20,30];
  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.portfolioService.plotPositions();
    this.chartDone = true;
    /*
     this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: ['a', 'b', 'c'],
            datasets: [
              { 
                label: "first label",
                data: [10,20,30],
                borderColor: "#3cba9f",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
        console.log(this.chart);
        this.chartDone = true; */
  }

}