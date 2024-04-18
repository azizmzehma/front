//voting.model.ts
import { Session } from './session.model';  // Assurez-vous que le chemin est correct
import { User } from './user.model';        // Assurez-vous que le chemin est correct
import { PokerCard } from './poker-card.model';
export interface Vote {
    id?: number;
    session: Session;
    user: User;
   pokerCard: PokerCard;
  }