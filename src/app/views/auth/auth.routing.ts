import { Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { StartComponent } from './start/start.component';

export const AuthRoutes: Routes = [
  {
    path: 'start',
    component: StartComponent,
    data: { title: 'Start your adventure' }
  },
  {
    path: 'login',
    component: SigninComponent,
    data: { title: 'Login' }
  }
];
