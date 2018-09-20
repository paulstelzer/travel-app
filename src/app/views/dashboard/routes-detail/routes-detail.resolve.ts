import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TravelRouteService } from '../../../modules/travel-route/service/travel-route.service';
import { Observable } from 'rxjs';
import { TravelRoutes } from '../../../modules/travel-route/class/travel-route.class';
import { map } from 'rxjs/operators';
import { RoutesDetailModule } from './routes-detail.module';

@Injectable()
export class RouteTravelResolve implements Resolve<any> {

  constructor(private travelRouteService: TravelRouteService, private router: Router) {
  }

  /* : Observable<TravelRoutes> */
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.travelRouteService.getRouteOnce(id).pipe(
      map(data => {
        if (data) {
          return data;
        } else {
          this.router.navigate(['dashboard']);
        }
      }));
  }
}
