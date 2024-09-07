import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private otpStorage: string = '';
  private otpEmail: string = '';

  storeEmail(email: string) {
    this.otpEmail = email;
  }

  getEmail(): string | undefined {
    return this.otpEmail;
  }

  storeOtp(otp: string) {
    this.otpStorage = otp;
  }

  getOtp(): string | undefined {
    return this.otpStorage;
  }

  validate(): boolean {
    return this.otpEmail === '';
  }

  validateNewPassword(): boolean {
    return this.otpEmail === '' && this.otpStorage === '';
  }
}
