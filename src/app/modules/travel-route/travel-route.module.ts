import { MapboxMapComponent } from './components/mapbox-map/mapbox-map.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapsModule } from './../maps/maps.module';

import { NewRouteCountryComponent } from './components/new-route-country/new-route-country';
import { SharedModule } from '../../shared/shared.module';

import { NgxsModule } from '@ngxs/store';
import { TravelRouteState } from './store/route.state';
import { FixedeMapComponent } from './components/fixed-map/fixed-map';
import { RouteMapComponent } from './components/route-map/route-map';

const componentsToInclude = [
  NewRouteCountryComponent,
  FixedeMapComponent,
  RouteMapComponent,
  MapboxMapComponent
];

@NgModule({
  declarations: [
    ...componentsToInclude
  ],
  entryComponents: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MapsModule,
    NgxsModule.forFeature([
      TravelRouteState
    ])
  ],
  exports: [
    ...componentsToInclude
  ]
})
export class TravelRouteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TravelRouteModule,
      providers: [
      ]
    };
  }
}
