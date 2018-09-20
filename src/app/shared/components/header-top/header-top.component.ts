import { Store, Select } from '@ngxs/store';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { Subscription, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';
import { FireAuthUserSignOut, LanguageState, UpdateLanguage } from '@innomobile/fireuser';
import { Router } from '@angular/router';
import { availableLanguages } from '../../../../environments/environment.prod';

import { NotificationState } from '@innomobile/notifications';
import { UserSignOut } from '../../../modules/user/store/user.actions';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: any;
  menuItems: any;
  menuItemSub: Subscription;

  availableLangs = availableLanguages;
  currentLang = 'en';

  @Input() notificPanel;

  @Select(NotificationState.countNotifications) countNotifications$: Observable<number>;
  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public translate: TranslateService,
    private router: Router,
    private store: Store
  ) {
    this.store.select(LanguageState.getLanguage).subscribe((data) => {
      this.currentLang = data;
    });
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.menuItemSub = this.navService.menuItems$
      .subscribe(res => {
        res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
        const limit = 4;
        const mainItems: any[] = res.slice(0, limit);
        if (res.length <= limit) {
          return this.menuItems = mainItems;
        }
        const subItems: any[] = res.slice(limit, res.length - 1);
        mainItems.push({
          name: 'More',
          type: 'dropDown',
          tooltip: 'More',
          icon: 'more_horiz',
          sub: subItems
        });
        this.menuItems = mainItems;
      });
  }
  ngOnDestroy() {
    this.menuItemSub.unsubscribe();
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  setLang($event) {
    const lang = $event.value;
    this.store.dispatch(new UpdateLanguage(lang));
  }

  signOut() {
    this.store.dispatch(new UserSignOut()).subscribe(
      (data) => {
        console.log('Data Sign out', data);
        this.router.navigate(['auth/start']);
      },
      error => { },
      () => console.log('Signout complete')
    );
  }
}
