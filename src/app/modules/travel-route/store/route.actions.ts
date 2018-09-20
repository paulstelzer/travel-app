import { TravelRoutesModel } from './route.model';
import { TravelRoutes } from '../class/travel-route.class';

// Actions
export class InitRoute {
    static type = '[Route] Init';
}

export class SetRoutes {
    static type = '[Route] Set';
    constructor(public routes: TravelRoutesModel[]) { }
}

export class AddRoute {
    static type = '[Route] Add Route';
    constructor(public route: TravelRoutes) { }
}

export class UpdateRoute {
    static type = '[Route] Update Route';
    constructor(public id: string, public data: any) { }
}
