
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Action, Selector, State, StateContext, NgxsOnInit, Actions, ofActionSuccessful, Store } from '@ngxs/store';

import { TravelRouteStateModel, TravelRoutesModel } from './route.model';
import { InitRoute, SetRoutes, AddRoute, UpdateRoute } from './route.actions';
import { FireAuthUserNull, LanguageState } from '@innomobile/fireuser';
import { TravelRoutes } from '../class/travel-route.class';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastService } from '@innomobile/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { fsPath } from '../../../../environments/environment.prod';


@State<TravelRouteStateModel>({
    name: 'route',
    defaults: {
        routes: null,
        status: {
            routeCreated: false,
            routeData: false
        }
    }
})
export class TravelRouteState implements NgxsOnInit {
    routeRef: AngularFirestoreCollection<any[]>;
    userRoutes$: Observable<TravelRoutesModel[]>;
    userId = '';

    @Selector()
    static getRoutes(state: TravelRouteStateModel): TravelRoutes[] {
        if (state.routes && state.routes.length > 0) {
            const myRoutes: TravelRoutes[] = [];
            state.routes.forEach(route => {
                const r = new TravelRoutes(route);
                myRoutes.push(r);
            });
            return myRoutes;
        }
        return null;
    }

    @Selector()
    static getRoute(state: TravelRouteStateModel) {
        if (state.routes && state.routes.length > 0) {
            return (id) => {
                const check = state.routes.filter(route => route.id === id);
                console.log('Check', check);
                if (check.length > 0) {
                    return new TravelRoutes(check[0]);
                }
            };
        }
        return null;
    }

    @Selector()
    static getStatus(state: TravelRouteStateModel) {
        return state.status;
    }

    constructor(
        private actions: Actions,
        private fs: AngularFirestore,
        private store: Store,
        private toast: ToastService
    ) { }

    ngxsOnInit(ctx: StateContext<TravelRouteStateModel>) {
        ctx.dispatch(new InitRoute());

        this.store.select(state => state.auth.authUser).pipe(
            switchMap((u) => {
                if (u && u.uid) {
                    this.routeRef = this.fs.collection(fsPath.user).doc(u.uid).collection<TravelRoutesModel[]>(fsPath.route);
                    this.userId = u.uid;
                    return this.routeRef.snapshotChanges().pipe(
                        map(actions => {
                            return actions.map(a => {
                                const data = a.payload.doc.data();
                                const id = a.payload.doc.id;
                                return new TravelRoutes({ id, ...data });
                            });
                        })
                    );
                } else {
                    this.routeRef = null;
                    return of<TravelRoutesModel[]>(null);
                }
            })
        ).subscribe((data: any) => {
           // console.log('Route Service Data', data);
            this.store.dispatch(new SetRoutes(data));
        });

        this.actions.pipe(ofActionSuccessful​(FireAuthUserNull)).subscribe((data) => {
            console.log('Action @RouteStore :) User Null');
            ctx.setState({
                routes: [],
                status: {
                    routeCreated: false,
                    routeData: false
                }
            });
        });
    }

    @Action(InitRoute)
    initRoute(ctx: StateContext<TravelRouteStateModel>) {
        const route = ctx.getState();
        if (!route) {
            return ctx.setState({
                routes: [],
                status: {
                    routeCreated: false,
                    routeData: false
                }
            });
        } else {
            let created = false;
            if (route.routes && route.routes.length > 0) {
                created = true;
            }

            return ctx.patchState({
                status: {
                    ...route.status,
                    routeCreated: created
                }
            });
        }
    }

    @Action(SetRoutes)
    setRoutes(ctx: StateContext<TravelRouteStateModel>, { routes }: SetRoutes) {
        const routeData = this.checkForDataRoutes(routes);

        return ctx.patchState({
            routes: routes,
            status: {
                routeCreated: (routes && routes.length > 0) ? true : false,
                routeData: routeData
            }
        });
    }

    @Action(AddRoute)
    async addRoute(ctx: StateContext<TravelRouteStateModel>, { route }: AddRoute) {
        if (!this.routeRef) { return false; }
        try {
            const lang = this.store.selectSnapshot(LanguageState.getLanguage);
            route.language = lang ? lang : 'en';
            route.userId = this.userId;
            const doc = this.itemDate(route.export());
            await this.routeRef.add(doc);

            this.toast.sendToastTranslation('success', 'TOAST.ROUTE_SEND.SUCCESS');
            return true;
        } catch (err) {
            this.toast.sendToastTranslation('error', 'TOAST.ROUTE_SEND.ERROR');
            return false;
        }
    }

    @Action(UpdateRoute)
    async updateRoute(ctx: StateContext<TravelRouteStateModel>, { id, data }: UpdateRoute) {
        if (!this.routeRef) { return false; }
        try {
            const doc = this.itemDate(data);
            return await this.routeRef.doc(id).update(doc);
        } catch (err) {
            return false;
        }
    }

    get timestamp(): firebase.firestore.FieldValue {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    private itemDate(object: any, newItem: boolean = false): any {
        const date = this.timestamp;
        let newObject = {
            ...object,
            updatedAt: date
        };
        if (newItem) {
            newObject = {
                ...newObject,
                createdAt: date
            };
        }
        return newObject;
    }


    private checkForDataRoutes(data) {
        if (data && data.length > 0) {
            for (const d of data) {
                if (d.route && d.route.length > 0) {
                    return true;
                }
            }
        }

        return false;
    }
}
