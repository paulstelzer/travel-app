import { AppForgotPasswordComponent } from './services/app-confirm/app-forgot-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule,
  MatProgressBarModule,
  MatInputModule,
  MatTabsModule,
  MatChipsModule,
  MatSlideToggleModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderTopComponent } from './components/header-top/header-top.component';
import { SidebarTopComponent } from './components/sidebar-top/sidebar-top.component';


// ALL TIME REQUIRED
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppConfirmComponent } from './services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from './services/app-loader/app-loader.component';

import { LegalFooterComponent } from './components/legal-footer/legal-footer.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

// DIRECTIVES
import { AppDropdownDirective } from './directives/dropdown.directive';
import { DropdownAnchorDirective } from './directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from './directives/dropdown-link.directive';

// PIPES
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { IonicImageLoader } from '@innomobile/ionic-image-loader';

const classesToInclude = [
  HeaderTopComponent,
  SidebarTopComponent,
  SidenavComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AppConfirmComponent,
  AppForgotPasswordComponent,
  AppLoaderComponent,
  LegalFooterComponent,
  BackButtonComponent,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  RelativeTimePipe,
  ExcerptPipe
];

const matClasses = [
  FlexLayoutModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatTabsModule,
  MatInputModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
    IonicImageLoader,
    ...matClasses
  ],
  entryComponents: [
    AppConfirmComponent,
    AppForgotPasswordComponent,
    AppLoaderComponent
  ],
  providers: [

  ],
  declarations: [
    ...classesToInclude
  ],
  exports: [
    TranslateModule,
    FontAwesomeModule,
    IonicImageLoader,
    ...classesToInclude,
    ...matClasses
  ]
})
export class SharedModule { }
