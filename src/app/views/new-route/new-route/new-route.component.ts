import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatTabGroup } from '@angular/material';
import { Router } from '@angular/router';
import { ToastService } from '@innomobile/core';
import { AuthService } from '@innomobile/fireuser';
import { Select, Store } from '@ngxs/store';
import { from, Observable, Observer, Subscription } from 'rxjs';
import { concatMap, toArray } from 'rxjs/operators';
import { GoogleAnalyticsService } from '../../../modules/google-analytics/google-analytics.service';
import { TravelRoutes } from '../../../modules/travel-route/class/travel-route.class';
import { TravelRouteService } from '../../../modules/travel-route/service/travel-route.service';
import { AddRoute } from '../../../modules/travel-route/store/route.actions';
import { User } from '../../../modules/user/classes/user.class';
import { UpdateUser } from '../../../modules/user/store/user.actions';
import { UserState } from '../../../modules/user/store/user.state';
import { innomobileAnimations } from '../../../shared/animations/innomobile-animations';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.scss'],
  animations: innomobileAnimations
})
export class NewRouteComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild('group') group: MatTabGroup;
  @ViewChild('input') nameInput: ElementRef;
  route: TravelRoutes = new TravelRoutes();

  durations = [
    {
      value: 0,
      text: 'zeroWeek'
    }, {
      value: 1,
      text: 'oneWeek'
    }, {
      value: 2,
      text: 'twoWeek'
    }, {
      value: 3,
      text: 'threeWeek'
    }, {
      value: 4,
      text: 'oneMonth'
    }, {
      value: 8,
      text: 'twoMonth'
    }, {
      value: 20,
      text: 'fifeMonth'
    }
  ];

  canTap = true;
  submitted = false;
  registerCredentials = { name: '', email: '', password: '' };
  username = '';
  currentStep = 0;
  maxStep = 0;
  buttonsDisabled = false;

  subscription: Subscription = null;


  @Select(UserState.getUser) user$: Observable<User>;
  constructor(
    private auth: AuthService,
    private store: Store,
    private routeService: TravelRouteService,
    private router: Router,
    private toast: ToastService,
    private ga: GoogleAnalyticsService
  ) { }

  ngOnInit() {
    this.route = new TravelRoutes();
    this.ga.emitEvent('new-route', 'start');

    const imageArray = ['./assets/img/new-route/slider1.jpg', './assets/img/new-route/month.jpg', './assets/img/new-route/slider3.jpg'];
    for (let i = 1; i <= 9; i++) {
      imageArray.push('./assets/img/new-route/' + i + '_0.jpg');
      imageArray.push('./assets/img/new-route/' + i + '_1.jpg');
    }

    this.subscription = from(imageArray).pipe(
      concatMap(this.loadImage),
      toArray()
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  back() {
    if (this.canTap) {
      this.canTap = false;

      setTimeout(() => {
        this.canTap = true;
      }, 200);

    }
  }

  setAddress(data) {
    if (data && data.type) {
      switch (data.type) {
        case 'START':
          this.route.startCountry = data.address;
          // this.next(); // Remove if user can select destination
          break;
        case 'END':
          this.route.country = data.address;
          // this.next();
          break;
      }
    }
  }

/*   setUsername() {
    if (this.username) {
      this.store.dispatch(new UpdateUser({
        'details.firstname': this.username
      }));
      this.next();
    } else {
      this.toast.sendToastTranslation('error', 'NEW_ROUTE.USERNAME.ERROR');
      this.nameInput.nativeElement.focus();
    }
  } */

  next(submit = false) {
    if (this.canTap) {
      this.canTap = false;

      setTimeout(() => {
        this.canTap = true;
      }, 200);

      this.group.selectedIndex++;
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);

      if (submit) {
        this.submitRequest();
      }
    }
  }

  selectedIndexChange($event) {
    if (this.maxStep < $event) {
      this.maxStep = $event;
      this.ga.emitEvent('new-route', 'step-' + this.maxStep);
    }

    this.currentStep = $event;


  }

  submitRequest() {
    this.route.userId = this.store.selectSnapshot(UserState.userId);

    this.store.dispatch(new AddRoute(this.route)).subscribe((data) => {
      if (data) {
        this.ga.emitEvent('new-route', 'completed');
        this.submitted = true;
      }
    });
  }


  end() {
    this.router.navigate(['dashboard']);
  }

  yesAccount() {
    this.ga.emitEvent('user', 'email-submit');
    this.ga.emitEvent('account', 'yes');
    this.end();
  }

  noAccount() {
    this.ga.emitEvent('account', 'no');
    this.end();
  }

  async saveAccount() {
    this.progressBar.mode = 'indeterminate';
    this.buttonsDisabled = true;

    if (this.registerCredentials.name) {
      this.store.dispatch(new UpdateUser({
        'details.firstname': this.registerCredentials.name
      }));
    }


    try {
      const data = await this.auth.emailUpgrade(this.registerCredentials.email, this.registerCredentials.password);
      if (data) {
        this.yesAccount();
        this.auth.sendEmailVerification();

      }
    } catch (err) {
      console.log('ERRRO', err);
    }

    this.progressBar.mode = 'determinate';
    this.buttonsDisabled = false;
  }

  loadImage(imagePath) {
    return Observable.create((observer: Observer<any>) => {
      const img = new Image();
      img.src = imagePath;
      img.onload = () => {
        observer.next(img);
        observer.complete();
      };
      img.onerror = (err) => {
        observer.error(err);
      };
    });
  }

}
