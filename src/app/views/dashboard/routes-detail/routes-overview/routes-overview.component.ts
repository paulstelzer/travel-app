// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { Subscription } from 'rxjs';

// Services
import { TravelRouteService } from '../../../../modules/travel-route/service/travel-route.service';

// Classes and Constants
import { innomobileAnimations } from '../../../../shared/animations/innomobile-animations';
import { TravelRoutes } from '../../../../modules/travel-route/class/travel-route.class';
import { apiStorage } from '../../../../../environments/constants';

@Component({
  selector: 'app-routes-overview',
  templateUrl: './routes-overview.component.html',
  styleUrls: ['./routes-overview.component.scss'],
  animations: innomobileAnimations
})
export class RoutesOverviewComponent implements OnInit, OnDestroy {
  travelRoute: TravelRoutes = null;
  imageUrl = apiStorage;
  subscription: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private travelRouteService: TravelRouteService
  ) {

    this.subscription = this.route.parent.data.subscribe((data) => {
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
