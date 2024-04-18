
import { User } from './user.model'; // Assurez-vous d'avoir un modèle User correspondant
import { Task } from './task.model'; // Assurez-vous d'avoir un modèle Task correspondant
import { PokerCard } from './poker-card.model'; // Assurez-vous d'avoir un modèle PokerCard correspondant

export interface Session {
  id: number;
  user: any; // Assurez-vous que cela correspond à la structure côté serveur
  task: any; // Assurez-vous que cela correspond à la structure côté serveur
  pokerCard: any;
  endTime: Date;
  userId: number;
  taskId: number;
 
  sessionId: number;
 
  // Ajoutez d'autres propriétés au besoin
}