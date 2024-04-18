import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ProjectFrontComponent } from './front-office/front-all/content-front/project-front/project-front.component';
import { ProjectFrontDetailsComponent } from './front-office/front-all/content-front/project-front-details/project-front-details.component';
import { UpdateProjectFrontComponent } from './front-office/front-all/content-front/update-project-front/update-project-front.component';
import { AddProjectFrontComponent } from './front-office/front-all/content-front/add-project-front/add-project-front.component';
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
    ProjectFrontComponent,
    ProjectFrontDetailsComponent,
    UpdateProjectFrontComponent,
    AddProjectFrontComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
