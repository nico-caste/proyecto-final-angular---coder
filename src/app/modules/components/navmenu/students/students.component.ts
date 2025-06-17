import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alumno } from '../../../../core/models/student.interface';
import { StudentsService } from './students.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../core/models/user.interface';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})

export class StudentsComponent implements OnInit, OnDestroy {
  alumnoSubscription: Subscription | null = null;
  dataSource: MatTableDataSource<Alumno>;
  alumnoForm!: FormGroup;
  isEditing: boolean = false;
  editingAlumnoId: string | null = null;
  authUser$: Observable<User | null>;
    
  constructor(
    private authService: AuthService,
        private studentsService: StudentsService,  
        private fb: FormBuilder
    ) {
    this.authUser$ = this.authService.authUser$;
    this.dataSource = new MatTableDataSource<Alumno>([]);
    this.initForm();
  }

  private initForm(alumno?: Alumno | null): void {
    this.alumnoForm = this.fb.group({
      name: [alumno?.name || '', Validators.required],
      lastName: [alumno?.lastName || 'alumno'],
      dni: [alumno?.dni || '', Validators.required],
      age: [alumno?.age || '', Validators.required],
      nac: [alumno?.nac || '', Validators.required],
      loc: [alumno?.loc || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initForm();
      this.loadAlumnos();
  }

  ngOnDestroy(): void {
    if (this.alumnoSubscription) {
      this.alumnoSubscription.unsubscribe();
      }
  }

  loadAlumnos(): void {
      this.alumnoSubscription = this.studentsService.getAlumnos()
        .subscribe({
          next: (alumno) => {
            this.dataSource.data = alumno;
          },
          error: (error) => {
          console.error('Error al cargar usuarios:', error);
          }
        });
  }

  addAlumno(): void {
    if (this.alumnoForm.valid) {
      const newAlumno = {
        ...this.alumnoForm.value,
      };
      this.studentsService.checkNameExists(newAlumno.name)
        .subscribe({
          next: (exists) => {
            if (exists) {
              alert('El nombre de Alumno ya existe. Por favor, elija otro nombre.');
              return;
            }
            this.studentsService.addAlumno(newAlumno)
              .subscribe({
                next: () => {
                  this.loadAlumnos();
                  this.alumnoForm.reset();
                  this.initForm();
                },
                error: (error) => {
                  console.error('Error al agregar alumno:', error);
                }
              });
          },
          error: (error) => {
            console.error('Error al verificar nombre de alumno:', error);
          }
        });
    }
  }

  deleteAlumno(alumnoId: string): void {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      this.studentsService.deleteAlumno(alumnoId)
      .subscribe({next: () => {
        this.loadAlumnos();
      },error:(error) => {
        console.error('Error al eliminar alumno:', error);
      }
      });
    }
  }

  editAlumno(alumnoId: string): void {
    this.studentsService.getAlumnoById(alumnoId)
        .subscribe({
          next: (alumno) => {
            this.isEditing = true;
            this.editingAlumnoId = alumnoId;
            this.initForm(alumno);
          },
          error: (error) => {
            console.error('Error al obtener usuario:', error);
          }
        });
  }

  saveAlumno(): void { 
    if (this.alumnoForm.valid && this.isEditing && this.editingAlumnoId) {
      const editId = String(this.editingAlumnoId);
      const updatedAlumno = {
        ...this.alumnoForm.value,
        id: editId,
      };
      this.studentsService.checkNameExists(updatedAlumno.name, editId)
        .subscribe({
          next: (exists) => {
            if (exists) {
              alert('El nombre ya existe. Por favor, elija otro nombre.');
              return;
            }
            this.studentsService.updateAlumno(editId, updatedAlumno)
              .subscribe({
                next: () => {
                  this.loadAlumnos();
                  this.resetForm();
                },
                error: (error) => {
                  console.error('Error al actualizar alumno:', error);
                }
              });
          },
          error: (error) => {
            console.error('Error al verificar nombre de alumno:', error);
          }
        });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingAlumnoId = null;
    this.alumnoForm.reset();
    this.initForm();
  }

}