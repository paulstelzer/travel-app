import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

import { AppConfirmComponent } from './app-confirm.component';
import { AppForgotPasswordComponent } from './app-forgot-password.component';

interface ConfirmData {
  title?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfirmService {

  strings = [
    'LOGIN.FORGOT_PASSWORD.TITLE'
  ];
  translatedStrings = [];

  constructor(private dialog: MatDialog, private translate: TranslateService) {
    this.translate.get(this.strings).subscribe((data) => {
      this.translatedStrings = data;
    });
  }

  public confirm(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.message = data.message || 'Are you sure?';
    let dialogRef: MatDialogRef<AppConfirmComponent>;
    dialogRef = this.dialog.open(AppConfirmComponent, {
      width: '380px',
      disableClose: true,
      data: { title: data.title, message: data.message }
    });
    return dialogRef.afterClosed();
  }

  public forgotPassword(data: ConfirmData = {}): Observable<boolean> {

    data.title = this.translatedStrings['LOGIN.FORGOT_PASSWORD.TITLE'];
    let dialogRef: MatDialogRef<AppForgotPasswordComponent>;
    dialogRef = this.dialog.open(AppForgotPasswordComponent, {
      width: '380px',
      disableClose: true,
      data: { title: data.title, message: data.message }
    });
    return dialogRef.afterClosed();
  }
}
