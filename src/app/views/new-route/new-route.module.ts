import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewRouteComponent } from './new-route/new-route.component';
import { FormsModule } from '@angular/forms';
import { TravelRouteModule } from '../../modules/travel-route/travel-route.module';

const routes: Routes = [
  {
    path: '',
    component: NewRouteComponent,
    data: { title: 'New Route' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TravelRouteModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [NewRouteComponent]
})
export class NewRouteModule { }
