import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Curso } from '../../../../core/models/course.interface';
import { CoursesService } from './courses.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user.interface';


@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  cursoSubscription: Subscription | null = null;
  dataSource: MatTableDataSource<Curso>;
  cursoForm!: FormGroup;
  isEditing: boolean = false;
  editingCursoId: string | null = null;
  authUser$: Observable<User | null>;
    
    constructor(
        private authService: AuthService,
        private coursesService: CoursesService,  
        private fb: FormBuilder
    ) {
        this.authUser$ = this.authService.authUser$;
        this.dataSource = new MatTableDataSource<Curso>([]);
        this.initForm();
    }

    private initForm(curso?: Curso | null): void {
        this.cursoForm = this.fb.group({
            titulo: [curso?.titulo || '', Validators.required],
            descr: [curso?.descr || '', Validators.required],
            req: [curso?.req || '', Validators.required],
            dur: [curso?.dur || '', Validators.required],
            // inscr: [curso?.inscr || '', Validators.required],
        });
    }

    ngOnInit(): void {
        this.initForm();
        this.loadCursos();
    }

    ngOnDestroy(): void {
        if (this.cursoSubscription) {
            this.cursoSubscription.unsubscribe();
        }
    }

    loadCursos(): void {
        this.cursoSubscription = this.coursesService.getCursos()
        .subscribe({
            next: (curso) => {
            this.dataSource.data = curso;
            },
            error: (error) => {
            console.error('Error al cargar cursos:', error);
            }
        });
    }

    addCurso(): void {
        if (this.cursoForm.valid) {
            const newCurso = {
            ...this.cursoForm.value,
        };
        this.coursesService.checkTituloExists(newCurso.titulo)
        .subscribe({
            next: (exists) => {
            if (exists) {
                alert('El nombre de curso ya existe. Por favor, elija otro titulo.');
                return;
            }
            this.coursesService.addCurso(newCurso)
            .subscribe({
                next: () => {
                    this.loadCursos();
                    this.cursoForm.reset();
                    this.initForm();
                },
                error: (error) => {
                    console.error('Error al agregar curso:', error);
                }
                });
            },
          error: (error) => {
            console.error('Error al verificar nombre de curso:', error);
          }
        });
    }
    }

    deleteCurso(cursoId: string): void {
        if (confirm('¿Está seguro que desea eliminar este curso?')) {
            this.coursesService.deleteCurso(cursoId)
            .subscribe({next: () => {
            this.loadCursos();
        },error:(error) => {
            console.error('Error al eliminar curso:', error);
        }
        });
        }
    }

    editCurso(cursoId: string): void {
        this.coursesService.getCursoById(cursoId)
        .subscribe({
            next: (curso) => {
            this.isEditing = true;
            this.editingCursoId = cursoId;
            this.initForm(curso);
            },
            error: (error) => {
                console.error('Error al obtener curso:', error);
            }
        });
    }

    saveCurso(): void { 
        if (this.cursoForm.valid && this.isEditing && this.editingCursoId) {
            const editId = String(this.editingCursoId);
            const updatedCurso = {
            ...this.cursoForm.value,
            id: editId,
        };
        this.coursesService.checkTituloExists(updatedCurso.titulo, editId)
        .subscribe({
            next: (exists) => {
            if (exists) {
                alert('El titulo ya existe. Por favor, elija otro titulo.');
                return;
            }
            this.coursesService.updateCurso(editId, updatedCurso)
                .subscribe({
                next: () => {
                    this.loadCursos();
                    this.resetForm();
                },
                error: (error) => {
                  console.error('Error al actualizar curso:', error);
                }
            });
            },
            error: (error) => {
                console.error('Error al verificar nombre de curso:', error);
            }
        });
        }
    }

    resetForm(): void {
        this.isEditing = false;
        this.editingCursoId = null;
        this.cursoForm.reset();
        this.initForm();
    }

}
