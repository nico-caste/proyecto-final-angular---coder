import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$: Observable<User | null> = this._authUser$.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(name: string, pass: string): void {
    this.http.get<User[]>(`${this.apiUrl}/users?name=${name}&pass=${pass}`)
      .subscribe({
        next: (response) => {
          const user = response[0];
          if (user) {
            localStorage.setItem('token', user.token);
            this.router.navigate(['/dashboard']);
            this._authUser$.next(user);
          } else {
            alert('usuario invalido');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          alert('error al iniciar sesion');
        }
      });
  }

  verifyToken(): Observable<User | boolean> {
    const storedToken = localStorage.getItem('token')
    return this.http.get<User[]>(`http://localhost:3000/users?token=${storedToken}`)
      .pipe(
        map((response) => {
          const user = response[0];
          this._authUser$.next(user);
          return user || false;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._authUser$.next(null);
    this.router.navigate(['/auth/login']);
  }
}