import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users'
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'audits',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
