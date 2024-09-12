import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../../../services/user.service';
import { StandardResponse } from '../../../../dtos/StandardResponse';
import { RegistrationDTO } from '../../../../dtos/RegistrationDTO';
import { KeyValueDTO } from '../../../../dtos/KeyValueDTO';
import {
  errorMessage,
  getLiveUserData,
  successMessage,
} from '../../../../utils/CommonoFunctions';

@Component({
  selector: 'update-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-user-profile.component.html',
  styleUrl: './update-user-profile.component.scss',
})
export class UpdateUserProfileComponent {
  isOpen: boolean = false;
  updateUserProfileForm: FormGroup;
  userEmail: string = '';
  userName: string = '';

  constructor(
    private fb: FormBuilder,
    private userServices: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.updateUserProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });

    const liveUserData = getLiveUserData();
    this.userEmail = liveUserData.userEmail;
    this.userName = liveUserData.username;
  }

  openPanel() {
    this.isOpen = true;
    this.cdr.detectChanges();
    this.getUserData();
  }

  private getUserData() {
    this.userServices.findUserById().subscribe({
      next: (response: StandardResponse<RegistrationDTO>) => {
        const userData = response.data.filter(
          (item: KeyValueDTO<RegistrationDTO>) => item.key === 'userData'
        )[0]?.value;

        this.updateUserProfileForm.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
      },
      error: (err) => {
        console.log(err);
        errorMessage(err.error.message);
      },
    });
  }

  public updateUserDetails() {
    const userId = getLiveUserData().userId;
    const updateUserDetails: RegistrationDTO = {
      userId: userId!,
      firstName: this.updateUserProfileForm.value.firstName,
      lastName: this.updateUserProfileForm.value.lastName,
      userAvatar: '',
    };
    this.userServices.updateUserDetails(updateUserDetails).subscribe({
      next: (response: StandardResponse<null>) => {
        successMessage(response.message);
      },
      error: (err) => {
        errorMessage(err.message);
      },
      complete: () => {
        this.getUserData();
      },
    });
  }

  closePanel() {
    this.isOpen = false;
  }
}
