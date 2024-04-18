import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private sessionCreatedSource = new BehaviorSubject<boolean>(false);
  sessionCreated$ = this.sessionCreatedSource.asObservable();

  notifySessionCreation() {
    this.sessionCreatedSource.next(true);
  }

  resetSessionCreationNotification() {
    this.sessionCreatedSource.next(false);
  }
  showActiveSessionsCount(count: number): void {
    this.snackBar.open(`Il y a ${count} sessions actives🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟.`, 'Fermer', {
      duration: 10000,
      panelClass: ['green-snackbar'] // Ajoute la classe CSS pour la couleur verte
    });
  }
  showSessionEndTimeNotification(endTime: string): void {
    this.snackBar.open(`Heure de fin de la session : ${endTime}`, 'Fermer', {
      duration: 13000,
      panelClass: ['green-snackbar'] // Ajoute la classe CSS pour la couleur verte
    });
  }
}
