import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { TireCheckComponent } from '../../components/tire-check/tire-check.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/home/landing', pathMatch: 'full' },
      { path: 'landing', component: HomeComponent },
      {
        path: 'tire-checkup',
        component: TireCheckComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
