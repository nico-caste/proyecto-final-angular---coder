import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTableComponent } from './components/dashboard-table/dashboard-table.component';

const routes: Routes = [
  {
    path: 'students',
    loadChildren:()=> import('../navmenu/students/students.module')
    .then((m)=>m.StudentsModule)
  },
  {
      path: 'courses',
    loadChildren:()=> import('../navmenu/courses/courses.module')
    .then((m)=>m.CoursesModule)
  },
  {
    path: 'users',
    loadChildren:()=> import('../navmenu/users/users.module')
    .then((m)=>m.UsersModule)
  },
  {path:'', component: DashboardTableComponent},
  {path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }