import { NgModule, ModuleWithProviders } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './store/user.state';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    AngularFireModule,
    AngularFirestoreModule,
    TranslateModule,
    NgxsModule.forFeature([
      UserState
    ])
  ],
  declarations: []
})
export class UserModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
      ]
    };
  }
}
