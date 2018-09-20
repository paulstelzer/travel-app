import { Platform } from '@ionic/angular';
import { Component, NgZone, ViewChild, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Address } from '../../../maps/classes/address.class';
import { MatButton } from '@angular/material';
import { ToastService } from '@innomobile/core';

/**
 * Generated class for the NewRouteCountryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-new-route-country',
  templateUrl: 'new-route-country.html',
  styleUrls: ['./new-route-country.scss'],
})
export class NewRouteCountryComponent implements AfterViewInit {
  address = new Address();
  inputSearch: string;

  @ViewChild('inputSearch') public searchElementRef: ElementRef;
  @ViewChild('submitButton') submitButton: MatButton;

  @Output() sendAddress = new EventEmitter<any>();
  @Output() nextStep = new EventEmitter<boolean>();
  type = 'START';

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public platform: Platform, private toast: ToastService) {

  }

  ngAfterViewInit() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.setMap(place.geometry.location.lat(), place.geometry.location.lng());
        });
      });
    });
  }

  private setMap(lat, lng) {
    this.address.setPosition(lat, lng);
  }

  private geocodeLatLng() {
    const geocoder = new google.maps.Geocoder;
    const latlng = {
      lat: this.address.lat,
      lng: this.address.lng
    };
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status.toString() === 'OK') {
        if (results[0]) {
          this.address.getAddressFromMaps(results[0]);
          this.sendAddress.emit({
            type: this.type,
            address: this.address.export()
          });
        }
      } else {
        this.sendAddress.emit({
          type: this.type,
          address: this.address.export()
        });
      }
      this.submitButton.disabled = false;
/*       if(this.type === 'START') {
        this.address = new Address();
        this.searchElementRef.clearTextInput();
      } */
    });
  }

  next() {
    this.submitButton.disabled = true;
    if (this.address.lat) {
      this.geocodeLatLng();
      this.nextStep.emit(true);
    } else {
      this.submitButton.disabled = false;
      this.toast.sendToastTranslation('error', 'NEW_ROUTE.MAP.ERROR');
    }

  }

}
