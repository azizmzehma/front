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
import { ProjectFrontComponent } from './front-office/front-all/content-front/project-front/project-front.component';
import { AddProjectFrontComponent } from './front-office/front-all/content-front/add-project-front/add-project-front.component';
import { ProjectFrontDetailsComponent } from './front-office/front-all/content-front/project-front-details/project-front-details.component';
import { UpdateProjectFrontComponent } from './front-office/front-all/content-front/update-project-front/update-project-front.component';

const routes: Routes = [
{ path: '', component:FrontAllComponent},
{ path: "admin", component:BackAllComponent,children:[

  { path: 'projects', component: ProjetComponent },
  { path: 'projects/add-project', component: AddprojetComponent },
  { path: 'projects/:id', component: ProjetDetailComponent },
  { path: 'projects/updateProject/:id', component: UpdateprojectComponent },
  { path: 'addComment', component: AddcommentComponent },
  { path: 'products/add-product', component: AddproductComponent },
  { path: 'products/update-product/:id', component: UpdateProductComponent },
  { path: 'products/:productId', component: ProductDetailComponent },



  ]
},
{ path: "user", component:FrontAllComponent,children:[

  { path: 'project', component: ProjectFrontComponent },
  { path: 'AddNewProject', component: AddProjectFrontComponent },
  { path: 'project/:id', component: ProjectFrontDetailsComponent },
  { path: 'project/updateProject/:id', component: UpdateProjectFrontComponent },
  { path: 'addComment', component: AddcommentComponent },
  { path: 'products/add-product', component: AddproductComponent },
  { path: 'products/update-product/:id', component: UpdateProductComponent },
  { path: 'products/:productId', component: ProductDetailComponent },


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
    // Vos autres composants
    ProjetDetailComponent // Assurez-vous que ProjetDetailComponent est déclaré ici
  ],
  imports: [
    CommonModule, // Importez CommonModule ici
    // Autres modules
  ]
})
export class VotreModule { }
