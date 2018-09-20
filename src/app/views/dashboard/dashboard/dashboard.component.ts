
import { Component, OnInit } from '@angular/core';
import { innomobileAnimations } from '../../../shared/animations/innomobile-animations';
import { Store, Select } from '@ngxs/store';
import { UserState } from '../../../modules/user/store/user.state';
import { Observable } from 'rxjs';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TravelRouteState } from '../../../modules/travel-route/store/route.state';
import { TravelRouteStatus, TravelRoutesModel } from '../../../modules/travel-route/store/route.model';
import { TravelRouteService } from '../../../modules/travel-route/service/travel-route.service';
import { apiStorage } from '../../../../environments/constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: innomobileAnimations
})
export class DashboardComponent implements OnInit {
  imageUrl = apiStorage;

  faFacebook = faFacebook;
  faAngleRight = faAngleRight;

  @Select(TravelRouteState.getStatus) status$: Observable<TravelRouteStatus>;
  constructor(private store: Store, private route: TravelRouteService) {
    this.route.check();
  }

  ngOnInit() {  }

  openFacebook() {
    window.open('https://www.facebook.com/travel-app/');
  }

  openSurvey() {
    let userId = this.store.selectSnapshot(UserState.getUser).id;
    if (!userId) {
      userId = '';
    }
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSeHLMQMHn1uGTX-A6eIJaoUWEaDXcQUBwYOXHEmeu8w1kT0Sg/viewform?entry.1787376666='
      + userId
    );
  }

}
