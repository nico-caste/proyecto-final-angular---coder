import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../../core/models/user.interface';
import { Observable, map } from 'rxjs';

const Users: User[] = [];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}
    
  getUserById(id: number): Observable<User | null> {
      return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl);
  }
  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateUser(userId: number, userData: User): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  checkNameExists(name: string, excludeId?: number): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => users.some(user => 
        user.name.toLowerCase() === name.toLowerCase() && user.id !== excludeId
      ))
    );
  }
  
}
