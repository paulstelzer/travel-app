import { Routes } from '@angular/router';
import { RoutesDetailComponent } from './routes-detail.component';
import { RoutesOverviewComponent } from './routes-overview/routes-overview.component';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { RoutesInfoComponent } from './routes-info/routes-info.component';
import { RouteTravelResolve } from './routes-detail.resolve';

/* Generate more components */
// ng g c views/dashboard/routes-detail/routes-info
export const RoutesDetailRoutes: Routes = [
  {
    path: '',
    component: RoutesDetailComponent,
    resolve: {
      travelRoute: RouteTravelResolve
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        component: RoutesOverviewComponent,
        data: { title: 'Overview', breadcrumb: 'MENU.ROUTES.OVERVIEW' }
      },
      {
        path: 'travel',
        component: RoutesListComponent,
        data: { title: 'Travel', breadcrumb: 'MENU.ROUTES.TRAVEL' }
      },
      {
        path: 'info',
        component: RoutesInfoComponent,
        data: { title: 'Info', breadcrumb: 'MENU.ROUTES.INFO' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'overview',
    pathMatch: 'full'
  }
];


