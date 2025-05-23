import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-pro',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-pro.component.html',
  styleUrls: ['./dashboard-pro.component.css']
})
export class DashboardProComponent implements OnInit {
  chartData: ChartData<'bar', number[], string> = {
    labels: ['Service A', 'Service B', 'Service C', 'Service D'],
    datasets: [
      {
        label: 'Nombre de logs',
        data: [12, 19, 7, 14],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Activité des services'
      }
    }
  };

  constructor() {}

  ngOnInit(): void {}
}
