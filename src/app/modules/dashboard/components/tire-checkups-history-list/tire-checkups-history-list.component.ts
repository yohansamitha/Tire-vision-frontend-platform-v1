import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AddVehicleModelComponent } from '../add-vehicle-model/add-vehicle-model.component';
import { Router } from '@angular/router';
import { StandardResponse } from '../../../../dtos/StandardResponse';
import { KeyValueDTO } from '../../../../dtos/KeyValueDTO';
import { TireCheckUpTableDTO } from '../../../../dtos/TireCheckUpTableDTO';
import { TireCheckUpsService } from '../../../../services/tire-check-ups.service';
import { TireCheckHistoryCardComponent } from '../tire-check-history-card/tire-check-history-card.component';

@Component({
  selector: 'app-tire-checkups-history-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    AddVehicleModelComponent,
    TireCheckHistoryCardComponent,
  ],
  templateUrl: './tire-checkups-history-list.component.html',
  styleUrl: './tire-checkups-history-list.component.scss',
})
export class TireCheckupsHistoryListComponent implements OnInit {
  @ViewChild('addVehicleModelPanel')
  vehicleModelPanel!: AddVehicleModelComponent;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 5, 10, 25];
  pageEvent!: PageEvent;
  pageNumbers = [1, 2, 3, 4, 5];

  tireCheckups: TireCheckUpTableDTO[] = [];

  constructor(
    private route: Router,
    private tireCheckUpsService: TireCheckUpsService
  ) {}

  ngOnInit(): void {
    this.getDashboardTireCheckList();
  }

  navigate(route: string) {
    switch (route) {
      case 'goBack':
        this.route.navigate(['dashboard/home']);
        break;
      case 'newCheck':
        this.route.navigate(['dashboard/home/tire-checkup']);
        break;
    }
  }

  getDashboardTireCheckList() {
    this.tireCheckUpsService.getAllTireCheckList().subscribe({
      next: (response: StandardResponse<any>) => {
        const tireData = response.data.filter(
          (item: KeyValueDTO<TireCheckUpTableDTO[]>) =>
            item.key === 'tirecheckslist'
        )[0]?.value;

        const listSize = response.data.filter(
          (item: KeyValueDTO<any>) => item.key === 'listsize'
        )[0]?.value;

        this.tireCheckups = tireData;
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
