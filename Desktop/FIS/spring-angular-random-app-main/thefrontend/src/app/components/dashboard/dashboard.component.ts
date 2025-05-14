import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../services/LogService';
import { LogLevelClassPipe } from '../log-level-class.pipe';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { RouterModule } from '@angular/router'; // 👈 Nécessaire pour routerLink

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LogLevelClassPipe, NgChartsModule, RouterModule], // 👈 Ajouté RouterModule ici
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logs: any[] = [];

  chartData: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Logs par heure',
        fill: false,
        tension: 0.4,
        borderColor: 'blue',
        backgroundColor: 'lightblue'
      }
    ]
  };

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.getLogs().subscribe(res => {
      this.logs = res.hits.hits.map((hit: any) => hit._source);

      const countByHour: { [hour: string]: number } = {};

      this.logs.forEach(log => {
        const date = new Date(log.timestamp);
        const hourLabel = `${date.getHours().toString().padStart(2, '0')}:00`;
        countByHour[hourLabel] = (countByHour[hourLabel] || 0) + 1;
      });

      this.chartData.labels = Object.keys(countByHour).sort();
      this.chartData.datasets[0].data = this.chartData.labels.map(label => countByHour[label]);
    });
  }
}
