import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStory } from '../Models/UserStory';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:4200' })
};
@Injectable({
  providedIn: 'root'
})
export class ServiceUserStoryService {
  apiUrl = "http://localhost:8089/pi/userstories";
  apiUrlUser = "http://localhost:8089/pi/user";
  

  constructor(private http: HttpClient) { }

  getUserStories(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(this.apiUrl);
  }

  addUserStory(userStory: UserStory): Observable<UserStory> {
    return this.http.post<UserStory>(this.apiUrl, userStory, httpOptions);
  }

  getUserStoryById(id: number): Observable<UserStory> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserStory>(url);
  }

 
  updateUserStory(userStory: UserStory): Observable<UserStory> {
    const url = `${this.apiUrl}/${userStory.id}`;
    return this.http.put<UserStory>(url, userStory, httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        return throwError(error);
      })
    );
  }


  deleteUserStory(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUser);
  }

  searchUserStories(keyword: string): Observable<UserStory[]> {
    const url = `${this.apiUrl}/search?keyword=${keyword}`;
    return this.http.get<UserStory[]>(url);
  }

 
}
