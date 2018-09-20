import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ActionRoutes } from './action.routing';

import { ActionComponent } from './action.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(ActionRoutes)
  ],
  declarations: [
    ActionComponent
  ]
})
export class FirebaseActionModule { }
