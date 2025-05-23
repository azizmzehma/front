import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartData,
  ChartOptions,
  ChartType
} from 'chart.js';

@Component({
  selector: 'app-monitoring-board',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './monitoring-board.component.html',
  styleUrls: ['./monitoring-board.component.css']
})
export class MonitoringBoardComponent implements OnInit {
  currentDate: Date = new Date();

  // 🔸 Liste dynamique des indicateurs clés (KPI)
  kpis = [
    { title: 'Access Notables', value: 72, delta: +72, color: 'text-red-500' },
    { title: 'Endpoint Notables', value: 0, delta: 0, color: 'text-white' },
    { title: 'Network Notables', value: 202, delta: +202, color: 'text-red-500' },
    { title: 'Identity Notables', value: 0, delta: 0, color: 'text-white' },
    { title: 'Threat Notables', value: 83, delta: +83, color: 'text-red-500' },
    { title: 'UBA Notables', value: 3, delta: +3, color: 'text-red-500' }
  ];

  // 📊 Bar Chart - Notable Events By Urgency
  urgencyChartType: ChartType = 'bar';
  urgencyChartData: ChartData<'bar'> = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Événements',
        data: [45, 102, 87, 36],
        backgroundColor: ['#dc2626', '#f97316', '#eab308', '#22c55e']
      }
    ]
  };
  urgencyChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre'
        }
      }
    }
  };

  // 📈 Line Chart - Notable Events Over Time
  lineChartType: ChartType = 'line';
  lineChartData: ChartData<'line'> = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
    datasets: [
      {
        label: 'Access',
        data: [10, 20, 15, 30, 25, 35],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Network',
        data: [5, 10, 8, 20, 18, 22],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre de logs'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Heure'
        }
      }
    }
  };

  ngOnInit(): void {}
}
