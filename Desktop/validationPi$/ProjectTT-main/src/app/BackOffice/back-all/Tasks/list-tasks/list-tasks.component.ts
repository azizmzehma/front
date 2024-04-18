import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Task } from '../../Models/Tasks';
import { ServiceTasksService } from '../service-tasks.service';
import Chart from 'chart.js/auto'; 
import { NgxPaginationModule } from 'ngx-pagination'; // Importez NgxPaginationModule

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent  implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  searchKeyword: string = '';
  taskStats: Map<string, number> = new Map(); 
  taskStatsChartInstance: Chart | null = null; 
  p: number = 1;

  @ViewChild('taskStatsChart') taskStatsChart!: ElementRef<HTMLCanvasElement>; 

  constructor(private taskService: ServiceTasksService) { }

  ngOnInit(): void {
    this.getTasks();
    this.fetchTaskStats();
  }

  getTasks(): void {
    this.taskService.getAllTasks().subscribe(
      data => {
        this.tasks = data;
        console.log('tasks:', data);

      },
      error => {
        console.error('Erreur lors de la récupération des tasks', error);
      }
    );
  }
  

  deleteUserStory(id: number): void {
    this.taskService.deleteTask(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
  }


  searchUserStories(): void {
    if (this.searchKeyword.trim() !== '') {
      this.taskService.searchTasks(this.searchKeyword).subscribe(
        data => {
          this.tasks = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des taks', error);
        }
      );
    } else {
      this.getTasks();
    }
  }

  ngAfterViewInit(): void {
    this.renderTaskStatsChart(); 
  }

  fetchTaskStats(): void {
    this.taskService.getTaskStats().subscribe(
      stats => {
        this.taskStats = stats;
        console.log('Task statistics:', this.taskStats);
        this.renderTaskStatsChart(); 
      },
      error => {
        console.error('Error fetching task statistics:', error);
      }
    );
  }

  renderTaskStatsChart(): void {
    if (this.taskStatsChart && this.taskStatsChart.nativeElement) {
      const chartLabels = Object.keys(this.taskStats);
      const chartData = Object.values(this.taskStats);

      const ctx = this.taskStatsChart.nativeElement.getContext('2d');

      if (this.taskStatsChartInstance) {
        this.taskStatsChartInstance.destroy();
      }

      this.taskStatsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'Number of Tasks',
              data: chartData,
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)', 
                'rgba(255, 99, 132, 0.5)' 

              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',

              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('taskStatsChart.nativeElement is not available.');
    }
  }
}
