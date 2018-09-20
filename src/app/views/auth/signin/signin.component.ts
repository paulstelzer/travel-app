import { innomobileAnimations } from './../../../shared/animations/innomobile-animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AuthService } from '@innomobile/fireuser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: innomobileAnimations
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild('submitButton') submitButton: MatButton;

  signinForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router, 
    private appConfirmService: AppConfirmService
    ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });
  }

  async signin() {
    const signinData = this.signinForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    try {
      const data = await this.auth.emailLogin(signinData.email, signinData.password);
      if (data) {
        this.router.navigate(['dashboard']);
        this.progressBar.mode = 'determinate';
        return;
      }
    } catch (error) {

    }
    this.submitButton.disabled = false;
    this.progressBar.mode = 'determinate';
  }

  forgotPassword() {
    this.appConfirmService.forgotPassword();
  }

}
