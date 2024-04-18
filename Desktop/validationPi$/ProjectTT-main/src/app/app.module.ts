import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FrontAllComponent } from './front-office/front-all/front-all.component';
import { FooterFrontComponent } from './front-office/front-all/footer-front/footer-front.component';
import { ContentFrontComponent } from './front-office/front-all/content-front/content-front.component';
import { HeaderFrontComponent } from './front-office/front-all/header-front/header-front.component';
import { FormsModule } from '@angular/forms';
import { BackAllComponent } from './BackOffice/back-all/back-all.component';
import { NavbarComponent } from './BackOffice/back-all/navbar/navbar.component';
import { SidebarComponent } from './BackOffice/back-all/sidebar/sidebar.component';
import { FooterBackComponent } from './BackOffice/back-all/footer-back/footer-back.component';
import { ContentBackComponent } from './BackOffice/back-all/content-back/content-back.component';
import { ProductListComponent } from './BackOffice/back-all/content-back/store/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddproductComponent } from './BackOffice/back-all/content-back/store/addproduct/addproduct.component';
import { UpdateProductComponent } from './BackOffice/back-all/content-back/store/update-product/update-product.component';
import { ProductDetailComponent } from './BackOffice/back-all/content-back/store/product-detail/product-detail.component';
import { CategoryListComponent } from './BackOffice/back-all/content-back/store/category/category-list/category-list.component';
import { AddCategoryComponent } from './BackOffice/back-all/content-back/store/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './BackOffice/back-all/content-back/store/category/update-category/update-category.component';
import { ProjetComponent } from './BackOffice/back-all/content-back/projectManagement/projetList/projet.component';
import { AddprojetComponent } from './BackOffice/back-all/content-back/projectManagement/addprojet/addprojet.component';
import { UpdateprojectComponent } from './BackOffice/back-all/content-back/projectManagement/updateproject/updateproject.component';
import { LikeDislikeComponent } from './BackOffice/back-all/content-back/reactions/like-dislike/like-dislike.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListUserStoryComponent } from './BackOffice/back-all/UserStory/list-user-story/list-user-story.component';
import { AddUserStoryComponent } from './BackOffice/back-all/UserStory/add-user-story/add-user-story.component';
import { UpdateUserStoryComponent } from './BackOffice/back-all/UserStory/update-user-story/update-user-story.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateTasksComponent } from './BackOffice/back-all/Tasks/update-tasks/update-tasks.component';
import { AjoutTasksComponent } from './BackOffice/back-all/Tasks/ajout-tasks/ajout-tasks.component';
import { ListTasksComponent } from './BackOffice/back-all/Tasks/list-tasks/list-tasks.component';
import { FrontUserStoryComponent } from './front-office/front-all/UserStory/front-user-story/front-user-story.component';
import { TasksComponent } from './front-office/front-all/UserStory/tasks/tasks.component';
import { FilterByStatusPipe } from './front-office/front-all/UserStory/tasks/filter-by-status.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddProjectFrontComponent } from './front-office/front-all/content-front/add-project-front/add-project-front.component';
import { HomePageFrontComponent } from './front-office/front-all/content-front/home-page-front/home-page-front.component';
import { ProjectFrontComponent } from './front-office/front-all/content-front/project-front/project-front.component';
import { ProjectFrontDetailsComponent } from './front-office/front-all/content-front/project-front-details/project-front-details.component';
import { UpdateProjectFrontComponent } from './front-office/front-all/content-front/update-project-front/update-project-front.component';
import { CardListComponent } from './BackOffice/back-all/card-list/card-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SessionComponent } from './BackOffice/back-all/session/session.component';
import { SessionCreateComponent } from './BackOffice/back-all/session-create/session-create.component';
import { SessionDetailsComponent } from './BackOffice/back-all/session-details/session-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActiveSessionsComponent } from './BackOffice/back-all/active-sessions/active-sessions.component';
import {  DatePipe } from '@angular/common';
import { CompletedSessionDetailsComponent } from './BackOffice/back-all/completed-session-details/completed-session-details.component';
import { SessionFrontComponent } from './front-office/front-all/sessionFront/sessionFront.component';
import { SessionCreateFrontComponent } from './front-office/front-all/session-createFront/session-createFront.component';
import { SessionDetailsFrontComponent } from './front-office/front-all/session-detailsFront/session-detailsFront.component';
import { CompletedSessionDetailsFrontComponent } from './front-office/front-all/completed-session-detailsFront/completed-session-detailsFront.component';
import { CardListFrontComponent } from './front-office/front-all/card-listFront/card-listFront.component';
@NgModule({
  declarations: [
    AppComponent,
    FrontAllComponent,
    FooterFrontComponent,
    ContentFrontComponent,
    HeaderFrontComponent,
    BackAllComponent,
    NavbarComponent,
    SidebarComponent,
    FooterBackComponent,
    ContentBackComponent,
    ProductListComponent,
    AddproductComponent,
    UpdateProductComponent,
    ProductDetailComponent,
    CategoryListComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    ProjetComponent,
    AddprojetComponent,
    UpdateprojectComponent,
    LikeDislikeComponent,
    ListUserStoryComponent,
    AddUserStoryComponent,
    UpdateUserStoryComponent,
    UpdateTasksComponent,
    AjoutTasksComponent,
    ListTasksComponent,
    FrontUserStoryComponent,
    TasksComponent,
    FilterByStatusPipe,
    AddProjectFrontComponent,
    HomePageFrontComponent,
    ProjectFrontComponent,
    ProjectFrontDetailsComponent,
    UpdateProjectFrontComponent,
    CardListComponent,
    SessionComponent,
    SessionCreateComponent,
    SessionDetailsComponent,
    ActiveSessionsComponent,
    CompletedSessionDetailsComponent,
    SessionFrontComponent,
    SessionCreateFrontComponent,
    SessionDetailsFrontComponent,
  CompletedSessionDetailsFrontComponent,
  CardListFrontComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    DragDropModule,
    NgbPaginationModule,
    NgxPaginationModule ,
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule

  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
