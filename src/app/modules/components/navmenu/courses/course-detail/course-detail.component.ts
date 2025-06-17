import { Component } from '@angular/core';
import { Curso } from '../../../../../core/models/course.interface';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from '../../../../../core/models/student.interface';
import { StudentsService } from '../../students/students.service';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  curso: Curso | null = null;
  loading = true;
  error = false;
  alumnos: Alumno[] = [];
  alumnosDisponibles: Alumno[] = [];
  selectedAlumnoId: string = '';


  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadCurso(id);
      this.loadAlumnos();
    });
  }
  private loadAlumnos(): void {
    this.studentsService.getAlumnos().subscribe(alumnos => {
      this.alumnos = alumnos;
      this.updateAlumnosDisponibles();
    });
  }

  private updateAlumnosDisponibles(): void {
    if (this.curso) {
      this.curso.inscr = this.curso.inscr || [];
      this.alumnosDisponibles = this.alumnos.filter(alumno => 
        !this.curso?.inscr.includes(alumno.id)
      );
    }
  }

  private loadCurso(id: string): void {
    this.loading = true;
    this.error = false;
    
    this.coursesService.getCursoById(id).subscribe({
      next: (curso) => {
        this.curso = curso;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        console.error('error al cargar curso:', err);
      }
    });
  }

    inscribirAlumno(): void {
    if (this.curso && this.selectedAlumnoId) {
      this.coursesService.inscribirAlumno(this.curso.id, this.selectedAlumnoId)
        .subscribe({
          next: () => {
            this.studentsService.inscribirCurso(this.selectedAlumnoId, this.curso!.id)
              .subscribe({
                next: () => {
                  this.loadCurso(this.curso!.id);
                  this.updateAlumnosDisponibles();
                  this.selectedAlumnoId = '';
                },
                error: (err) => console.error('Error al inscribir curso en alumno:', err)
              });
          },
          error: (err) => console.error('Error al inscribir alumno:', err)
        });
    }
  }
}
