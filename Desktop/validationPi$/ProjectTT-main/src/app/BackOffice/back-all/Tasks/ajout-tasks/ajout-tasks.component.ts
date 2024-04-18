import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserStory } from '../../Models/UserStory';
import { ServiceTasksService } from '../service-tasks.service';
import { Router } from '@angular/router';
import { ServiceUserStoryService } from '../../UserStory/service-user-story.service';
import { Task } from '../../Models/Tasks';

@Component({
  selector: 'app-ajout-tasks',
  templateUrl: './ajout-tasks.component.html',
  styleUrls: ['./ajout-tasks.component.css']
})
export class AjoutTasksComponent {
  BlocForm: FormGroup;
  userStories: UserStory[];
  formSubmitted = false;

  constructor(
    private services: ServiceTasksService,
    private serviceUserStory : ServiceUserStoryService,
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
        Validators.minLength(4),
      ]),
      status: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      userstory_id: new FormControl('', [ 
        Validators.required,
      ]),
    };
    this.BlocForm = this.fb.group(formControls);
  }



  ngOnInit(): void {
    this.serviceUserStory.getUserStories().subscribe(
      (userStories) => {
        this.userStories = userStories;
        console.log(userStories); 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get title() { return this.BlocForm.get('title'); }
  get description() { return this.BlocForm.get('description'); }
  get userstory_id() { return this.BlocForm.get('userstory_id'); }
  get status() { return this.BlocForm.get('status'); } 


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


  addTask() {
    this.formSubmitted = true;
  
    if (this.BlocForm.invalid) {
      return;
    }
  
    const data = this.BlocForm.value;
    const userstory_id = data.userstory_id; 
  
    const task = new Task(
      undefined,
      { id: userstory_id }, 
      data.title,
      data.description,
      data.status 
    );
  
    console.log('Histoire utilisateur:', task);
  
    this.services.createTask(task).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/admin/listTasks']);
      },
      err => {
        console.error('Erreur lors de l\'ajout de l\'histoire utilisateur :', err);
      }
    );
  }
  
  
}
