import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyPageComponent } from './privacy-page.component';
import { SharedModule } from '../../../shared/shared.module';


const routes: Routes = [  {
  path: '',
  component: PrivacyPageComponent
}, ];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrivacyPageComponent]
})
export class PrivacyPageModule { }
