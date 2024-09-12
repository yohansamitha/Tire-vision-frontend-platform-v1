import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { KeyValueDTO } from '../../../../../dtos/KeyValueDTO';
import { StandardResponse } from '../../../../../dtos/StandardResponse';
import { TireCheckUpTableDTO } from '../../../../../dtos/TireCheckUpTableDTO';
import { TireCheckUpsService } from '../../../../../services/tire-check-ups.service';
import { resultConverter } from '../../../../../utils/CommonoFunctions';

@Component({
  selector: 'app-vehicle-details-model',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './vehicle-details-model.component.html',
  styleUrl: './vehicle-details-model.component.scss',
})
export class VehicleDetailsModelComponent implements OnInit {
  protected frontLeftResults: string = '';
  protected frontRightResults: string = '';
  protected rearLeftResults: string = '';
  protected rearRightResults: string = '';

  protected frontLeftResultsIcon: string =
    '../../../../../assets/icons/empty-camera-icon.svg';
  protected frontRightResultsIcon: string =
    '../../../../../assets/icons/empty-camera-icon.svg';
  protected rearLeftResultsIcon: string =
    '../../../../../assets/icons/empty-camera-icon.svg';
  protected rearRightResultsIcon: string =
    '../../../../../assets/icons/empty-camera-icon.svg';

  protected checkDate: string = '';
  protected recommendation: string = '';
  protected buttonText: string = 'Check again';

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: any,
    private router: Router,
    private tireCheckUpsService: TireCheckUpsService,
    private dialogRef: MatDialogRef<VehicleDetailsModelComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLastTireCheck();
  }

  checkAgainNavigate() {
    this.dialogRef.close();
    this.router.navigate(['/dashboard/home/tire-checkup']);
  }

  getLastTireCheck() {
    this.tireCheckUpsService
      .getLastTireCheck(this.data.vehicle.vehicleId)
      .subscribe({
        next: (response: StandardResponse<TireCheckUpTableDTO[]>) => {
          const tireData = response.data.filter(
            (item: KeyValueDTO<TireCheckUpTableDTO[]>) =>
              item.key === 'tirecheckslist'
          )[0]?.value[0];

          if (tireData) {
            this.frontLeftResults =
              tireData.flResults! === 'No Image Uploaded'
                ? ''
                : 'Condition: ' + resultConverter(tireData.flResults!);
            this.updateResultsIcon(tireData.flResults!, 'frontLeft');

            this.frontRightResults =
              tireData.frResults! === 'No Image Uploaded'
                ? ''
                : 'Condition: ' + resultConverter(tireData.frResults!);
            this.updateResultsIcon(tireData.frResults!, 'frontRight');

            this.rearLeftResults =
              tireData.rlResults! === 'No Image Uploaded'
                ? ''
                : 'Condition: ' + resultConverter(tireData.rlResults!);
            this.updateResultsIcon(tireData.rlResults!, 'rearLeft');

            this.rearRightResults =
              tireData.rrResults! === 'No Image Uploaded'
                ? ''
                : 'Condition: ' + resultConverter(tireData.rrResults!);
            this.updateResultsIcon(tireData.rrResults!, 'rearRight');

            this.checkDate = tireData.checkDate;

            this.recommendation = tireData?.recommendation;
            this.buttonText = 'Check again';
          } else {
            this.recommendation = 'Start new journey with Tire Vision';
            this.buttonText = 'Start New Test';
          }
        },
        error: (err) => {},
      });
  }

  private updateResultsIcon(value: string, position: string): void {
    const iconPath =
      value !== 'No Image Uploaded'
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

  openMap() {}
}
