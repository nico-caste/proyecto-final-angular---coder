import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentsService } from './students.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FindPipe } from '../../../pipes/find.pipe';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    FindPipe,
    MatSelectModule
  ],
  exports:[
    StudentsComponent,
    StudentDetailComponent
  ],
  providers: [
    StudentsService
  ]
})
export class StudentsModule { }
