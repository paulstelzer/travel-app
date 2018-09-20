import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '@innomobile/fireuser';
import { UserState } from '../../modules/user/store/user.state';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.store.selectSnapshot(UserState.getUser);
    console.log('GUARD', user);
    if (user) {
      return true;
    }
    this.router.navigate(['/auth/start']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NoAccountAuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.store.selectSnapshot(UserState.getUser);
    if (!user) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
