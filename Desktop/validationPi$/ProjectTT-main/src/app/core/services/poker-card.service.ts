import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokerCardService {
  private apiUrl = 'http://localhost:8089/pi/pokercards';

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  getCardById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`);
  }

  addCard(card: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, card, this.httpOptions);
  }

  updateCard(id: number, card: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/put/${id}`, card);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
