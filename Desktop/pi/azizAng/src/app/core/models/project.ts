// project.model.ts

export enum EtatProject {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE',

}

export class Project {
  idProject!: number;
  title!: string;
  description!: string;
  prototype!: string;
  image!: string;
  defaultImage: string;
  file!: File;
  etatProject!: EtatProject;
  dateDebut!: Date;
  dateFinPrevu!: Date;
  comments: Comment[] = [];
  liked!: boolean;
  likes!: number;
  disliked!: boolean;
  dislikes!:number;
  fileName!: string;
  filePath!: string;
  imagePath!: string;
  imageName!: string;
}

export class Comment {
  commentId?: number;
  content?: string;
  timestamp?: Date;
}

