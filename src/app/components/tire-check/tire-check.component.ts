import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ImageUploadBoxComponent } from './inner-items/image-upload-box/image-upload-box.component';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { getLiveUserData } from '../../utils/CommonoFunctions';
import { VehicleService } from '../../services/vehicle.service';
import { TireCheckUpsService } from '../../services/tire-check-ups.service';
import { StandardResponse } from '../../dtos/StandardResponse';
import { SelectVehicleDTO } from '../../dtos/SelectVehicleDTO';
import { KeyValueDTO } from '../../dtos/KeyValueDTO';
import { TireCheckUpDTO } from '../../dtos/TireCheckUpDTO';
import { NumberCategoryPipe } from '../../pipe/NumberCategoryPipe ';

@Component({
  selector: 'app-tire-check',
  standalone: true,
  imports: [
    CommonModule,
    ImageUploadBoxComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NumberCategoryPipe,
  ],
  templateUrl: './tire-check.component.html',
  styleUrl: './tire-check.component.scss',
})
export class TireCheckComponent implements OnInit {
  protected resultsState: boolean = false;
  protected logedOrNot: boolean = false;

  private _frontLeftImage: string = '';
  private _frontRightImage: string = '';
  private _rearLeftImage: string = '';
  private _rearRightImage: string = '';

  protected frontLeftResults: string = '';
  protected frontRightResults: string = '';
  protected rearLeftResults: string = '';
  protected rearRightResults: string = '';
  protected recommendation: string = '';

  protected frontLeftResultsIcon: string =
    '../../../../../assets/icons/empty-camera-icon.svg';
  protected frontRightResultsIcon: string =
    '../../../../../assets/icons/empty-camera-icon.svg';
  protected rearLeftResultsIcon: string =
    '../../../../../assets/icons/empty-camera-icon.svg';
  protected rearRightResultsIcon: string =
    '../../../../../assets/icons/empty-camera-icon.svg';

  protected vehicleList: SelectVehicleDTO[] = [];
  protected selectVehicle = new FormControl('', Validators.required);

  constructor(
    private vehicleService: VehicleService,
    private tireCheckUpsService: TireCheckUpsService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (getLiveUserData().userId) {
      this.logedOrNot = true;
      this.getUserVehicleList();
    } else {
      this.logedOrNot = false;
      this.selectVehicle.clearValidators();
    }
    this.selectVehicle.updateValueAndValidity();
    this.cd.detectChanges();
  }

  getUserVehicleList() {
    this.vehicleService.getUserVehicleList().subscribe({
      next: (response: StandardResponse<SelectVehicleDTO[]>) => {
        const tireData = response.data.filter(
          (item: KeyValueDTO<SelectVehicleDTO[]>) => item.key === 'vehiclelist'
        )[0]?.value;
        this.vehicleList = tireData;
      },
      error: (err) => {},
    });
  }

  checkTire(): void {
    if (getLiveUserData().userId) {
      this.loggedUserTireCheckUpCall();
    } else {
      this.guestUserTireCheckUpCall();
    }
  }

  loggedUserTireCheckUpCall() {
    const userId = getLiveUserData().userId;

    const tireCheckUpDTO: TireCheckUpDTO = {
      vehicleId: this.selectVehicle.value!,
      userId: userId,
      flImage: this.frontLeftImage,
      frImage: this.frontRightImage,
      rlImage: this.rearLeftImage,
      rrImage: this.rearRightImage,
    };

    this.tireCheckUpsService.newTireCheckup(tireCheckUpDTO).subscribe({
      next: (response: StandardResponse<TireCheckUpDTO>) => {
        const tireData = response.data.filter(
          (item: KeyValueDTO<TireCheckUpDTO>) => item.key === 'results'
        )[0]?.value;

        this.frontLeftResults =
          tireData.flResults! === 'No Image Uploaded'
            ? ''
            : 'Condition: ' + this.resultConverter(tireData.flResults!);
        this.frontRightResults =
          tireData.frResults! === 'No Image Uploaded'
            ? ''
            : 'Condition: ' + this.resultConverter(tireData.frResults!);
        this.rearLeftResults =
          tireData.rlResults! === 'No Image Uploaded'
            ? ''
            : 'Condition: ' + this.resultConverter(tireData.rlResults!);
        this.rearRightResults =
          tireData.rrResults! === 'No Image Uploaded'
            ? ''
            : 'Condition: ' + this.resultConverter(tireData.rrResults!);
        this.recommendation = tireData.recommendation!;
        console.log('====================================');
        this.resultsState = true;
      },
      error: (err) => {
        console.log('====================================');
        console.log('error : ', err);
        console.log('====================================');
      },
      complete: () => {
        this.resultsState = true;
      },
    });
  }

  guestUserTireCheckUpCall() {
    const tireCheckUpDTO: TireCheckUpDTO = {
      flImage: this.frontLeftImage,
      frImage: this.frontRightImage,
      rlImage: this.rearLeftImage,
      rrImage: this.rearRightImage,
    };

    this.tireCheckUpsService.guestNewTireCheckup(tireCheckUpDTO).subscribe({
      next: (response: StandardResponse<TireCheckUpDTO>) => {
        const tireData = response.data.filter(
          (item: KeyValueDTO<TireCheckUpDTO>) => item.key === 'results'
        )[0]?.value;

        this.frontLeftResults =
          tireData.flResults! === 'No Image Uploaded'
            ? ''
            : 'Condition: ' + tireData.flResults! + '%';
        this.frontRightResults =
          tireData.frResults! === 'No Image Uploaded'
            ? ''
            : 'Condition: ' + tireData.frResults! + '%';
        this.rearLeftResults =
          tireData.rlResults! === 'No Image Uploaded'
            ? ''
            : 'Condition: ' + tireData.rlResults! + '%';
        this.rearRightResults =
          tireData.rrResults! === 'No Image Uploaded'
            ? ''
            : 'Condition: ' + tireData.rrResults! + '%';
        console.log('====================================');
        this.resultsState = true;
      },
      error: (err) => {
        console.log('====================================');
        console.log('error : ', err);
        console.log('====================================');
      },
      complete: () => {
        this.resultsState = true;
      },
    });
  }

  resultConverter(value: any): string {
    if (typeof value !== 'number' && typeof value !== 'string') {
      return 'Invalid input';
    }

    const num = Number(value);

    if (isNaN(num)) {
      return 'Invalid input';
    }

    if (num >= 0 && num <= 49) {
      return ' Bad';
    } else if (num >= 50 && num <= 100) {
      return 'Good';
    } else {
      return 'Out of range';
    }
  }

  goBack() {
    if (this.logedOrNot) {
      this.router.navigate(['/dashboard/home/']);
    } else {
      this.router.navigate(['/default']);
    }
  }

  public get frontLeftImage(): string {
    return this._frontLeftImage;
  }
  public set frontLeftImage(value: string) {
    this.setImageAndIcon(value, 'frontLeft');
  }

  public get frontRightImage(): string {
    return this._frontRightImage;
  }
  public set frontRightImage(value: string) {
    this.setImageAndIcon(value, 'frontRight');
  }

  public get rearLeftImage(): string {
    return this._rearLeftImage;
  }
  public set rearLeftImage(value: string) {
    this.setImageAndIcon(value, 'rearLeft');
  }

  public get rearRightImage(): string {
    return this._rearRightImage;
  }
  public set rearRightImage(value: string) {
    this.setImageAndIcon(value, 'rearRight');
  }

  private setImageAndIcon(
    value: string,
    position: 'frontLeft' | 'frontRight' | 'rearLeft' | 'rearRight'
  ) {
    switch (position) {
      case 'frontLeft':
        this._frontLeftImage = value;
        break;
      case 'frontRight':
        this._frontRightImage = value;
        break;
      case 'rearLeft':
        this._rearLeftImage = value;
        break;
      case 'rearRight':
        this._rearRightImage = value;
        break;
    }
    this.updateResultsIcon(value, position);
  }

  private updateResultsIcon(value: string, position: string): void {
    const iconPath = value
      ? '../../../../../assets/icons/tire-icon.svg'
      : '../../../../../assets/icons/empty-camera-icon.svg';
    switch (position) {
      case 'frontLeft':
        this.frontLeftResultsIcon = iconPath;
        break;
      case 'frontRight':
        this.frontRightResultsIcon = iconPath;
        break;
      case 'rearLeft':
        this.rearLeftResultsIcon = iconPath;
        break;
      case 'rearRight':
        this.rearRightResultsIcon = iconPath;
        break;
    }
  }
}
