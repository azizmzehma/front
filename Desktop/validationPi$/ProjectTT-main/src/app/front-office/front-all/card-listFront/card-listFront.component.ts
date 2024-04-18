// card-list.component.ts

import { Component, OnInit } from '@angular/core';
import { PokerCardService } from 'src/app/core/services/poker-card.service';
@Component({
  selector: 'app-card-listFront',
  templateUrl: './card-listFront.component.html',
  styleUrls: ['./card-listFront.component.css']
})
export class CardListFrontComponent implements OnInit {
  pokerCards: any[] = [];
  selectedCard: any = { id: null, name: '', complexityValue: 0 };
  showForm: boolean = false;
  helpText: string = '';
  automaticCreation: boolean = false;
  constructor(private pokerCardService: PokerCardService) { }

  ngOnInit(): void {
    this.loadPokerCards();
  }

  loadPokerCards(): void {
    this.pokerCardService.getAllCards().subscribe(cards => this.pokerCards = cards);
  }

  addCard(): void {
    this.pokerCardService.addCard(this.selectedCard).subscribe(() => {
      this.selectedCard = { id: null, name: '', complexityValue: 0 };
      this.loadPokerCards();
      this.showForm = false;
    });
  }
  toggleAutomaticCreation(): void {
    this.showForm = false; // Réinitialise le formulaire lorsque le mode de création change
  }
  deleteCard(card: any): void {
    // Vérifiez si une carte est sélectionnée
    if (card && card.id) {
      this.pokerCardService.deleteCard(card.id).subscribe(() => {
        this.loadPokerCards();
        this.selectedCard = { id: null, name: '', complexityValue: 0 };
      });
    } else {
      console.error('Aucune carte sélectionnée pour la suppression.');
    }
  }

  selectCard(card: any): void {
    this.selectedCard = { ...card };
    this.showForm = true;
  }

  showAddForm(): void {
    this.selectedCard = { id: null, name: '', complexityValue: 0 };
    this.showForm = true;
  }

  toggleHelpText(option: string): void {
    switch (option) {
      case 'fibonacci':
        this.helpText = 'Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)';
        break;
      case 'shortFibonacci':
        this.helpText = 'Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)';
        break;
      case 'tShirt':
        this.helpText = 'T-Shirt (XXS, XS, S, M, L, XL, XXL)';
        break;
      case 'tShirtNumbers':
        this.helpText = 'T-Shirt & Numbers (S, M, L, XL, 1, 2, 3, 4, 5)';
        break;
      default:
        this.helpText = '';
        break;
    }
  }

  createTShirtCards(): void {
    const tShirtSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

    // Créer les cartes T-Shirt avec les tailles définies
    for (const size of tShirtSizes) {
      const tShirtCard = {
        name: `T-Shirt - ${size}`,
        complexityValue: 0  // Vous pouvez définir une complexité de base ou la laisser à 0
      };

      // Appeler la méthode addCard() pour ajouter la carte à la liste
      this.pokerCardService.addCard(tShirtCard).subscribe(() => {
        this.loadPokerCards();  // Recharger la liste après l'ajout
      });
    }
  }

  createTShirtNumberCards(): void {
    const tShirtSizes = ['S', 'M', 'L', 'XL'];
    const numbers = [1, 2, 3, 4, 5];

    // Créer les cartes T-Shirt & Numbers avec les tailles et les nombres définis
    for (const size of tShirtSizes) {
      for (const number of numbers) {
        const tShirtNumberCard = {
          name: `T-Shirt ${size} - ${number}`,
          complexityValue: 0  // Vous pouvez définir une complexité de base ou la laisser à 0
        };

        // Appeler la méthode addCard() pour ajouter la carte à la liste
        this.pokerCardService.addCard(tShirtNumberCard).subscribe(() => {
          this.loadPokerCards();  // Recharger la liste après l'ajout
        });
      }
    }
  }
}
