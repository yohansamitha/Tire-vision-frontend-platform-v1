import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  {
    path: 'default',
    loadChildren: () =>
      import('./modules/default/default.module').then((m) => m.DefaultModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];
