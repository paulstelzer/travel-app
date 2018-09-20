import { TravelRouteModule } from './../../../modules/travel-route/travel-route.module';
import { RoutesDetailComponent } from './routes-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';
import { RoutesDetailRoutes } from './routes-detail.routing';
import { RoutesOverviewComponent } from './routes-overview/routes-overview.component';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { RoutesInfoComponent } from './routes-info/routes-info.component';
import { RouteTravelResolve } from './routes-detail.resolve';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(RoutesDetailRoutes),
    TravelRouteModule
  ],
  declarations: [
    RoutesDetailComponent,
    RoutesOverviewComponent,
    RoutesListComponent,
    RoutesInfoComponent
  ],
  providers: [
    RouteTravelResolve
  ]
})
export class RoutesDetailModule { }
