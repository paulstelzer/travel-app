import { AuthService } from '@innomobile/fireuser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './app-forgot-password.component.html',
})
export class AppForgotPasswordComponent {
  email = '';

  constructor(
    public dialogRef: MatDialogRef<AppForgotPasswordComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data && data.email) {
      this.email = data.email;
    }
  }

  async send() {
    const data = await this.auth.resetPassword(this.email);
    if (data) {
      this.dialogRef.close(true);
    }
  }
}
