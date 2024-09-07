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
import Swal from 'sweetalert2';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-registration-page',
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
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationProgress: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  register() {
    this.registrationProgress = true;
    this.authService
      .register({
        firstName: this.registrationForm
          .get('firstName')
          ?.value.toString()
          .trim(),
        lastName: this.registrationForm
          .get('lastName')
          ?.value.toString()
          .trim(),
        email: this.registrationForm.get('email')?.value.toString().trim(),
        password: btoa(
          this.registrationForm.get('password')?.value.toString().trim()
        ),
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          console.log(response.message);
          this.router.navigate(['/auth/login']).then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 3000,
            });
          });
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 500) {
            alert(
              'Something went wrong, Please check your user data and try again'
            );
          }
        },
        complete: () => {
          this.registrationProgress = false;
        },
      });
  }
}
