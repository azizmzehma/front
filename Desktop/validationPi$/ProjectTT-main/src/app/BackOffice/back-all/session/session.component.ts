import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { SessionDetails } from '../Models/session-details.model';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  activeSessionsCount: number = 0;

  sessionsWithDetails: SessionDetails[] = [];
  searchText: string = '';
  filteredSessions: SessionDetails[] = [];

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAllSessionsWithDetails();
    this.getActiveSessionsCount(); // Appel de la méthode pour récupérer le nombre de sessions actives
  }

  getAllSessionsWithDetails(): void {
    this.sessionService.getAllSessionsWithDetails()
      .subscribe(
        (data: SessionDetails[]) => {
          this.sessionsWithDetails = data;
          this.filteredSessions = [...this.sessionsWithDetails];
        },
        (error) => {
          console.error('Error fetching session details:', error);
        }
      );
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sessionsWithDetails);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sessions');
    XLSX.writeFile(wb, 'sessions.xlsx');
  }

  getBackgroundColor(endTime: string): string {
    const endDateTime = new Date(endTime);
    return (new Date() > endDateTime) ? 'expired' : 'not-expired';
  }

  search(): void {
    if (!this.searchText) {
      this.filteredSessions = [...this.sessionsWithDetails];
      return;
    }
  
    const searchTerm = this.searchText.toLowerCase();
    this.filteredSessions = this.sessionsWithDetails.filter(session =>
      session.taskTitle.toLowerCase().includes(searchTerm) ||
      session.userEmail.toLowerCase().includes(searchTerm) ||
      session.endTime.toLowerCase().includes(searchTerm)
    );
  }
  
  accessSession(sessionId: number): void {
    this.router.navigate(['admin/session-details', sessionId]);
    
  }

  // Méthode pour récupérer le nombre de sessions actives
// Méthode pour récupérer le nombre de sessions actives
getActiveSessionsCount(): void {
  this.sessionService.getActiveSessions().subscribe(sessions => {
    this.activeSessionsCount = sessions.length;
    this.notificationService.showActiveSessionsCount(this.activeSessionsCount); // Passer le nombre de sessions actives comme argument
  }, error => {
    console.error('Error fetching active sessions count:', error);
  });
}

}
