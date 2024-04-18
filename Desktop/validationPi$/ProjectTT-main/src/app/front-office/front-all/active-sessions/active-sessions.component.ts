// active-sessions.component.ts
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { SessionDetails } from 'src/app/BackOffice/back-all/Models/session-details.model';

@Component({
  selector: 'app-active-sessions',
  templateUrl: './active-sessions.component.html',
  styleUrls: ['./active-sessions.component.css']
})
export class ActiveSessionsComponent implements OnInit {
  activeSessions: SessionDetails[] = [];

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.fetchActiveSessions();
  }

  fetchActiveSessions(): void {
    this.sessionService.getActiveSessions().subscribe(
      (sessions) => {
        this.activeSessions = sessions;
      },
      (error) => {
        console.error('Failed to fetch active sessions:', error);
      }
    );
  }
}
