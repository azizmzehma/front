import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionDetails } from 'src/app/BackOffice/back-all/Models/session-details.model';
import {  HttpHeaders } from '@angular/common/http';
import { Session } from 'src/app/BackOffice/back-all/Models/session'; // Import de la classe Session
import { PokerCard } from 'src/app/BackOffice/back-all/Models/poker-card.model';// Import de l'interface PokerCard
import { SessionDetail } from 'src/app/BackOffice/back-all/Models/session-detail.model';
import { CompletedSessionDetails } from 'src/app/BackOffice/back-all/Models/completed-session-details.model';// Importer CompletedSessionDetails

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:8089/pi/sessions'; // URL de base pour les sessions

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  createSession(sessionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createsess`, sessionData);
  }
  getTasksTitles(): Observable<string[]> { // Modification de la méthode pour récupérer les titres des tâches
    return this.http.get<string[]>(`${this.apiUrl}/task-titles`);
  }
  getAllSessionsWithDetails(): Observable<SessionDetails[]> {
    return this.http.get<SessionDetails[]>(`${this.apiUrl}/sessions-with-details`);
  }

  getActiveSessions(): Observable<SessionDetails[]> {
    return this.http.get<SessionDetails[]>(`${this.apiUrl}/active-sessions`);
  }
 
  choosePokerCardForSession(sessionId: number, pokerCardId: number): Observable<Session> {
    const url = `${this.apiUrl}/choose-poker-card`;
    const params = { sessionId: sessionId.toString(), pokerCardId: pokerCardId.toString() };
    return this.http.post<Session>(url, null, { params });
  }
  getCompletedSessionDetails(): Observable<CompletedSessionDetails[]> {
    const url = `${this.apiUrl}/completed-sessions`; // Assurez-vous que l'URL est correcte
    return this.http.get<CompletedSessionDetails[]>(url);
  }
  getCardsForSession(): Observable<PokerCard[]> {
    return this.http.get<PokerCard[]>(`${this.apiUrl}/cards-for-session`, this.httpOptions);
  }
  getSessionDetailsById(sessionId: number): Observable<SessionDetails> {
    // Construit l'URL pour accéder aux détails de la session spécifique
    const url = `${this.apiUrl}/session-details/${sessionId}`;
    // Effectue la requête GET pour obtenir les détails de la session
    return this.http.get<SessionDetails>(url);
  }
  getUsersEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/user-emails`);
  }

  getTasksNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/task-names`);
  }

  
}
