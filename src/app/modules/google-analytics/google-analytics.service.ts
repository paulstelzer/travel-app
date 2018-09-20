import { Injectable } from '@angular/core';

/*
  Generated class for the GoogleAnalyticsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  init = false;

  constructor() {
    if (window['ga']) {
      this.init = true;
    }
  }

  emitPage() {
    if (!this.init) { return; }
    const complete = window.location.href;
    const origin = window.location.origin;
    const gaUrl = complete.replace(origin, '');

    window['ga']('set', 'page', gaUrl);
    window['ga']('send', 'pageview');
  }

  emitEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null) {
    if (!this.init) { return; }
    window['ga']('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }



}
