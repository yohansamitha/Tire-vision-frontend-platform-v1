import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LiveUserDTO } from '../../../../dtos/LiveUserDTO';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginProgress: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loginProgress = true;
    this.authService
      .login({
        username: this.loginForm.get('email')?.value.toString().trim(),
        password: btoa(this.loginForm.get('password')?.value.toString().trim()),
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('bearerToken', response.jwtToken);
          const liveUserDTO: LiveUserDTO = {
            username: response.username,
            userAvatar: response.userAvatar,
            userId: response.userId,
            userEmail: response.userEmail,
          };

          localStorage.setItem(
            'userData',
            window.btoa(JSON.stringify(liveUserDTO))
          );

          this.router.navigate(['/dashboard']);
        },
        error: (error: HttpErrorResponse) => {
          alert(
            'Something went wrong, Please check your user credentials and try again'
          );
          this.loginProgress = false;
        },
        complete: () => {
          this.loginProgress = false;
        },
      });
  }
}
