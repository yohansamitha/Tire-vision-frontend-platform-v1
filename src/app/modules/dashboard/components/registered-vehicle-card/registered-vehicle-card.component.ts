import { Component, Input } from '@angular/core';
import { VehicleTableDTO } from '../../../../dtos/VehicleTableDTO';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VehicleDetailsModelComponent } from '../models/vehicle-details-model/vehicle-details-model.component';

@Component({
  selector: 'registered-vehicle-card',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './registered-vehicle-card.component.html',
  styleUrl: './registered-vehicle-card.component.scss',
})
export class RegisteredVehicleCardComponent {
  @Input() vehicle!: VehicleTableDTO;

  constructor(public dialog: MatDialog) {}

  showVehicleDetails() {
    this.dialog.open(VehicleDetailsModelComponent, {
      data: {
        vehicle: this.vehicle,
      },
    });
  }
}
