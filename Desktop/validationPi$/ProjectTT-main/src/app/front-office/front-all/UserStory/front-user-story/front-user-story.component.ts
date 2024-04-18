import { Component } from '@angular/core';
import { UserStory } from 'src/app/BackOffice/back-all/Models/UserStory';
import { ServiceUserStoryService } from 'src/app/BackOffice/back-all/UserStory/service-user-story.service';
import { User } from 'src/app/BackOffice/back-all/Models/user.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-user-story',
  templateUrl: './front-user-story.component.html',
  styleUrls: ['./front-user-story.component.css']
})
export class FrontUserStoryComponent {
  userStories: UserStory[] = [];
  searchKeyword: string = '';
  showForm = false;
  BlocForm: FormGroup;
  users: User[];
  formSubmitted = false;

  constructor(private userStoryService: ServiceUserStoryService,
    private fb: FormBuilder  ,  private router: Router,
    ) {
      let formControls = {
        title: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        acceptance_criteria: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        priority: new FormControl('', [
          Validators.required,
        ]),
        
        assigned_to: new FormControl('', [ 
          Validators.required,
        ]),
      };
      this.BlocForm = this.fb.group(formControls);
    }
  
    get title() { return this.BlocForm.get('title'); }
    get description() { return this.BlocForm.get('description'); }
    get acceptance_criteria() { return this.BlocForm.get('acceptance_criteria'); }
    get priority() { return this.BlocForm.get('priority'); }
    get assigned_to() { return this.BlocForm.get('assigned_to'); }

  ngOnInit(): void {
    this.getUserStories();

    this.userStoryService.getUsers().subscribe(
      (users) => {
        this.users = users;
        console.log(users); 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUserStories(): void {
    this.userStoryService.getUserStories().subscribe(
      data => {
        this.userStories = data;
        console.log('userStories:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des userStories', error);
      }
    );
  }

  deleteUserStory(id: number): void {
    this.userStoryService.deleteUserStory(id)
      .subscribe(() => {
        this.userStories = this.userStories.filter(story => story.id !== id);
      });
  }

  searchUserStories(): void {
    if (this.searchKeyword.trim() !== '') {
      this.userStoryService.searchUserStories(this.searchKeyword).subscribe(
        data => {
          this.userStories = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des userStories', error);
        }
      );
    } else {
      this.getUserStories();
    }
  }

   addNewUserStory() {
    this.formSubmitted = true;
  
    if (this.BlocForm.invalid) {
      return;
    }
  
    const data = this.BlocForm.value;
    let selectedUser = this.users.find(user => user.id == data.assigned_to);

    const userStory = new UserStory(
      undefined,
      data.title,
      data.description,
      data.acceptance_criteria,
      data.priority,
      selectedUser          );
  
    console.log('Histoire utilisateur:', userStory);
  
    this.userStoryService.addUserStory(userStory).subscribe(
      res => {
        console.log(res);
        this.getUserStories();
        this.router.navigate(['/UserStoryFront']);

      },
      err => {
        console.error('Erreur lors de l\'ajout de l\'histoire utilisateur :', err);
      }
    );
  }
  
  

  validateField(field: string) {
    return (
      this.BlocForm.get(field)?.invalid &&
      (this.BlocForm.get(field)?.touched || this.formSubmitted)
    );
  }
  getErrorMessage(field: string) {
    if (this.BlocForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (this.BlocForm.get(field)?.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 4 caractères';
    }
    return '';
  }
}
