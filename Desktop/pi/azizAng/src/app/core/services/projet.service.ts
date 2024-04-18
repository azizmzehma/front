import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = 'http://localhost:8089/pi';

  constructor(private http: HttpClient) { }

  // Fetch all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/get_all_Projects`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch a single project by ID
  getProject(projectId: number): Observable<Project> {
    const url = `${this.apiUrl}/getProject/${projectId}`;
    return this.http.get<Project>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new project
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/add-Project`, project)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing project
  updateProject(projectId: number, project: Project): Observable<Project> {
    const url = `${this.apiUrl}/updateProject/${projectId}`;
    return this.http.put<Project>(url, project)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a project
  deleteProject(projectId: number): Observable<void> {
    const url = `${this.apiUrl}/deleteProject/${projectId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );

  }

  // Error handling
  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError('An error occurred. Please try again later.');
  }
  addCommentToProject(idProject: number, comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comment/addComment/${idProject}`, comment);
  }


  deleteComment(projectId: number, commentId: number): Observable<void> {
    const url = `${this.apiUrl}/projects/${projectId}/comments/${commentId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  getLikes(projectId: number): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'projects/' + projectId + '/likes');
  }

  getDislikes(projectId: number): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'projects/' + projectId + '/dislikes');
  }
  addImage(projectId: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<any>(`${this.apiUrl}/${projectId}/image`, formData);
  }

  getImage(projectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${projectId}/image`, { responseType: 'blob' });
  }
  getRankedProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ranked`);
  }
}
