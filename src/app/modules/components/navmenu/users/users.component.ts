import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/models/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from './users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  userSubscription: Subscription | null = null;
  dataSource: MatTableDataSource<User>;
  userForm!: FormGroup;
  isEditing: boolean = false;
  editingUserId: number | null = null;
    
  constructor(
        private userService: UsersService,  
        private fb: FormBuilder
    ) {
        this.dataSource = new MatTableDataSource<User>([]);
        this.initForm();
  }

  private initForm(user?: User | null): void {
    this.userForm = this.fb.group({
      name: [user?.name || '', Validators.required],
      role: [user?.role || 'user'],
      pass: [user?.pass || '', Validators.required],
      token: [user?.token || this.generateToken()]
    });
  }

  private generateToken(): string {
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `user-${random}`;
  }

  ngOnInit(): void {
    this.initForm();
      this.loadUsers();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      }
  }

  loadUsers(): void {
      this.userSubscription = this.userService.getUsers()
        .subscribe({
          next: (user) => {
            this.dataSource.data = user;
          },
          error: (error) => {
          console.error('Error al cargar usuarios:', error);
          }
        });
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser = {
        ...this.userForm.value,
        role: 'user'
      };
      this.userService.checkNameExists(newUser.name)
        .subscribe({
          next: (exists) => {
            if (exists) {
              alert('El nombre de usuario ya existe. Por favor, elija otro nombre.');
              return;
            }
            this.userService.addUser(newUser)
              .subscribe({
                next: () => {
                  this.loadUsers();
                  this.userForm.reset();
                  this.initForm();
                },
                error: (error) => {
                  console.error('Error al agregar usuario:', error);
                }
              });
          },
          error: (error) => {
            console.error('Error al verificar nombre de usuario:', error);
          }
        });
    }
  }

  deleteUser(userId: number): void {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      this.userService.deleteUser(userId)
      .subscribe({next: () => {
        this.loadUsers();
      },error:(error) => {
        console.error('Error al eliminar usuario:', error);
      }
      });
    }
  }

  editUser(userId: number): void {
    this.userService.getUserById(userId)
        .subscribe({
          next: (user) => {
            this.isEditing = true;
            this.editingUserId = userId;
            this.initForm(user);
          },
          error: (error) => {
            console.error('Error al obtener usuario:', error);
          }
        });
  }

  saveUser(): void {
    if (this.userForm.valid && this.isEditing && this.editingUserId) {
      const editId = this.editingUserId; // guardamos el ID en una constante
      const updatedUser = {
        ...this.userForm.value,
        id: editId,
        role: 'user'
      };
      this.userService.checkNameExists(updatedUser.name, editId)
        .subscribe({
          next: (exists) => {
            if (exists) {
              alert('El nombre de usuario ya existe. Por favor, elija otro nombre.');
              return;
            }
            this.userService.updateUser(editId, updatedUser)
              .subscribe({
                next: () => {
                  this.loadUsers();
                  this.resetForm();
                },
                error: (error) => {
                  console.error('Error al actualizar usuario:', error);
                }
              });
          },
          error: (error) => {
            console.error('Error al verificar nombre de usuario:', error);
          }
        });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingUserId = null;
    this.userForm.reset();
    this.initForm();
  }

}
