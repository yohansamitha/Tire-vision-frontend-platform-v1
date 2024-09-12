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
import { resultConverter } from '../../../../../utils/CommonoFunctions';

@Component({
  selector: 'app-tire-check-history-details-model',
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
  templateUrl: './tire-check-history-details-model.component.html',
  styleUrl: './tire-check-history-details-model.component.scss',
})
export class TireCheckHistoryDetailsModelComponent implements OnInit {
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

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: any,
    private router: Router,
    private dialogRef: MatDialogRef<TireCheckHistoryDetailsModelComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.frontLeftResults =
      this.data.tirecheck.flResults! === 'No Image Uploaded'
        ? ''
        : 'Condition: ' + resultConverter(this.data.tirecheck.flResults!);
    this.updateResultsIcon(this.data.tirecheck.flResults!, 'frontLeft');

    this.frontRightResults =
      this.data.tirecheck.frResults! === 'No Image Uploaded'
        ? ''
        : 'Condition: ' + resultConverter(this.data.tirecheck.frResults!);
    this.updateResultsIcon(this.data.tirecheck.frResults!, 'frontRight');

    this.rearLeftResults =
      this.data.tirecheck.rlResults! === 'No Image Uploaded'
        ? ''
        : 'Condition: ' + resultConverter(this.data.tirecheck.rlResults!);
    this.updateResultsIcon(this.data.tirecheck.rlResults!, 'rearLeft');

    this.rearRightResults =
      this.data.tirecheck.rrResults! === 'No Image Uploaded'
        ? ''
        : 'Condition: ' + resultConverter(this.data.tirecheck.rrResults!);
    this.updateResultsIcon(this.data.tirecheck.rrResults!, 'rearRight');

    this.recommendation = this.data.tirecheck.recommendation;
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

  checkAgainNavigate() {
    this.dialogRef.close();
    this.router.navigate(['/dashboard/home/tire-checkup']);
  }

  openMap() {}
}
