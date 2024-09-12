import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisteredVehicleCardComponent } from '../registered-vehicle-card/registered-vehicle-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AddVehicleModelComponent } from '../add-vehicle-model/add-vehicle-model.component';
import { VehicleTableDTO } from '../../../../dtos/VehicleTableDTO';
import { Router } from '@angular/router';
import { VehicleService } from '../../../../services/vehicle.service';
import { StandardResponse } from '../../../../dtos/StandardResponse';
import { KeyValueDTO } from '../../../../dtos/KeyValueDTO';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    RegisteredVehicleCardComponent,
    AddVehicleModelComponent,
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent implements OnInit {
  @ViewChild('addVehicleModelPanel')
  vehicleModelPanel!: AddVehicleModelComponent;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25];
  pageEvent!: PageEvent;
  pageNumbers = [1, 2, 3, 4, 5];

  vehicles: VehicleTableDTO[] = [];

  constructor(private route: Router, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getDashboardVehicleList();
  }

  navigate() {
    this.route.navigate(['dashboard/home']);
  }

  getDashboardVehicleList() {
    this.vehicleService.getAllVehicleList().subscribe({
      next: (response: StandardResponse<any>) => {
        const vehicleData = response.data.filter(
          (item: KeyValueDTO<VehicleTableDTO[]>) => item.key === 'vehiclelist'
        )[0]?.value;

        const listSize = response.data.filter(
          (item: KeyValueDTO<any>) => item.key === 'listsize'
        )[0]?.value;

        this.vehicles = vehicleData;
        this.length = listSize;
      },
      error: (err) => {},
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
