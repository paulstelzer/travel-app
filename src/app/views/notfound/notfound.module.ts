import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { NotFoundRoute } from './notfound.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(NotFoundRoute)
  ],
  declarations: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
