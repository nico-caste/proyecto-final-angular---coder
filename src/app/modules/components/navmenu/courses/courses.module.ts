import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FindPipe } from '../../../pipes/find.pipe';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    FindPipe,
    MatSelectModule
  ],
  exports:[
    CoursesComponent,
    CourseDetailComponent
  ]
})
export class CoursesModule { }
