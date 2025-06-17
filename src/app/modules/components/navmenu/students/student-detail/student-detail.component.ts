import { Component } from '@angular/core';
import { StudentsService } from '../students.service';
import { Alumno } from '../../../../../core/models/student.interface';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../../../../../core/models/course.interface';
import { CoursesService } from '../../courses/courses.service';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  alumno: Alumno | null = null;
  cursos: Curso[] = [];
  cursosDisponibles: Curso[] = [];
  selectedCursoId: string = '';
  loading = true;
  error = false;

  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadAlumno(id);
      this.loadCursos();
    });
  }

  private loadAlumno(id: string): void {
    this.loading = true;
    this.error = false;
    
    this.studentsService.getAlumnoById(id).subscribe({
      next: (alumno) => {
        this.alumno = alumno;
        this.loading = false;
        this.updateCursosDisponibles();
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        console.error('Error alcargar alumno:', err);
      }
    });
  }

  private loadCursos(): void {
    this.coursesService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
      this.updateCursosDisponibles();
    });
  }

  private updateCursosDisponibles(): void {
    if (this.alumno) {
      this.alumno.inscr = this.alumno.inscr || [];
      this.cursosDisponibles = this.cursos.filter(curso => 
        !this.alumno?.inscr.includes(curso.id)
      );
    }
  }

  inscribirCurso(): void {
    if (this.alumno && this.selectedCursoId) {
      this.studentsService.inscribirCurso(this.alumno.id, this.selectedCursoId)
        .subscribe({
          next: () => {
            this.coursesService.inscribirAlumno(this.selectedCursoId, this.alumno!.id)
              .subscribe({
                next: () => {
                  this.loadAlumno(this.alumno!.id);
                  this.updateCursosDisponibles();
                  this.selectedCursoId = '';
                },
                error: (err) => console.error('Error al inscribir alumno en curso:', err)
              });
          },
          error: (err) => console.error('Error al inscribir curso:', err)
        });
    }
  }
}
