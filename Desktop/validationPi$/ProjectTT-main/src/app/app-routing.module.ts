import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontAllComponent } from './front-office/front-all/front-all.component';
import { BackAllComponent } from './BackOffice/back-all/back-all.component';
import { ProductListComponent } from './BackOffice/back-all/content-back/store/product-list/product-list.component';
import { AddproductComponent } from './BackOffice/back-all/content-back/store/addproduct/addproduct.component';
import { UpdateProductComponent } from './BackOffice/back-all/content-back/store/update-product/update-product.component';
import { ProductDetailComponent } from './BackOffice/back-all/content-back/store/product-detail/product-detail.component';
import { CategoryListComponent } from './BackOffice/back-all/content-back/store/category/category-list/category-list.component';
import { UpdateCategoryComponent } from './BackOffice/back-all/content-back/store/category/update-category/update-category.component';
import { ProjetComponent } from './BackOffice/back-all/content-back/projectManagement/projetList/projet.component';
import { AddprojetComponent } from './BackOffice/back-all/content-back/projectManagement/addprojet/addprojet.component';
import { ProjetDetailComponent } from './BackOffice/back-all/content-back/projectManagement/projet-dtail/projet-dtail.component';
import { CommonModule } from '@angular/common';
import { UpdateprojectComponent } from './BackOffice/back-all/content-back/projectManagement/updateproject/updateproject.component';
import { CommentComponent } from './BackOffice/back-all/content-back/projectManagement/comment/comment.component';
import { AddcommentComponent } from './BackOffice/back-all/content-back/comments/addcomment/addcomment.component';
import { ListUserStoryComponent } from './BackOffice/back-all/UserStory/list-user-story/list-user-story.component';
import { AddUserStoryComponent } from './BackOffice/back-all/UserStory/add-user-story/add-user-story.component';
import { UpdateUserStoryComponent } from './BackOffice/back-all/UserStory/update-user-story/update-user-story.component';
import { AjoutTasksComponent } from './BackOffice/back-all/Tasks/ajout-tasks/ajout-tasks.component';
import { ListTasksComponent } from './BackOffice/back-all/Tasks/list-tasks/list-tasks.component';
import { UpdateTasksComponent } from './BackOffice/back-all/Tasks/update-tasks/update-tasks.component';
import { FrontUserStoryComponent } from './front-office/front-all/UserStory/front-user-story/front-user-story.component';
import { TasksComponent } from './front-office/front-all/UserStory/tasks/tasks.component';
import { ProjectFrontComponent } from './front-office/front-all/content-front/project-front/project-front.component';
import { AddProjectFrontComponent } from './front-office/front-all/content-front/add-project-front/add-project-front.component';
import { ProjectFrontDetailsComponent } from './front-office/front-all/content-front/project-front-details/project-front-details.component';
import { UpdateProjectFrontComponent } from './front-office/front-all/content-front/update-project-front/update-project-front.component';
import { CardListComponent } from './BackOffice/back-all/card-list/card-list.component';
import { SessionComponent } from './BackOffice/back-all/session/session.component';
import { SessionCreateComponent } from './BackOffice/back-all/session-create/session-create.component';
import { SessionDetailsComponent } from './BackOffice/back-all/session-details/session-details.component';
import { CompletedSessionDetailsComponent } from './BackOffice/back-all/completed-session-details/completed-session-details.component';
import { ActiveSessionsComponent } from './BackOffice/back-all/active-sessions/active-sessions.component';
import { SessionFrontComponent } from './front-office/front-all/sessionFront/sessionFront.component';
import { SessionCreateFrontComponent } from './front-office/front-all/session-createFront/session-createFront.component';
import { SessionDetailsFrontComponent } from './front-office/front-all/session-detailsFront/session-detailsFront.component';
import { CompletedSessionDetailsFrontComponent } from './front-office/front-all/completed-session-detailsFront/completed-session-detailsFront.component';
import { CardListFrontComponent } from './front-office/front-all/card-listFront/card-listFront.component';
const routes: Routes = [
{ path: '', component:FrontAllComponent,children:[
  //path userStory & task
  { path: 'UserStoryFront', component: FrontUserStoryComponent  },
  { path: 'tasks/:id', component: TasksComponent  },

  //path Card & session

  { path: 'sessionFront', component: SessionFrontComponent  },
  { path: 'sessioncreateFront', component: SessionCreateFrontComponent  },
  { path: 'sessiondetailFront/:sessionId', component: SessionDetailsFrontComponent  },
  { path: 'sessionhistorique', component: CompletedSessionDetailsFrontComponent  },
  { path: 'cardsFront', component: CardListFrontComponent  },

  //path project & product
  { path: 'project', component: ProjectFrontComponent },
  { path: 'AddNewProject', component: AddProjectFrontComponent },
  { path: 'project/:id', component: ProjectFrontDetailsComponent },
  { path: 'project/updateProject/:id', component: UpdateProjectFrontComponent },
  { path: 'addComment', component: AddcommentComponent },
  { path: 'products/add-product', component: AddproductComponent },
  { path: 'products/update-product/:id', component: UpdateProductComponent },
  { path: 'products/:productId', component: ProductDetailComponent },

    ]},
{ path: "admin", component:BackAllComponent,children:[
  //path session & card
  { path: 'session', component: SessionComponent },
  { path: 'sessioncreate', component: SessionCreateComponent },
  { path: 'session-details/:sessionId', component: SessionDetailsComponent },
  { path: 'historique', component: CompletedSessionDetailsComponent },
  { path: 'active-session', component: ActiveSessionsComponent },

  { path: 'cards', component: CardListComponent },


  //path project &product
  { path: 'projects', component: ProjetComponent },
  { path: 'projects/add-project', component: AddprojetComponent },
  { path: 'projects/:id', component: ProjetDetailComponent },
  { path: 'projects/updateProject/:id', component: UpdateprojectComponent },
  { path: 'addComment', component: AddcommentComponent },
  { path: 'products/add-product', component: AddproductComponent },
  { path: 'products/update-product/:id', component: UpdateProductComponent },
  { path: 'products/:productId', component: ProductDetailComponent },

  //path userStoy&task
      { path: 'listUserStory', component: ListUserStoryComponent },
      { path: 'addUserStory', component: AddUserStoryComponent },
      { path: 'updateUserStory/:id', component: UpdateUserStoryComponent },
      { path: 'listTasks', component: ListTasksComponent },
      { path: 'addTasks', component: AjoutTasksComponent },
      { path: 'updateTasks/:id', component: UpdateTasksComponent },

  ]
},

{ path: 'admin/categorys', component: CategoryListComponent },
{ path: 'admin/category/update/:categoryId', component: UpdateCategoryComponent },
//{ path: 'refresh', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, // Importez CommonModule ici
    // Autres modules
  ]
})
export class VotreModule { }
