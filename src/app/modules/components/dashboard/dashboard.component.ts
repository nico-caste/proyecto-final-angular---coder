import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authUser$: Observable <User | null>

  constructor (private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
}
