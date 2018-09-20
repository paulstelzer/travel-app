import { MapsModule } from './../maps.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: MapsModule
})
export class LocationService {

  constructor() {

  }

  getCurrentPosition() {
    /*
    this.core.sendToast('info', 'Versuche deinen aktuellen Standort zu ermitteln');
    return this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.core.sendToast('success', 'Dein Standort wurde ermittelt!');
        return {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
      })
      .catch((error) => {
        this.core.sendToast('error', 'Der Zugriff auf deinen Standort ist nicht möglich, da du diesen verweigert hast!');
        throw error;
      });*/
  }

}
