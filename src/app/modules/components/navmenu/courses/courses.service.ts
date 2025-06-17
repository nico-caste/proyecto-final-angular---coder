import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Curso } from '../../../../core/models/course.interface';
import { InscriptionHistory } from '../../../../core/models/historial.interface';
import { addInscriptionHistory } from '../../../store/inscriptions.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
    private apiUrl = 'http://localhost:3000/courses';

    constructor(private http: HttpClient, private store: Store) {}
    
    getCursoById(id: string): Observable<Curso | null> {
        return this.http.get<Curso>(`${this.apiUrl}/${id}`);
    }

    getCursos(): Observable<Curso[]> {
        return this.http.get<Curso[]>(this.apiUrl);
    }

    addCurso(curso: Curso): Observable<Curso> {
      return this.http.post<Curso>(this.apiUrl, curso);
    }
         
    deleteCurso(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
       
    updateCurso(cursoId: string, cursoData: Curso): Observable<any> {
      return this.http.put<Curso>(`${this.apiUrl}/${cursoId}`, cursoData);
    }
        
    checkTituloExists(titulo: string, excludeId?: string): Observable<boolean> {
        return this.getCursos().pipe(
            map((cursos: Curso[]) => cursos.some((curso: Curso) => 
                curso.titulo.toLowerCase() === titulo.toLowerCase() && curso.id !== excludeId
            ))
        );
    }

    inscribirAlumno(cursoId: string, alumnoId: string): Observable<Curso> {
      return this.getCursoById(cursoId).pipe(
        switchMap(curso => {
        if (!curso) throw new Error('Curso no encontrado');
          curso.inscr = curso.inscr || [];
          if (curso.inscr.includes(alumnoId)) throw new Error('Alumno ya inscrito');
          curso.inscr.push(alumnoId);
          const history: InscriptionHistory = {
          id: Date.now().toString(),
          studentId: alumnoId,
          courseId: cursoId,
          studentName: '', // Obtener nombre del alumno
          courseName: curso.titulo,
          date: new Date(),
          type: 'INSCRIPTION'
          };
        
          this.store.dispatch(addInscriptionHistory({ history }));
            return this.updateCurso(cursoId, curso);
          })
      );
    }
}
