import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceUserStoryService } from '../service-user-story.service';
import { UserStory } from '../../Models/UserStory';
import { Router } from '@angular/router';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-add-user-story',
  templateUrl: './add-user-story.component.html',
  styleUrls: ['./add-user-story.component.css']
})
export class AddUserStoryComponent {
  BlocForm: FormGroup;
  users: User[];
  formSubmitted = false;

  constructor(
    private services: ServiceUserStoryService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
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

  ngOnInit(): void {
    this.services.getUsers().subscribe(
      (users) => {
        this.users = users;
        console.log(users); 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get title() { return this.BlocForm.get('title'); }
  get description() { return this.BlocForm.get('description'); }
  get acceptance_criteria() { return this.BlocForm.get('acceptance_criteria'); }
  get priority() { return this.BlocForm.get('priority'); }
  get assigned_to() { return this.BlocForm.get('assigned_to'); }

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
      return 'Ce champ doit contenir au moins 10 caractères';
    }
    return '';
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
  
    this.services.addUserStory(userStory).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/admin/listUserStory']);
      },
      err => {
        console.error('Erreur lors de l\'ajout de l\'histoire utilisateur :', err);
      }
    );
  }
}
