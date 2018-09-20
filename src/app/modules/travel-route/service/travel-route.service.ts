import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { TravelRouteState } from '../store/route.state';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TravelRouteService {
  constructor(
    private store: Store
  ) {

  }

  check() {
  }

  /** Single Route */
  getRoute(id) {
    return this.store.select(TravelRouteState.getRoute).pipe(
      map(fn => fn(id))
    );
  }

  getRouteOnce(id) {
    return this.store.select(TravelRouteState.getRoute).pipe(
      take(1),
      map(fn => fn(id))
    );
  }
}
