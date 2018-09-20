import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { TravelRouteService } from '../../../modules/travel-route/service/travel-route.service';

import { innomobileAnimations } from '../../../shared/animations/innomobile-animations';
import { TravelRoutes } from '../../../modules/travel-route/class/travel-route.class';
import { apiStorage } from '../../../../environments/constants';

@Component({
  selector: 'app-routes-detail',
  templateUrl: './routes-detail.component.html',
  styleUrls: ['./routes-detail.component.scss'],
  animations: innomobileAnimations
})
export class RoutesDetailComponent implements OnInit, OnDestroy {

  travelRoute: TravelRoutes = null;
  imageUrl = apiStorage;
  subscription: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private travelRouteService: TravelRouteService
  ) {

    this.subscription = this.route.data.subscribe((data) => {
      if (data && data.travelRoute) {
        this.travelRoute = data.travelRoute;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
