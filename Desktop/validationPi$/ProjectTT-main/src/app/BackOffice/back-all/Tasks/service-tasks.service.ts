  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { UserStory } from '../Models/UserStory';
  import { Observable } from 'rxjs';
  import { Task } from '../Models/Tasks';
  import { catchError } from 'rxjs/operators';
  import { throwError } from 'rxjs';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:4200' })
  };
  @Injectable({
    providedIn: 'root'
  })
  export class ServiceTasksService {
    apiUrl = "http://localhost:8089/pi/task";

    constructor(private http: HttpClient) { }

    getAllTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(this.apiUrl);
    }

    getTaskById(id: number): Observable<Task> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Task>(url);
    }


  /* createTask(task: Task): Observable<Task> {
      const userStoryId = task.userStoryId.id; 
      const url = `${this.apiUrl}/${userStoryId}`;

      return this.http.post<Task>(url, task, httpOptions);
  }*/

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }



  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        return throwError(error);
      })
    );
  }


    deleteTask(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(url);
    }

    searchTasks(keyword: string): Observable<Task[]> {
      const url = `${this.apiUrl}/search?keyword=${keyword}`;
      return this.http.get<Task[]>(url);
    }

    getTasksForStory(storyId: number): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.apiUrl}/story/${storyId}`);
    }

    getTaskStats(): Observable<Map<string, number>> {
      const statsUrl = `${this.apiUrl}/stats`;
      return this.http.get<Map<string, number>>(statsUrl);
    }
  
}
