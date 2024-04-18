import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectLikeService {
  private apiUrl = 'http://localhost:8089/pi';

  constructor(private http: HttpClient) { }

  likeProject(projectId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/like`, {});
  }

  dislikeProject(projectId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/dislike`, {});
  }

 
}
