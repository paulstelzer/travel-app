import { SharedModule } from './../../shared/shared.module';
import { StartComponent } from './start/start.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { AuthRoutes } from './auth.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(AuthRoutes)
  ],
  declarations: [
    StartComponent,
    SigninComponent
  ]
})
export class AuthModule { }
