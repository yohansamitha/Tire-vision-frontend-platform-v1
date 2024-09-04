import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  {
    path: 'default',
    loadChildren: () =>
      import('./modules/default/default.module').then((m) => m.DefaultModule),
  },
];
