import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartType,
  ChartDataset,
} from 'chart.js';

@Component({
  selector: 'app-advanced-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './advanced-dashboard.component.html',
  styleUrls: ['./advanced-dashboard.component.css']
})
export class AdvancedDashboardComponent implements OnInit {
  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration['data'] = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
    datasets: [
      {
        data: [10, 20, 15, 30, 25, 35],
        label: 'Performance Logs',
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.4)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnInit(): void {}
}
