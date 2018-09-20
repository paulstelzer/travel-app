export interface UserStateModel {
    cloudUserId: string;
    data: UserModel;
    show: any;
}

export interface UserModel {
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
}
