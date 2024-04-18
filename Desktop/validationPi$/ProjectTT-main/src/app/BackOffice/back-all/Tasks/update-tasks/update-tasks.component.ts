import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserStory } from '../../Models/UserStory';
import { Router,ActivatedRoute } from '@angular/router';
import { ServiceUserStoryService } from '../../UserStory/service-user-story.service';
import { ServiceTasksService } from '../service-tasks.service';
import { Task } from '../../Models/Tasks';

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.css']
})
export class UpdateTasksComponent {
  BlocForm: FormGroup;
  userStories: UserStory[];
  formSubmitted = false;
  id:number;

  constructor(
    private services: ServiceTasksService,
    private serviceUserStory : ServiceUserStoryService,
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
    let id = this.route.snapshot.params['id'];
    this.id = id;
    console.log('ID:', id);      
    this.services.getTaskById(this.id).subscribe((result) => {
      let task = result;
      console.log('task:', task);
    
      this.BlocForm.patchValue({
        userstory_id: task.userstory_id,
        title: task.title,
        description: task.description,
        status: task.status 
      });
    });
    
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

 


  UpdateTask() {
    this.formSubmitted = true;
  
    if (this.BlocForm.invalid) {
      return;
    }
  
    let data = this.BlocForm.value;
  
    let task = new Task(
      this.id, 
      data.userstory_id, 
      data.title,
      data.description,
      data.status
    );
  
    console.log('Histoire utilisateur:', task);
  
    this.services.updateTask(task).subscribe(
      (res) => {
        console.log('Réponse du service:', res);
        this.router.navigate(['/admin/listTasks']);
      },
      (err) => {
        console.error('Erreur lors de la mise à jour de la tâche :', err);
      }
    );
  }
  
}
