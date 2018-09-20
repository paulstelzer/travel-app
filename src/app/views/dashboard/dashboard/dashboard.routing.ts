import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [ {
      path: '',
      component: DashboardComponent,
      data: { title: 'Dashboard', breadcrumb: 'MENU.DASHBOARD' }
    }]
  }
];
