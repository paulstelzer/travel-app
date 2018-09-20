import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const CompanyRoutes: Routes = [
  {
    path: 'imprint',
    loadChildren: './imprint/imprint.module#ImprintPageModule'
  }, {
    path: 'privacy',
    loadChildren: './privacy/privacy.module#PrivacyPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CompanyRoutes)
  ],
  declarations: [
  ]
})
export class CompanyModule { }
