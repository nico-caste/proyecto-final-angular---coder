import { Injectable } from '@angular/core';
import { Alumno } from '../../../../core/models/student.interface';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InscriptionHistory } from '../../../../core/models/historial.interface';
import { addInscriptionHistory } from '../../../store/inscriptions.actions';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {
    private apiUrl = 'http://localhost:3000/students';

    constructor(private http: HttpClient, private store: Store) {}
    
    getAlumnoById(id: string): Observable<Alumno | null> {
        return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
    }

    getAlumnos(): Observable<Alumno[]> {
        return this.http.get<Alumno[]>(this.apiUrl);
    }

    addAlumno(alumno: Alumno): Observable<Alumno> {
      return this.http.post<Alumno>(this.apiUrl, alumno);
    }
     
    deleteAlumno(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    
    updateAlumno(alumnoId: string, alumnoData: Alumno): Observable<any> {
      return this.http.put<Alumno>(`${this.apiUrl}/${alumnoId}`, alumnoData);
    }
    
    checkNameExists(name: string, excludeId?: string): Observable<boolean> {
      return this.getAlumnos().pipe(
        map((alumnos: Alumno[]) => alumnos.some((alumno: Alumno) => 
          alumno.name.toLowerCase() === name.toLowerCase() && alumno.id !== excludeId
        ))
      );
    }
    inscribirCurso(alumnoId: string, cursoId: string): Observable<Alumno> {
      return this.getAlumnoById(alumnoId).pipe(
        switchMap(alumno => {
          if (!alumno) throw new Error('Alumno no encontrado');
            alumno.inscr = alumno.inscr || [];
            if (alumno.inscr.includes(cursoId)) throw new Error('Ya inscrito en el curso');
              alumno.inscr.push(cursoId);
            const history: InscriptionHistory = {
            id: Date.now().toString(),
            studentId: alumnoId,
            courseId: cursoId,
            studentName: `${alumno.name} ${alumno.lastName}`,
            courseName: '',
            date: new Date(),
            type: 'INSCRIPTION'
            };
          this.store.dispatch(addInscriptionHistory({ history }));

          return this.updateAlumno(alumnoId, alumno);
        })
      );
    }
}