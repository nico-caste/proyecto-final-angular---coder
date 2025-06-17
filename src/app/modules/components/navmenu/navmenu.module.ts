import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavmenuRoutingModule } from './navmenu-routing.module';
import { NavmenuComponent } from './navmenu.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    NavmenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NavmenuRoutingModule
  ],
  exports: [
    NavmenuComponent
  ]
})
export class NavmenuModule { }
