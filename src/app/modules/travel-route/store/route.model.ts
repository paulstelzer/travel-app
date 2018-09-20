import { Address } from '../../maps/classes/address.class';

export interface TravelRouteStateModel {
    routes: TravelRoutesModel[];
    status: TravelRouteStatus;
}

export interface TravelRouteStatus {
    routeCreated: boolean;
    routeData: boolean;

}

export interface TravelRoutesModel {
    id?: string;
    userId: string;
    language: string;
    countries: Country[];
    startCountry: Address;
    country: Address;
    suggestion: string;
    title: string;
    description: string;
    picture: { path: string };

    createdAt: Date;
    updatedAt: Date;
}

export interface TravelRouteOverview {
    _id: string;
    description: string;
    locations: TravelRouteLocation[];
    picture: { path: string };
    title: string;
}

export interface TravelRouteLocation {
    _id: string;
    activities: TravelRouteActivity[];
    coordinate: any;
    country: { _id: string };
    description: string;
    picture: { path: string };
    title: string;
    video: string;
}

export interface TravelRouteActivity {
    _id: string;
    booking_url: string;
    coordinate: any;
    description: string;
    picture: { path: string };
    title: string;
    video: string;
}

export interface Country {
    _id: string;
    description: string;
    information: CountryInformation[];
    picture: {
        path: string;
    };
    title: string;
    video: string;
}

export interface CountryInformation {
    _id: string;
    category: string;
    description: string;
    picture: {
        path: string;
    };
    title: string;
    todo: InformationTodo[];
    url: string;
}

export interface InformationTodo {
    value: string;
}
