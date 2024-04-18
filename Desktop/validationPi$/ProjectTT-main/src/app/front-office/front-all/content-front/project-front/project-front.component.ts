import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { EtatProject } from 'src/app/core/models/project';
import { ProjectLikeService } from 'src/app/core/services/project-like.service';
import { ProjetService } from 'src/app/core/services/projet.service';
import { Project } from 'src/app/core/models/project';
import { Comment } from 'src/app/core/models/project';
import * as QRCode from 'qrcode';
import { FileResponse } from 'src/app/core/models/FileResponse';
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-project-front',
  templateUrl: './project-front.component.html',
  styleUrls: ['./project-front.component.css']
})
export class ProjectFrontComponent {
  allprojects: Project[] = [];
  selectedProject: Project | null = null;
  newComment: string = '';
  i: number = 0;
  filteredProjects: Project[] = [];
  EtatProject: EtatProject;
  githubRepoUrl: string = '';
  imageFiles: FileResponse[] = [];
  otherFiles: FileResponse[] = [];
  selectedFile: File | null = null;
  images!: string[];
  idProject!:number;
  rankedProjects: any[] = [];

  constructor(
    private http: HttpClient ,
    private projetService: ProjetService,
    private router: Router,
    private projectLikeService: ProjectLikeService   ) { }

  ngOnInit(): void {
    this.fetchProjects();
    this.filteredProjects = this.allprojects;
    this.allprojects.forEach(project => {
      this.projetService.getLikes(project.idProject).subscribe(
        (likes: number) => project.likes = likes
      );
      this.projetService.getDislikes(project.idProject).subscribe(
        (dislikes: number) => project.dislikes = dislikes
      );
    });
    this.getRankedProjects();

  }
  isImage(fileName: string): boolean {
    return !!fileName && (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.avif') || fileName.endsWith('.svg'));
  }
  loadFiles() {
    this.http.get<FileResponse[]>('http://localhost:8089/pi/get_all_Projects').subscribe(
      (response) => {
        this.imageFiles = response.filter(file => this.isImage(file.fileName));
        this.otherFiles = response.filter(file => !this.isImage(file.fileName));
      },
      (error) => {
        console.error('Erreur lors du chargement des fichiers : ', error);
      }
    );
  }
  generateQRCode(project: Project): string {
    const qrOptions = {
      color: {
        dark: '#000000',   // Couleur des modules sombres (par défaut)
      light: '#9AC8EB'   // Couleur des modules clairs
      }
    };

    const qrContent = `${project.title}\n${project.dateDebut}\n${project.dateFinPrevu}\n${project.description}\n${project.etatProject}`;
    let qrCodeUrl: string = '';
    QRCode.toDataURL(qrContent, { errorCorrectionLevel: 'H', ...qrOptions }, (err: any, url: string) => {
      if (err) {
        console.error(err);
      } else {
        qrCodeUrl = url;
      }
    });
    return qrCodeUrl;
  }
  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:8089/pi/{projectId}/image', formData).subscribe(
        (response: any) => {
          console.log('image added successfully: ', response);
          this.selectedFile = null;
          this.loadFiles();
        },
        (error) => {
          console.error('Error adding file: ', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
  getRankedProjects() {
    // Utilisez le service pour récupérer tous les projets
    this.projetService.getProjects().subscribe(
      (projects: Project[]) => {
        // Trier les projets par nombre de likes décroissant
        this.rankedProjects = projects.sort((a, b) =>- (a.likes-a.dislikes) +(b.likes-b.dislikes));
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la récupération des projets : ', error);
      }
    );
  }
  openImage(filename: string) {
    const headers = new HttpHeaders().set('Accept', 'application/avif'); // Adjust content type as needed
    this.http.get(`http://localhost:8089/pi/{projectId}/image`, { headers, responseType: 'blob' })
      .subscribe(
        (blob) => {
          const file = new Blob([blob], { type: 'application/avif' }); // Adjust content type as needed
          saveAs(file, filename);
        },
        (error) => {
          console.error('Erreur lors de l\'ouverture du fichier : ', error);
        }
      );
  }

  initChart(): void {
    const ctx = document.getElementById('projectChart') as HTMLCanvasElement;

    const stateCounts = {
      'À Faire': this.countProjectsTodo(),
      'Terminés': this.countProjectsDone(),
      'En Cours': this.countProjectsInprogress()
    };

    const stateLabels = Object.keys(stateCounts);
    const stateData = Object.values(stateCounts);

    const maxCount = Math.max(...stateData) + 1; // Get the highest count + 1 for some space

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: stateLabels,
        datasets: [{
          label: "Nombre de projets selon l'etat",
          data: stateData,
          backgroundColor: [
            'red',
            'blue',
            'yellow'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: maxCount, // Set the max value to ensure a step size of (almost) 1
            ticks: {
              stepSize: 1 // Set the step size explicitly to 1
            }
          }
        }
      }
    });
  }


  countProjectsTodo(): number {
    return this.allprojects.filter(project => project.etatProject === EtatProject.TODO).length;
  }

  countProjectsDone(): number {
    return this.allprojects.filter(project => project.etatProject === EtatProject.DONE).length;
  }
  countProjectsInprogress(): number {
    return this.allprojects.filter(project => project.etatProject === EtatProject.INPROGRESS).length;
  }


  fetchProjects() {
    this.projetService.getProjects().subscribe({
      next: (projects) => {
        this.allprojects = projects;
        this.allprojects.forEach(project => {
          this.projetService.getLikes(project.idProject).subscribe(
            (likes: number) => project.likes = likes
          );
          this.projetService.getDislikes(project.idProject).subscribe(
            (dislikes: number) => project.dislikes = dislikes
          );
        });
        // Trier les projets par nombre de likes décroissant
        this.allprojects.sort((a, b) => b.likes - a.likes);
        this.initChart();
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  navigateToUpdateProject(projectId: number): void {
    this.router.navigate(['/project/updateProject', projectId]);
  }

  deleteProject(projectId: number): void {
    this.projetService.deleteProject(projectId).subscribe({
      next: () => {
        this.fetchProjects();
      },
      error: (err) => {
        console.error('Error deleting project:', err);
      }
    });
  }

  addComment(projectId: number, form: NgForm): void {

    const newComment: Comment = {
      commentId: form.value.commentId,
      content: form.value.content,
      timestamp: new Date(),

    };

    this.projetService.addCommentToProject(projectId, newComment as any).subscribe({
      next: () => {
        console.log('Comment added successfully');
        form.resetForm();
        this.newComment = ''; // Clear the comment input field
        this.fetchProjects(); // Reload the list of projects
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      }
    });
  }

  viewProjectDetails(projectId: number): void {
    console.log('Project ID:', projectId);
    this.router.navigate(['/project/', projectId]);
  }


  deleteComment(projectId: number, commentId: number): void {
    this.projetService.deleteComment(projectId, commentId).subscribe(
      () => {
        console.log('Comment deleted successfully.');
        this.fetchProjects();
      },
      (error: any) => {
        console.error('Error deleting comment:', error);
      }
    );
  }
  dislikeProject(projectId: number): void {
    this.projectLikeService.dislikeProject(projectId).subscribe(() => {
      console.log('Project disliked successfully.');
      this.fetchProjects();
    }, (error) => {
      console.error('Error disliking project:', error);
    });
  }
  likeProject(projectId: number): void {
    this.projectLikeService.likeProject(projectId).subscribe(() => {
      console.log('Project liked successfully.');
      this.fetchProjects();
    }, (error) => {
      console.error('Error liking project:', error);
    });
  }



}


