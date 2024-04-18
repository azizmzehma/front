import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project,EtatProject } from 'src/app/core/models/project';
import { ProjetService } from 'src/app/core/services/projet.service';
@Component({
  selector: 'app-addprojet',
  templateUrl: './addprojet.component.html',
  styleUrls: ['./addprojet.component.css']
})
export class AddprojetComponent {

  project: Project = new Project();
  id: number | undefined;
  etatValues = Object.values(EtatProject);
  csvData: Project [];
  allprojects: Project[] = [];
  selectedImage: File | null = null;
  idProject!:number
    constructor(private projetService: ProjetService ,private router:Router,private ac:ActivatedRoute ) {}
    ngOnInit(): void {
this.fetchProjects();
    }
    fetchProjects() {
      this.projetService.getProjects().subscribe({
        next: (projects) => {
          this.allprojects = projects;
        },
        error: (err) => {
          console.error('Error fetching projects:', err);
        }
      });
    }


    add(f: NgForm) {
      console.log(this.project);
      this.projetService.addProject(this.project).subscribe({
        next: (addedProject:Project) => {
          const idProject = addedProject.idProject;
          if (this.selectedImage) {
            this.uploadImage(idProject);
          }
          this.projetService.getProjects().subscribe(() => {

            // Navigate to the project list page
            this.router.navigate(['/admin/projects']);
          });
        },
        error: (err) => console.log(err),
      });
    }

    onImageSelected(event: any) {
      this.selectedImage = event.target.files[0];
    }
    uploadImage(idProject: number) {
      if (this.selectedImage) {
        this.projetService.addImage(idProject, this.selectedImage).subscribe(
          (response: any) => {
            console.log('Image added successfully: ', response);
          },
          (error) => {
            console.error('Error adding image: ', error);
          }
        );
      }
    }
}

