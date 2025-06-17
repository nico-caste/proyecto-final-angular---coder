import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardTableComponent } from './components/dashboard-table/dashboard-table.component';
import { NavmenuModule } from '../navmenu/navmenu.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardTableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NavmenuModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
