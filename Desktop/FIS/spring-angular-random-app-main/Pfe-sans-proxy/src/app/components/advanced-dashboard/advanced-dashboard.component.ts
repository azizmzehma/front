import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartType,
  ChartData,
  ChartOptions
} from 'chart.js';

@Component({
  selector: 'app-advanced-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './advanced-dashboard.component.html',
  styleUrls: ['./advanced-dashboard.component.css']
})
export class AdvancedDashboardComponent implements OnInit {
  public currentDate: Date = new Date();
  public lineChartType: ChartType = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
    datasets: [
      {
        data: [10, 20, 15, 30, 25, 35],
        label: 'Performance (logs/min)',
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13,110,253,0.2)',
        pointBackgroundColor: '#0d6efd',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 7,
        pointRadius: 5,
        tension: 0.4,
        fill: true
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#444'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (tooltipItems) => `Heure : ${tooltipItems[0].label}`,
          label: (tooltipItem) => `Valeur : ${tooltipItem.formattedValue} logs`
        }
      },
      title: {
        display: true,
        text: 'Évolution des performances',
        font: {
          size: 18
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Heure'
        },
        ticks: {
          color: '#333'
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Nombre de logs'
        },
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          color: '#333'
        },
        grid: {
          color: '#eee'
        }
      }
    }
  };

  ngOnInit(): void {}
}
