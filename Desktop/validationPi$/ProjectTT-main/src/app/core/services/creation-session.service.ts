import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreationSessionService {
  private apiUrl = 'http://localhost:8089/pi/sessions'; // Utilisez apiUrl au lieu de baseUrl

  constructor(private http: HttpClient) { }
  getUsersEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/user-emails`);
  }

  getTasksNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/task-names`);
  }
  createSession(sessionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createsess`, sessionData);
  }
}
