import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';
import { PokerCard } from '../Models/poker-card.model';
import { SessionDetails } from '../Models/session-details.model';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent implements OnInit, OnDestroy {
  sessionId: number | null = null;
  cards: PokerCard[] = [];
  sessionDetails: SessionDetails | null = null;
  timeRemaining: number | null = null;
  sessionEnded: boolean = false; 

  private intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('sessionId');
      if (id !== null) {
        this.sessionId = +id;
        this.getSessionDetails();
        this.getCardsForSession();
        this.startCountdown();
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  getSessionDetails(): void {
    if (this.sessionId !== null) {
      this.sessionService.getSessionDetailsById(this.sessionId).subscribe(session => {
        this.sessionDetails = session;
      }, error => {
        console.error('Erreur lors de la récupération des détails de la session:', error);
      });
    }
  }

  getCardsForSession(): void {
    if (this.sessionId !== null) {
      this.sessionService.getCardsForSession().subscribe(cards => {
        this.cards = cards;
      }, error => {
        console.error('Erreur lors de la récupération des cartes:', error);
      });
    }
  }

  chooseCard(card: PokerCard): void {
    if (this.sessionId !== null && !this.sessionEnded) {
      this.sessionService.choosePokerCardForSession(this.sessionId, card.id).subscribe(() => {
        console.log('Carte choisie avec succès');
        // Ajoutez ici tout code pour gérer la réponse de la requête
      }, error => {
        console.error('Erreur lors du choix de la carte:', error);
      });
    }
  }

  startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.sessionDetails && this.sessionDetails.endTime) {
        const endTimeMillis = new Date(this.sessionDetails.endTime).getTime();
        const currentTimeMillis = new Date().getTime();
        this.timeRemaining = endTimeMillis - currentTimeMillis;

        if (this.timeRemaining <= 0) {
          clearInterval(this.intervalId);
          this.sessionEnded = true; 
        }
      }
    }, 1000);
  }
}
