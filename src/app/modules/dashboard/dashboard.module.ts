import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RegisteredVehicleCardComponent } from './components/registered-vehicle-card/registered-vehicle-card.component';
import { TireCheckHistoryCardComponent } from './components/tire-check-history-card/tire-check-history-card.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    RegisteredVehicleCardComponent,
    TireCheckHistoryCardComponent,
    HomeComponent,
  ],
})
export class DashboardModule {}
