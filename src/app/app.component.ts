import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Platform } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngxs/store';
import { UseLanguage } from '@innomobile/fireuser';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  appTitle = 'travel-app';
  pageTitle = '';

  constructor(
    private platform: Platform,
    private updates: SwUpdate,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store
  ) {
    this.initializeApp();
    this.checkSw();
  }


  ngOnInit() {
  }

  async initializeApp() {
    await this.platform.ready();
    console.log('Platform is ready');

    if (this.platform.is('cordova')) {
      this.statusBar.styleBlackOpaque();
      this.statusBar.backgroundColorByHexString('#9C27B0');
      this.splashScreen.hide();
    }
    setTimeout(() => {
      this.store.dispatch(new UseLanguage());
    }, 1500);


  }

  async checkSw() {
    try {
      if (!this.updates.isEnabled) {
        return;
      }
      const data = await this.updates.checkForUpdate();
      console.log('[SERVICE_WORKER] Updatecheck', data);

      this.updates.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        this.updates.activateUpdate().then(() => document.location.reload());
      });
      this.updates.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
    } catch (error) {
      console.log('[SERVICE_WORKER] Error', error);
    }
  }

}
