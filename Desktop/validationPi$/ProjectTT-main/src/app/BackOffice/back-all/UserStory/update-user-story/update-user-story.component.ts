import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceUserStoryService } from '../service-user-story.service';
import { UserStory } from '../../Models/UserStory';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-update-user-story',
  templateUrl: './update-user-story.component.html',
  styleUrls: ['./update-user-story.component.css']
})
export class UpdateUserStoryComponent {
  BlocForm: FormGroup;
  users: User[];
  formSubmitted = false;
  id:number;

  constructor(
    private services: ServiceUserStoryService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute

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
      ])
    };
    this.BlocForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    console.log('ID:', id);       
    this.services.getUserStoryById(this.id).subscribe((result) => {
      let userStory = result;
      console.log('User Story:', userStory);
  
      this.BlocForm.patchValue({
        title: userStory.title,
        description: userStory.description,
        acceptance_criteria: userStory.acceptance_criteria,
        priority: userStory.priority,
      });
    });

  }
  

  get title() { return this.BlocForm.get('title'); }
  get description() { return this.BlocForm.get('description'); }
  get acceptance_criteria() { return this.BlocForm.get('acceptance_criteria'); }
  get priority() { return this.BlocForm.get('priority'); }

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

 

  UpdateUserStory() {
    this.formSubmitted = true;
  
    if (this.BlocForm.invalid) {
      return;
    }
  
    let data = this.BlocForm.value;
  
    let userStory = new UserStory(
      this.id,
      data.title,
      data.description,
      data.acceptance_criteria,
      data.priority
    );
  
    console.log('Histoire utilisateur:', userStory);
  
    this.services.updateUserStory(userStory).subscribe(
      (res) => {
        console.log(res);
        console.log('update');
        this.router.navigate(['/admin/listUserStory']);
      },
      (err) => {
        console.error('Erreur lors de l\'ajout de l\'histoire utilisateur :', err);
      }
    );
  }
}
