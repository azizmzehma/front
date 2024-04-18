import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-session-createFront',
  templateUrl: './session-createFront.component.html',
  styleUrls: ['./session-createFront.component.css']
})
export class SessionCreateFrontComponent implements OnInit {
  sessionData = { userEmail: '', taskTitle: '' }; // Utilisation de taskTitle
  userEmails: string[] = [];
  taskTitles: string[] = []; // Utilisation de taskTitles

  constructor(
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.fetchUserEmails();
    this.fetchTaskTitles();
  }

  fetchUserEmails() {
    this.sessionService.getUsersEmails().subscribe({
      next: (emails) => this.userEmails = emails,
      error: (error) => console.error('Error fetching user emails', error)
    });
  }

  fetchTaskTitles() {
    this.sessionService.getTasksTitles().subscribe({
      next: (titles) => this.taskTitles = titles, // Utilisation de taskTitles
      error: (error) => console.error('Error fetching task titles', error)
    });
  }

  onSubmit() {
    console.log('Form submitted with data:', this.sessionData);
    this.sessionService.createSession(this.sessionData).subscribe({
      next: (response) => {
        console.log('Session created', response);
        this.snackBar.open('Session créée avec succès!', 'Fermer', { duration: 3000 });
        this.notificationService.notifySessionCreation();
      },
      error: (error) => {
        console.error('Error creating session', error);
        this.snackBar.open('Session créée avec succès!', 'Fermer', { duration: 3000 });
      }
    });
  }
}
