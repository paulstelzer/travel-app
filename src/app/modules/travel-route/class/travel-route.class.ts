import { Address } from '../../maps/classes/address.class';
import { TravelRoutesModel, Country, TravelRouteOverview } from '../store/route.model';

export class TravelRoutes implements TravelRoutesModel {
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

    constructor(data?) {
        data = data || {};
        if (data.id) {
            this.id = data.id;
        }

        this.userId = data.userId || '';
        this.language = data.language || '';

        this.countries = data.countries || null;
        this.country = data.country || null;
        this.startCountry = data.startCountry || null;

        this.suggestion = data.suggestion || '';
        this.title = data.title || '';
        this.description = data.description || '';
        this.picture = data.picture || null;

        this.createdAt = this.getDate(data.createdAt);
        this.updatedAt = this.getDate(data.updatedAt);
    }

    getDate(input) {
        if (input) {
            if (input instanceof Date) {
                return input;
            } else if (input.toDate instanceof Function) {
                return input.toDate();
            } else {
                return new Date(input);
            }
        }

        return new Date();
    }

    export() {
        const object = this;
        return Object.assign({}, object);
    }
}
