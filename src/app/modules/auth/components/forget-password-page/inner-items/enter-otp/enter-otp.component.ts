import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../services/auth.service';
import { StandardResponse } from '../../../../../../dtos/StandardResponse';
import { CommonModule } from '@angular/common';
import { AutoTabDirective } from '../../../../../../directives/auto-tab.directive';
import { DataService } from '../../../../../../services/data.service';
import { errorMessage } from '../../../../../../utils/CommonoFunctions';

@Component({
  selector: 'app-enter-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutoTabDirective],
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.scss'],
})
export class EnterOtpComponent implements OnInit {
  otpForm!: FormGroup;
  remainingTime = 120;
  formattedTime: string = this.formatTime(this.remainingTime);
  userEmail: string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {
    this.otpForm = new FormGroup({
      digit1: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]$'),
      ]),
      digit2: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]$'),
      ]),
      digit3: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]$'),
      ]),
      digit4: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]$'),
      ]),
    });

    this.startTimer();
    this.userEmail = this.dataService.getEmail()!;
    if (this.dataService.validate()) {
      this.router.navigate(['/auth/forget-password/enter-email']);
    }
    this.dataService.storeEmail('');
  }

  ngOnInit(): void {}

  startTimer() {
    const interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.formattedTime = this.formatTime(this.remainingTime);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  resendCode() {
    this.remainingTime = 120;
    this.formattedTime = this.formatTime(this.remainingTime);
    this.startTimer();
    this.newVerificationCode();
  }

  verifyOtp() {
    if (this.otpForm.valid) {
      const otpValue = Object.values(this.otpForm.value).join('');
      this.dataService.storeOtp(otpValue);
      this.dataService.storeEmail(this.userEmail);
      this.router.navigate(['/auth/forget-password/enter-new-password']);
    } else {
      console.error('Form is not valid');
      errorMessage('');
    }
  }

  cancelVerification() {
    this.router.navigate(['/auth/login']);
  }

  newVerificationCode() {
    this.authService.forgotPassword(this.userEmail).subscribe({
      next: (response: StandardResponse<any>) => {},
      error: (err) => {
        errorMessage('Something Went Wrong Getting New Otp');
      },
    });
  }

  showErrorMessage(): boolean {
    const digit1 = this.otpForm.get('digit1');
    const digit2 = this.otpForm.get('digit2');
    const digit3 = this.otpForm.get('digit3');
    const digit4 = this.otpForm.get('digit4');

    return (
      (digit1?.touched && digit1?.invalid) ||
      (digit2?.touched && digit2?.invalid) ||
      (digit3?.touched && digit3?.invalid) ||
      (digit4?.touched && digit4?.invalid) ||
      false
    );
  }
}
