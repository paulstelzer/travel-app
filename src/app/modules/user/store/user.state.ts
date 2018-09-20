import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService, FireAuthAnonymousSignUp, FireAuthUserNull, LanguageState, FireAuthUserSignOut } from '@innomobile/fireuser';
import {
    Action,
    Actions,
    NgxsOnInit,
    ofActionSuccessful,
    Selector,
    State,
    StateContext,
    Store
} from '@ngxs/store';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fsPath } from '../../../../environments/environment.prod';
import { User } from '../classes/user.class';
import { CreateUser, InitUser, SetShow, SetUser, UpdateUser, UserStatus, UserSignOut } from './user.actions';
import { UserStateModel } from './user.model';

const defaultUserState: UserStateModel = {
    cloudUserId: null,
    data: null,
    show: null
};


@State<UserStateModel>({
    name: 'user',
    defaults: defaultUserState
})
export class UserState implements NgxsOnInit {
    user$: Observable<User> = of<User>(null);
    userRef: AngularFirestoreDocument<User> = null;
    userId: string = null;
    checkUser = false;

    private usersPath = fsPath.user;
    fbUserDetails: firebase.User = null;

    @Selector()
    static getUser(state: UserStateModel) {
        if (state.data) { return new User(state.data); }
        return null;
    }

    @Selector()
    static userId(state: UserStateModel) {
        if (state.data && state.data.id) { return state.data.id; }
        return null;
    }

    constructor(
        public auth: AuthService,
        private fs: AngularFirestore,
        private store: Store,
        private actions: Actions,
        private router: Router
    ) { }

    ngxsOnInit(ctx: StateContext<UserStateModel>) {
        ctx.dispatch(new InitUser());

        this.store.select(state => state.auth.authUser).pipe(
            switchMap(user => {
                // console.log('AuthUser', user);
                this.fbUserDetails = user;

                if (user) {
                    this.checkUser = true;
                    this.userId = user.uid;
                    this.userRef = this.fs.doc<User>(`${this.usersPath}/${user.uid}`);
                    return this.userRef.valueChanges();
                } else {
                    this.userId = null;
                    this.userRef = null;
                    return of<User>(null);
                }
            })
        ).subscribe((data) => {
            /*
            if (data) {
                const myuser = new User(data).export();
                if (data && this.checkUser) {
                    this.verifyAuthUserData(data);
                }
                ctx.dispatch(new SetUser(myuser));
            } else {
                ctx.dispatch(new SetUser(null));
            }*/
        });
    }



    @Action(InitUser)
    initUser(ctx: StateContext<UserStateModel>, { overwrite }: InitUser) {
        const user = ctx.getState();
        if (!user || overwrite) {
            return ctx.setState(defaultUserState);
        }

        ctx.dispatch(new UserStatus());
        return true;
    }


    @Action(SetUser)
    setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
        return ctx.patchState({
            data: action.user
        });
    }

    @Action(SetShow)
    setShow(ctx: StateContext<UserStateModel>, action: SetShow) {
        return ctx.patchState({
            show: action.show
        });
    }

    @Action(UserSignOut)
    signOutUser(ctx: StateContext<UserStateModel>) {
        const state = ctx.getState();
        if (state.cloudUserId) {
            ctx.dispatch(new FireAuthUserSignOut());
        }
        return ctx.dispatch(new InitUser(true));
    }

    @Action(CreateUser)
    async createUser(ctx: StateContext<UserStateModel>, { data }: CreateUser) {
        const newUser = new User(data);
        ctx.dispatch(new FireAuthAnonymousSignUp());
        return ctx.patchState({
            data: newUser
        });
    }

    @Action(UpdateUser)
    async updateUser(ctx: StateContext<UserStateModel>, { data, showMessage }: UpdateUser) {
        if (!this.userRef) {
            return;
        }
        data = this.auth.itemDate(data);

        if (showMessage) {
            this.auth.showSuccess('USER_SAVING');
        }

        try {
            await this.userRef.update(data);
            if (showMessage) {
                this.auth.showSuccess('USER_SAVED');
            }
            return true;
        } catch (error) {
            console.log('error', error);
            if (showMessage) {
                this.auth.showError('user/not-saved');
            }
            return false;
        }
    }

    private verifyAuthUserData(myuser: User) {
        if (!myuser) { return; }

        const difference = this.getDifferenceDate(myuser.updatedAt, new Date());
        if (difference > 24) {
            this.store.dispatch(new UpdateUser({}));
        }

        if (myuser.details) {
            const lang = this.store.selectSnapshot(LanguageState.getLanguage);
            if (lang && lang !== myuser.details.language) {
                this.store.dispatch(new UpdateUser({
                    'details.language': lang
                }));
            }
        }

        if (this.fbUserDetails !== null) {
            this.checkUser = false;
            const mail = this.fbUserDetails.email;
            const verified = this.fbUserDetails.emailVerified;
            const anonym = this.fbUserDetails.isAnonymous;
            const provider = this.fbUserDetails.providerData;

            if (mail !== myuser.mail.address) {
                this.store.dispatch(new UpdateUser({
                    'mail.address': mail
                }));
            }

            if (verified !== myuser.mail.verified) {
                // console.log('Mail Verified ist anders')
                this.store.dispatch(new UpdateUser({
                    'mail.verified': verified
                }));
            }

            if (anonym !== myuser.isAnonymous) {
                // console.log('Anonym ist anders')
                this.store.dispatch(new UpdateUser({
                    'isAnonymous': anonym
                }));
            }

            for (const p of provider) {
                switch (p.providerId) {
                    case 'password':
                        if (myuser.provider.password === false) {
                            this.store.dispatch(new UpdateUser({
                                'provider.password': true
                            }));
                        }
                        break;
                    case 'facebook.com':
                        if (myuser.provider.facebook === false) {
                            // console.log('FB ist anders')
                            this.store.dispatch(new UpdateUser({
                                'provider.facebook': true
                            }));
                        }
                        break;
                    case 'phone':
                        if (myuser.phone.verified === false) {
                            // console.log('Phone ist anders')
                            myuser.phone.number = p.phoneNumber;
                            myuser.phone.verified = true;
                            this.store.dispatch(new UpdateUser({
                                'phone.number': p.phoneNumber,
                                'phone.verified': true
                            }));
                        }
                        break;
                }
            }
        }
    }

    private getDifferenceDate(date1, date2) {
        if (date1 instanceof Date && date2 instanceof Date) {
            const diff = Math.abs(date1.getTime() - date2.getTime());
            const diffHours = Math.ceil(diff / (1000 * 3600));
            return diffHours;
        }
        return -1;
    }


}
