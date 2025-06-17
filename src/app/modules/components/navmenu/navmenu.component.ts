import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navmenu',
  standalone: false,
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.scss'
})
export class NavmenuComponent {
  authUser$: Observable<User | null>;
  
  constructor (private router: Router, private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
  logout () {
    localStorage.removeItem('token');
    this.router.navigate(['auth','login']);
  }

}