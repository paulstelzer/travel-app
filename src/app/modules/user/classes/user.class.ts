import { UserModel } from '../store/user.model';

export class User implements UserModel {
    id: string;
    status: number;
    details: {
        firstname: string;
        lastname: string;
        language: string;
        gender: number;
        age: number;
        country: string;
        photoURL: string;
    };

    isAnonymous: boolean;

    phone: {
        number: string,
        verified: boolean
    };

    mail: {
        address: string,
        verified: boolean
    };

    provider: {
        password: boolean;
        facebook: boolean;
    };

    position: { lat: number, lng: number };
    fcmTokens?: { [token: string]: true };

    createdAt: Date;
    updatedAt: Date;

    constructor(data?) {
        data = data || {};
        this.id = data.id || '';
        this.status = data.status || 0;
        this.details = data.details || {
            firstname: '',
            lastname: '',
            language: '',
            gender: -1,
            age: -1,
            country: '',
            photoURL: ''
        };

        this.mail = data.mail || {
            verified: false,
            address: null
        };

        this.phone = data.phone || {
            verified: false,
            number: null
        };

        if (data.isAnonymous === false) {
            this.isAnonymous = false;
        } else {
            this.isAnonymous = true;
        }

        this.position = data.position || {
            lat: 52.520007,
            lng: 13.404954
        };

        this.provider = data.provider || {
            password: false,
            facebook: false
        };

        this.fcmTokens = data.fcmTokens || {};

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

    setPosition(lat: number, lng: number) {
        this.position = {
            lat: lat,
            lng: lng
        };
    }

    export() {
        const object = this;
        return Object.assign({}, object);
    }
}
