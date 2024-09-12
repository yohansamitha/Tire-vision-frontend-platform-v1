import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { KeyValueDTO } from '../../../../dtos/KeyValueDTO';
import { StandardResponse } from '../../../../dtos/StandardResponse';
import { TireCheckUpTableDTO } from '../../../../dtos/TireCheckUpTableDTO';
import { VehicleTableDTO } from '../../../../dtos/VehicleTableDTO';
import { TireCheckUpsService } from '../../../../services/tire-check-ups.service';
import { VehicleService } from '../../../../services/vehicle.service';
import { getLiveUserData } from '../../../../utils/CommonoFunctions';
import { RegisteredVehicleCardComponent } from '../registered-vehicle-card/registered-vehicle-card.component';
import { TireCheckHistoryCardComponent } from '../tire-check-history-card/tire-check-history-card.component';
import { AddVehicleModelComponent } from '../add-vehicle-model/add-vehicle-model.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RegisteredVehicleCardComponent,
    TireCheckHistoryCardComponent,
    AddVehicleModelComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('addVehicleModelPanel')
  vehicleModelPanel!: AddVehicleModelComponent;

  userName = localStorage.getItem('userName')!;

  vehicles: VehicleTableDTO[] = [];
  tireCheckups: TireCheckUpTableDTO[] = [];

  constructor(
    private route: Router,
    private vehicleService: VehicleService,
    private tireCheckUpsService: TireCheckUpsService,
    public dialog: MatDialog
  ) {
    this.userName = getLiveUserData().username;
  }

  ngOnInit(): void {
    this.getDashboardVehicleList();
    this.getDashboardTireCheckList();
  }

  navigate(route: string) {
    switch (route) {
      case 'vehicle':
        this.route.navigate(['dashboard/home/vehicle-list']);
        break;
      case 'tireChecks':
        this.route.navigate(['dashboard/home/tire-checkups-history-list']);
        break;
      case 'newChecks':
        this.route.navigate(['dashboard/home/tire-checkup']);
        break;
    }
  }

  getDashboardVehicleList() {
    this.vehicleService.getDashboardVehicleList().subscribe({
      next: (response: StandardResponse<VehicleTableDTO[]>) => {
        const vehicleData = response.data.filter(
          (item: KeyValueDTO<VehicleTableDTO[]>) => item.key === 'vehiclelist'
        )[0]?.value;
        this.vehicles = vehicleData;
      },
      error: (err) => {},
    });
  }

  getDashboardTireCheckList() {
    this.tireCheckUpsService.getDashboardTireCheckList().subscribe({
      next: (response: StandardResponse<TireCheckUpTableDTO[]>) => {
        const tireData = response.data.filter(
          (item: KeyValueDTO<TireCheckUpTableDTO[]>) =>
            item.key === 'tirecheckslist'
        )[0]?.value;
        this.tireCheckups = tireData;
      },
      error: (err) => {},
    });
  }
}
