import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { AuthComponent } from './modules/components/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate:[authGuard],
  loadChildren:()=> import('./modules/components/dashboard/dashboard.module').then((m)=>m.DashboardModule)
},
{
  path: 'auth',
  component: AuthComponent,
  loadChildren:()=> import('./modules/components/auth/auth.module').then((m)=>m.AuthModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
