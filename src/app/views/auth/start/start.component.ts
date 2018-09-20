import { CreateUser } from './../../../modules/user/store/user.actions';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatCheckbox } from '@angular/material';
import { AuthState } from '@innomobile/fireuser';
import { innomobileAnimations } from '../../../shared/animations/innomobile-animations';
import { ToastService } from '@innomobile/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  animations: innomobileAnimations
})
export class StartComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild('submitButton') submitButton: MatButton;
  @ViewChild('acceptCheckbox') acceptCheckbox: MatCheckbox;

  constructor(
    private router: Router,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private toast: ToastService
  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data && (data.auto || data.auto === '')) {
        this.signIn(true);
      }
    });
  }

  ngOnInit() {

    this.actions.pipe(ofActionSuccessful(CreateUser)).subscribe(() => {
      this.progressBar.mode = 'determinate';
      this.router.navigate(['/new']);
    });

  }

  async signIn(forward = false) {
    if (!forward) {
      const checked = this.acceptCheckbox.checked;
      if (!checked) {
        this.toast.sendToastTranslation('error', 'START.CHECKBOX.ERROR');
        return;
      }
    }

    const user = this.store.selectSnapshot(AuthState.getUser);
    if (user) {
      this.router.navigate(['dashboard']);
      return true;
    }
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    try {
      this.store.dispatch(new CreateUser());
    } catch (error) {
      this.submitButton.disabled = false;
      this.progressBar.mode = 'determinate';
    }



  }

}
