import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StandardResponse } from '../../../../../../dtos/StandardResponse';
import {
  errorMessage,
  successMessage,
} from '../../../../../../utils/CommonoFunctions';
import { DataService } from '../../../../../../services/data.service';

@Component({
  selector: 'app-enter-email',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.scss'],
})
export class EnterEmailComponent {
  emailForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      console.log('Email sent to:', this.emailForm.value.email);
      this.dataService.storeEmail(this.emailForm.value.email);
      this.authService.forgotPassword(this.emailForm.value.email).subscribe({
        next: (response: StandardResponse<any>) => {
          if (response.code != '400') {
            successMessage(response.message).then(() => {
              this.router.navigate(['/auth/forget-password/enter-otp']);
            });
          } else {
            errorMessage(response.message);
          }
        },
        error: (err) => {
          console.error('Form is not valid', err);
          errorMessage('');
        },
        complete: () => {},
      });
    } else {
      console.error('Form is not valid');
    }
  }
}
