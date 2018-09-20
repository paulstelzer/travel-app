
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [

  ],
  entryComponents: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    AgmCoreModule,
  ],

  exports: [
    AgmCoreModule
  ]
})
export class MapsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapsModule,
      providers: [
      ]
    };
  }
}
