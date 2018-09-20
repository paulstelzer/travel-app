import { Routes } from '@angular/router';
import { ActionComponent } from './action.component';

export const ActionRoutes: Routes = [
  {
    path: '',
    component: ActionComponent,
    data: { title: 'Action' }
  }
];
