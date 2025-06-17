import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor (private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group ({
      name: ['', Validators.required],
      pass: ['', Validators.required]
    })
  };

  login() {
    if (this.loginForm.invalid) { alert ('complete los campos requeridos') }
    else {
      const {name, pass} = this.loginForm.value;
      this.authService.login(name, pass);
    }
  };


}
