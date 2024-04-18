import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { CompletedSessionDetails } from '../Models/completed-session-details.model';
import jsPDF from 'jspdf'; 
import * as XLSX from 'xlsx';



@Component({
    selector: 'app-completed-session-details',
    templateUrl: './completed-session-details.component.html',
    styleUrls: ['./completed-session-details.component.css']
})
export class CompletedSessionDetailsComponent implements OnInit {
    completedSessionDetails: CompletedSessionDetails[] = [];
    filteredSessionDetails: CompletedSessionDetails[] = [];
    selectedDate: string | null = null;

    // État de tri (ascendant ou descendant)
    ascending: boolean = true;

    constructor(private sessionService: SessionService) {}

    ngOnInit(): void {
        this.loadCompletedSessionDetails();
    }

    loadCompletedSessionDetails(): void {
        this.sessionService.getCompletedSessionDetails().subscribe(
            (details: CompletedSessionDetails[]) => {
                this.completedSessionDetails = details;
                this.filteredSessionDetails = details; // Initialement, tous les détails sont affichés
            },
            (error) => {
                console.error('Failed to load completed session details:', error);
            }
        );
    }

    filterByDate(): void {
        if (this.selectedDate) {
            // Filtrer les détails des sessions par date
            this.filteredSessionDetails = this.completedSessionDetails.filter(detail => {
                const detailDate = new Date(detail.endTime).toISOString().split('T')[0];
                return detailDate === this.selectedDate;
            });
        } else {
            // Si aucune date n'est sélectionnée, afficher tous les détails
            this.filteredSessionDetails = this.completedSessionDetails;
        }
    }

    sortByComplexity(): void {
        // Trie les détails filtrés par complexité
        this.filteredSessionDetails.sort((a, b) => {
            if (this.ascending) {
                return a.complexity.localeCompare(b.complexity);
            } else {
                return b.complexity.localeCompare(a.complexity);
            }
        });

        // Inverse l'état de tri pour le prochain tri
        this.ascending = !this.ascending;
    }

    // Méthode pour générer un fichier PDF
    generatePDF(detail: CompletedSessionDetails): void {
        // Initialisation du document PDF
        const doc = new jsPDF();

    // Formater le texte comme un paragraphe
    const paragraph = `
    La session est terminée à ${detail.endTime}, 
    où l'utilisateur qui a le mail ${detail.userEmail} a participé pour voter 
    pour la tâche ${detail.taskTitle} et a voté en tenant compte 
    de la valeur de complexité ${detail.complexity}.
    `;

    // Ajouter le paragraphe de texte au PDF
    doc.text(paragraph, 10, 10);

    // Enregistrer le fichier PDF
    doc.save(`session_${detail.endTime}.pdf`);
    }
    shareOnFacebook(detail: CompletedSessionDetails): void {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Session Details: Task Name: ${detail.taskTitle}, End Time: ${detail.endTime}, User Email: ${detail.userEmail}, Complexity: ${detail.complexity}`)}`;
        
        // Ouvrir l'URL de partage dans une nouvelle fenêtre
        window.open(shareUrl, '_blank');
    }
    shareOnTwitter(detail: CompletedSessionDetails): void {
        // Construire l'URL de partage de Twitter
        const textToShare = `La session est terminée à ${new Date(detail.endTime).toLocaleString()}. L'utilisateur de mail ${detail.userEmail} a participé pour voter pour la tâche ${detail.taskTitle} avec une complexité de ${detail.complexity}.`;
        const urlToShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}&url=${encodeURIComponent(window.location.href)}`;
    
        // Ouvrir l'URL de partage de Twitter dans une nouvelle fenêtre
        window.open(urlToShare, '_blank');
    }
    exportToCSV(): void {
        const csvContent = this.filteredSessionDetails.map(detail => {
            return `${detail.userEmail},${detail.taskTitle},${new Date(detail.endTime).toLocaleString()},${detail.complexity}`;
        }).join('\n');
        
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(csvBlob);
        
        // Créer un lien de téléchargement et cliquer dessus pour télécharger le fichier
        const a = document.createElement('a');
        a.href = url;
        a.download = 'completed_sessions.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    exportToExcel(): void {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.completedSessionDetails);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sessions');
        XLSX.writeFile(wb, 'sessions.xlsx');
      
}
}
