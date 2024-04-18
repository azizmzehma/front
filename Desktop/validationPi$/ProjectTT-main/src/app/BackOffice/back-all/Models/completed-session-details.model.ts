export interface CompletedSessionDetails {
    userEmail: string;
    taskTitle: string;
    endTime: Date; // Utilisez le type Date pour la date et l'heure
    complexity: string;
    id: string | number;  // Ajoutez l'ID avec le type approprié
    // Complexité en tant que chaîne de caractères
}
