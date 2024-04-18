import { UserStory } from "./UserStory";

export enum Status {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}



export class Task {
  constructor(
    public id?: number,
    public userstory_id?: UserStory,
    public title?: string,
    public description?: string,
    public status?: Status
  ) {}
}
