import { TravelRouteModule } from './modules/travel-route/travel-route.module';
import { availableLanguages, sysOptions } from './../environments/environment.prod';
import { FireuserModule } from '@innomobile/fireuser';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { UserModule } from './modules/user/user.module';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from '@innomobile/core';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { IonicImageLoader } from '@innomobile/ionic-image-loader';

import { NotificationsModule } from '@innomobile/notifications';
import { MapboxModule } from '@innomobile/mapbox';
import { firebaseConfig, googleMapsKey } from '../environments/constants';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicImageLoader.forRoot(),
    SharedModule,
    CoreModule.forRoot({}, 'Travel App'),
    AgmCoreModule.forRoot({
      apiKey: googleMapsKey,
      libraries: ['places'],
      language: 'en',
      region: 'en'
    }),
    NgxsModule.forRoot(),
    // NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FireuserModule.forRoot(firebaseConfig, {
      defaultLanguage: 'en',
      availableLanguages: availableLanguages
    }),
    UserModule.forRoot(),

    TravelRouteModule.forRoot(),
    NotificationsModule.forRoot(),
    MapboxModule.forRoot('pk.eyJ1IjoidHJhaWx5YSIsImEiOiJjamplNHZtZGQxcGJqM3Fudng1MThldXFvIn0.16ZKpm6gTe0WyOtEKugYMg')
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WebView,
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
