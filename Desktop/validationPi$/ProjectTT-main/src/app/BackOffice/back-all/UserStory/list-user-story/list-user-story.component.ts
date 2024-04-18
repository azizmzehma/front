import { Component } from '@angular/core';
import { UserStory } from '../../Models/UserStory';
import { ServiceUserStoryService } from '../service-user-story.service';
@Component({
  selector: 'app-list-user-story',
  templateUrl: './list-user-story.component.html',
  styleUrls: ['./list-user-story.component.css']
})
export class ListUserStoryComponent {
  userStories: UserStory[] = [];
  searchKeyword: string = '';
  p: number = 1; 

  constructor(private userStoryService: ServiceUserStoryService) { }

  ngOnInit(): void {
    this.getUserStories();
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
}
