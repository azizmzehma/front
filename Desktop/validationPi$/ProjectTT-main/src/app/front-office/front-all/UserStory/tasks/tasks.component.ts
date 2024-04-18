import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserStory } from 'src/app/BackOffice/back-all/Models/UserStory';
import { ServiceTasksService } from 'src/app/BackOffice/back-all/Tasks/service-tasks.service';
import { ServiceUserStoryService } from 'src/app/BackOffice/back-all/UserStory/service-user-story.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/BackOffice/back-all/Models/Tasks';
import { CdkDragDrop, moveItemInArray ,transferArrayItem} from '@angular/cdk/drag-drop';
import { Status } from 'src/app/BackOffice/back-all/Models/Tasks';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  BlocForm: FormGroup;
  userStories: UserStory[] = [];
  formSubmitted = false;
  TitleuserStory: string = ''; 
  UseruserStory: string = ''; 

  constructor(
    private services: ServiceTasksService,
    private serviceUserStory: ServiceUserStoryService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
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
    const storyId = this.route.snapshot.params['id'];
    this.services.getTasksForStory(storyId).subscribe((tasks: any) => {
      if (tasks) {
        this.tasks = tasks;
        if (storyId) {
          this.serviceUserStory.getUserStoryById(storyId).subscribe(
            (userStory: UserStory) => {
              if (userStory) {
                this.TitleuserStory = userStory.title;
                this.UseruserStory = userStory.assigned_to?.firstName;
              } else {
                console.error('L\'histoire utilisateur est introuvable');
              }
            },
            (error) => {
              console.error('Erreur lors de la récupération de l\'histoire utilisateur :', error);
            }
          );
        } else {
          console.error('L\'identifiant de l\'histoire utilisateur est invalide');
        }
      } else {
        console.error('Player data is null');
      }
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
  
  deleteTask(taskId: number) {
    this.services.deleteTask(taskId)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      });
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
        this.ngOnInit();
        this.router.navigate(['/tasks']);
      },
      err => {
        console.error('Erreur lors de l\'ajout de l\'histoire utilisateur :', err);
      }
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    let newData = event.container.data.slice();

    if (event.previousContainer === event.container) {
      moveItemInArray(newData, event.previousIndex, event.currentIndex);
    } else {
      let prevData = event.previousContainer.data.slice();
      let movedTask = prevData[event.previousIndex];
      movedTask.status = this.getStatusFromListId(event.container.id); 
      transferArrayItem(prevData, newData, event.previousIndex, event.currentIndex);
      this.updateTaskStatus(movedTask); 
    }

    this.tasks = newData;
  }

  getStatusFromListId(listId: string): Status {
    let status: Status;
    switch (listId) {
      case 'todoList':
        status = Status.TO_DO;
        break;
      case 'inprogressList':
        status = Status.IN_PROGRESS;
        break;
      case 'doneList':
        status = Status.DONE;
        break;
      default:
        status = Status.TO_DO; 
        break;
    }
    return status;
  }
  

  updateTaskStatus(task: Task) {
    this.services.updateTask(task).subscribe(
      res => {
        console.log('Tâche mise à jour avec succès:', res);
        this.ngOnInit();
      },
      err => {
        console.error('Erreur lors de la mise à jour de la tâche :', err);
      }
    );
  }

}
