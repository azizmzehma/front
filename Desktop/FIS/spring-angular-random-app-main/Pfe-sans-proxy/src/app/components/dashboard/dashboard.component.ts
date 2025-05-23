import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../services/LogService';
import { LogLevelClassPipe } from '../log-level-class.pipe';
import { NgChartsModule } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { RouterModule } from '@angular/router';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LogLevelClassPipe, NgChartsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logs: any[] = [];
  paginatedLogs: any[] = [];
  currentPage: number = 1;
  pageSize: number = 20;
  totalPages: number = 1;

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

      // Données pour graphique par heure
      const countByHour: { [hour: string]: number } = {};
      this.logs.forEach(log => {
        const date = new Date(log.timestamp);
        const hourLabel = `${date.getHours().toString().padStart(2, '0')}:00`;
        countByHour[hourLabel] = (countByHour[hourLabel] || 0) + 1;
      });
      this.chartData.labels = Object.keys(countByHour).sort();
      this.chartData.datasets[0].data = this.chartData.labels.map(label => countByHour[label]);

      // Données pour pagination
      this.totalPages = Math.ceil(this.logs.length / this.pageSize);
      this.setPaginatedLogs();
    });
  }

  setPaginatedLogs(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedLogs = this.logs.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.setPaginatedLogs();
    }
  }

  exportToExcel(): void {
    const exportData = this.logs.map(log => ({
      Niveau: log.level,
      Message: log.message,
      Horodatage: log.timestamp,
      Service: log.service
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Logs': worksheet },
      SheetNames: ['Logs']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, 'logs-export.xlsx');
  }
}
