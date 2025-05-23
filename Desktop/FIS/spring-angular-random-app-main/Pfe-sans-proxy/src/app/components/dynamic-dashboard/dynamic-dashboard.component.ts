import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { LogService } from '../../services/LogService';

@Component({
  selector: 'app-dynamic-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './dynamic-dashboard.component.html',
  styleUrls: ['./dynamic-dashboard.component.css']
})
export class DynamicDashboardComponent implements OnInit {
  allLogs: any[] = [];
  filteredLogs: any[] = [];

  selectedYear = '';
  selectedDay = '';
  availableYears: string[] = [];
  availableDays: string[] = [];

  totalLogs = 0;
  errorCount = 0;
  dominantErrorMessage = '';
  lastUpdate = new Date();
  anomalyDetected = false;

  alertThreshold = 50;
  isThresholdLocked = true;
  showPasswordInput = false;
  enteredPassword = '';
  adminPassword = 'admin123';

  hourData: ChartData<'bar'> = { labels: [], datasets: [] };
  minuteData: ChartData<'line'> = { labels: [], datasets: [] };
  secondData: ChartData<'line'> = { labels: [], datasets: [] };
  errorTypeData: ChartData<'bar'> = { labels: [], datasets: [] };
  errorMessageData: ChartData<'pie'> = { labels: [], datasets: [] };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: true }, tooltip: { enabled: true } },
    scales: { y: { beginAtZero: true }, x: {} }
  };

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.getLogs().subscribe(res => {
      this.allLogs = res.hits.hits.map((hit: any) => hit._source);
      this.totalLogs = this.allLogs.length;
      this.errorCount = this.allLogs.filter(log => (log.level || '').toUpperCase() === 'ERROR').length;
      this.lastUpdate = new Date();

      const years = this.allLogs.map(log => new Date(log.timestamp).getFullYear().toString());
      this.availableYears = [...new Set(years)].sort();

      this.buildCharts(this.allLogs);
    });
  }

  get hasCriticalAlert(): boolean {
    return this.errorCount > this.alertThreshold;
  }

  unlockThreshold(): void {
    if (this.enteredPassword === this.adminPassword) {
      this.isThresholdLocked = false;
      this.showPasswordInput = false;
      this.enteredPassword = '';
    } else {
      alert('❌ Incorrect password');
    }
  }

  onYearChange() {
    this.selectedDay = '';
    const days = this.allLogs
      .filter(log => new Date(log.timestamp).getFullYear().toString() === this.selectedYear)
      .map(log => new Date(log.timestamp).toISOString().split('T')[0]);
    this.availableDays = [...new Set(days)].sort();
  }

  onDayChange() {
    this.filteredLogs = this.allLogs.filter(log =>
      new Date(log.timestamp).toISOString().startsWith(this.selectedDay)
    );

    this.buildCharts(this.filteredLogs);

    const errorLogs = this.filteredLogs.filter(log => (log.level || '').toUpperCase() === 'ERROR');
    this.errorCount = errorLogs.length;

    const msgCount: { [key: string]: number } = {};
    errorLogs.forEach(log => {
      const msg = log.message || 'UNKNOWN';
      msgCount[msg] = (msgCount[msg] || 0) + 1;
    });

    const top = Object.entries(msgCount).sort((a, b) => b[1] - a[1])[0];
    this.dominantErrorMessage = top ? top[0] : '';

    // ✅ Détection d’anomalie (jour précédent)
    const selectedDate = new Date(this.selectedDay);
    const yesterday = new Date(selectedDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().split('T')[0];

    const logsYesterday = this.allLogs.filter(log =>
      new Date(log.timestamp).toISOString().startsWith(yesterdayKey)
    );

    const todayCount = this.filteredLogs.length;
    const yesterdayCount = logsYesterday.length;

    console.log('Today:', todayCount, 'Yesterday:', yesterdayCount);
    this.anomalyDetected = yesterdayCount > 0 && todayCount > yesterdayCount * 3;
  }

  resetFilter() {
    this.selectedYear = '';
    this.selectedDay = '';
    this.filteredLogs = [];
    this.anomalyDetected = false;
    this.buildCharts(this.allLogs);
  }

  buildCharts(logs: any[]) {
    const group = (keyFn: (d: Date) => string) => {
      const buckets: { [key: string]: number } = {};
      logs.forEach(log => {
        const d = new Date(log.timestamp);
        const key = keyFn(d);
        buckets[key] = (buckets[key] || 0) + 1;
      });
      return Object.entries(buckets).sort();
    };

    const hour = group(d => d.getHours().toString().padStart(2, '0'));
    this.hourData = {
      labels: hour.map(([h]) => h),
      datasets: [{ label: 'Logs / Hour', data: hour.map(([, v]) => v), backgroundColor: '#0d6efd' }]
    };

    const minute = group(d => `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
    this.minuteData = {
      labels: minute.map(([m]) => m),
      datasets: [{ label: 'Logs / Minute', data: minute.map(([, v]) => v), borderColor: '#ffc107', tension: 0.4, fill: true }]
    };

    const second = group(d => `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`);
    this.secondData = {
      labels: second.map(([s]) => s),
      datasets: [{ label: 'Logs / Second', data: second.map(([, v]) => v), borderColor: '#dc3545', tension: 0.4, fill: false }]
    };

    const byType: { [level: string]: number } = {};
    logs.forEach(log => {
      const level = (log.level || 'UNKNOWN').toUpperCase();
      byType[level] = (byType[level] || 0) + 1;
    });
    const typeLabels = Object.keys(byType);
    this.errorTypeData = {
      labels: typeLabels,
      datasets: [{ label: 'Error Types', data: typeLabels.map(l => byType[l]), backgroundColor: ['#dc3545', '#ffc107', '#198754'] }]
    };

    const msgCount: { [msg: string]: number } = {};
    logs.forEach(log => {
      const msg = log.message || 'UNKNOWN';
      msgCount[msg] = (msgCount[msg] || 0) + 1;
    });
    const topMessages = Object.entries(msgCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    this.errorMessageData = {
      labels: topMessages.map(([msg]) => msg),
      datasets: [{ label: 'Top Messages', data: topMessages.map(([, v]) => v), backgroundColor: ['#0dcaf0', '#6f42c1', '#fd7e14', '#20c997', '#e83e8c'] }]
    };
  }
}
