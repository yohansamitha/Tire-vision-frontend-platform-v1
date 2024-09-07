import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../../services/auth.service';
import { StandardResponse } from '../../../../../../dtos/StandardResponse';
import { DataService } from '../../../../../../services/data.service';
import {
  errorMessage,
  successMessage,
} from '../../../../../../utils/CommonoFunctions';

@Component({
  selector: 'app-enter-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './enter-new-password.component.html',
  styleUrl: './enter-new-password.component.scss',
})
export class EnterNewPasswordComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.dataService.validateNewPassword()) {
      this.router.navigate(['/auth/forget-password/enter-email']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  saveNewPassword() {
    this.authService
      .resetPassword(
        this.dataService.getEmail()!,
        this.dataService.getOtp()!,
        this.form.value.newPassword
      )
      .subscribe({
        next: (response: StandardResponse<any>) => {
          if (response.code == '200') {
            successMessage(response.message).then(() => {
              this.router.navigate(['/auth/login']);
            });
          } else if (response.code == '400') {
            errorMessage(response.message);
            if (response.message === 'Invalid verification code') {
              this.router.navigate(['/auth/forget-password/enter-otp']);
            }
          }
        },
        error: (err) => {
          console.error('Error resending OTP', err);
          errorMessage('');
        },
        complete: () => {},
      });
  }

  passwordMatchValidator(fg: AbstractControl): ValidationErrors | null {
    const newPassword = fg.get('newPassword')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword === confirmPassword
      ? null
      : { mismatch: true };
  }

  togglePasswordVisibility(event: any) {
    const input = event.target.previousElementSibling as HTMLInputElement;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      event.target.textContent = input.type === 'password' ? '👁️' : '🚫';
    }
  }
}
