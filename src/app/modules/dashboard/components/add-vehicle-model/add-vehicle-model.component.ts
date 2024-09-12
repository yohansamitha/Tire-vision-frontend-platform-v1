import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VehicleService } from '../../../../services/vehicle.service';
import { VehicleDTO } from '../../../../dtos/VehicleDTO';
import { StandardResponse } from '../../../../dtos/StandardResponse';
import {
  errorMessage,
  getLiveUserData,
  successMessage,
} from '../../../../utils/CommonoFunctions';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'add-vehicle-model',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-vehicle-model.component.html',
  styleUrl: './add-vehicle-model.component.scss',
})
export class AddVehicleModelComponent {
  matcher = new MyErrorStateMatcher();
  isOpen: boolean = false;
  addVehicleForm: FormGroup;

  imageState: string = '';

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.addVehicleForm = this.fb.group({
      brand: ['', [Validators.required]],
      vehicleModal: ['', [Validators.required]],
      year: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
    });
  }

  registerVehicle() {
    const userId = getLiveUserData().userId;
    const vehicleDTO: VehicleDTO = {
      userId: userId,
      brand: this.addVehicleForm.value.brand,
      model: this.addVehicleForm.value.vehicleModal,
      year: this.addVehicleForm.value.year,
      registrationNumber: this.addVehicleForm.value.registrationNumber,
      image: this.imageState,
    };

    this.vehicleService.registerNewVehicle(vehicleDTO).subscribe({
      next: (response: StandardResponse<null>) => {
        if (response.code === '200') {
          successMessage(response.message);
        } else if (response.code === '400') {
          errorMessage(response.message);
        }
      },
      error: (err) => {
        errorMessage('');
      },
    });
  }

  openPanel() {
    this.isOpen = true;
  }

  closePanel() {
    this.isOpen = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  onFileSelect(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files?.[0];
    if (file) {
      this.readFile(file);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.imageState = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage(event: MouseEvent) {
    event.stopPropagation();
    this.imageState = '';
  }
}
