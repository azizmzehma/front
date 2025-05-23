import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Redirection par défaut vers /login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Route Login
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent),
  },

  // Route Register
  {
    path: 'register',
    loadComponent: () =>
      import('./components/signup/signup.component').then(m => m.SignupComponent),
  },

  // Ancienne version (non lazy) de login
  { path: 'signin', component: SigninComponent },

  // Partie utilisateur protégée
  {
    path: 'user',
    canActivate: [authGuard],
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: UserHomeComponent },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'advanced-dashboard',
        loadComponent: () =>
          import('./components/advanced-dashboard/advanced-dashboard.component').then(m => m.AdvancedDashboardComponent)
      },
      {
        path: 'dashboard-pro',
        loadComponent: () =>
          import('./components/dashboard-pro/dashboard-pro.component').then(m => m.DashboardProComponent)
      },
      {
        path: 'monitoring',
        loadComponent: () =>
          import('./components/monitoring-board/monitoring-board.component').then(m => m.MonitoringBoardComponent)
      },
      {
        path: 'dynamic-dashboard', // ✅ ROUTE AJOUTÉE
        loadComponent: () =>
          import('./components/dynamic-dashboard/dynamic-dashboard.component').then(m => m.DynamicDashboardComponent)
      }
    ]
  },

  // Partie admin protégée
  {
    path: 'admin',
    canActivate: [authGuard],
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
    ],
  },

  // Page 404
  { path: '**', component: NotfoundComponent }
];
