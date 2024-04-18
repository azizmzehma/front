import { User } from "./user.model";
export class UserStory {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public acceptance_criteria?: string,
    public priority?: number,
    public assigned_to?: User
  ) {}
}
  