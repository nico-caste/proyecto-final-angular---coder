import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../../../core/services/auth.service';
import { User } from '../../../../../core/models/user.interface';
import { Store } from '@ngrx/store';
import { InscriptionHistory } from '../../../../../core/models/historial.interface';
import * as InscriptionHistoryActions from '../../../../store/inscriptions.actions';
import { StudentsService } from '../../../navmenu/students/students.service';
import { CoursesService } from '../../../navmenu/courses/courses.service';

interface AppState {
  inscriptionHistory: {
    history: InscriptionHistory[];
    loading: boolean;
    error: any;
  };
}

@Component({
  selector: 'app-dashboard-table',
  standalone: false,
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss',
  providers: [ ]
})
export class DashboardTableComponent {  
    authUser$: Observable<User | null>;
    history$: Observable<InscriptionHistory[]>;
    totalStudents: number = 0;
    totalCourses: number = 0;
    
    constructor(
        private authService: AuthService,
        private store: Store<AppState>,
        private studentsService: StudentsService,
        private coursesService: CoursesService
  
    ) {
        this.authUser$ = this.authService.authUser$;
        this.history$ = this.store.select(state => state.inscriptionHistory.history);
    }

    ngOnInit() {
        this.store.dispatch(InscriptionHistoryActions.loadInscriptionHistory());
        this.loadCounts()
    }

    private loadCounts(): void {
    this.studentsService.getAlumnos().subscribe(alumnos => {
      this.totalStudents = alumnos.length;
    });
    this.coursesService.getCursos().subscribe(cursos => {
      this.totalCourses = cursos.length;
    });
  }
}
