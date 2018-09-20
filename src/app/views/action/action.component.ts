import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { innomobileAnimations } from './../../shared/animations/innomobile-animations';
import { CoreService } from '@innomobile/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { AuthService } from '@innomobile/fireuser';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
  animations: innomobileAnimations
})
export class ActionComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild('submitButton') submitButton: MatButton;

  oobCode = '';
  mode = '';
  verifySuccess = -1;
  newPassword = '';

  constructor(
    private router: Router,
    private core: CoreService,
    private auth: AuthService,
  ) {

  }

  ngOnInit() {
    const params = this.core.getUrlVars();

    if (params['oobCode']) {
      this.oobCode = params['oobCode'];
    } else {
      return;
    }

    if (params['mode']) {
      this.mode = params['mode'];
    } else {
      return;
    }
    this.check();
  }

  async check() {
    switch (this.mode) {
      case 'verifyEmail':
        try {
          const data = await this.auth.verifyEmail(this.oobCode);
          if (data) {
            this.verifySuccess = 1;
            return;
          }

        } catch (error) {

        }
        this.verifySuccess = 0;

        break;
      case 'resetPassword':

        break;

      case 'recoverEmail':
        try {
          const data = await this.auth.recoverEmail(this.oobCode);
          if (data) {
            this.verifySuccess = 1;
            return;
          }
        } catch (error) {

        }
        this.verifySuccess = 0;

        break;

      default:

        break;

    }
  }

  async resetPassword() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    try {
      const data = await this.auth.setNewPassword(this.newPassword, this.oobCode);
      if (data) {
        this.verifySuccess = 1;
        this.progressBar.mode = 'determinate';
        return;
      }
    } catch (error) {

    }
    this.verifySuccess = 0;
    this.submitButton.disabled = false;
    this.progressBar.mode = 'determinate';
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

}
