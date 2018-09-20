import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { NoAccountAuthGuard, LoggedInAuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'action',
    component: AuthLayoutComponent,
    loadChildren: './views/action/action.module#FirebaseActionModule'
  },
  {
    path: 'company',
    component: AuthLayoutComponent,
    loadChildren: './views/company/company.module#CompanyModule'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [NoAccountAuthGuard],
    loadChildren: './views/auth/auth.module#AuthModule'
  },
  {
    path: '404',
    component: AuthLayoutComponent,
    loadChildren: './views/notfound/notfound.module#NotFoundModule'
  },
  {
    path: 'new',
    component: AuthLayoutComponent,
    canActivate: [LoggedInAuthGuard],
    loadChildren: './views/new-route/new-route.module#NewRouteModule'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [LoggedInAuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard/dashboard.module#DashboardModule',
        data: { title: 'Dashboard' }
      },
      {
        path: 'routes/:id',
        loadChildren: './views/dashboard/routes-detail/routes-detail.module#RoutesDetailModule',
        data: { title: 'Routes' }
      },
      {
        path: 'routes',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
