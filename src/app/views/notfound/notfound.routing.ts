import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

export const NotFoundRoute: Routes = [
      {
        path: '',
        component: NotFoundComponent,
        data: { title: 'Not Found' }
      }
];
