import { UserModel } from './user.model';

// Actions
export class InitUser {
    static type = '[User] Init';
    constructor(public overwrite: boolean = false) { }
}

export class SetUser {
    static type = '[User] Set';
    constructor(public user: UserModel, public external: boolean = false) { }
}

export class CreateUser {
    static type = '[User] Create';
    constructor(public data: any = null) { }
}

export class UpdateUser {
    static type = '[User] Update';
    constructor(public data: any, public external: boolean = true, public showMessage: boolean = false) { }
}

export class UserStatus {
    static type = '[User] Set Status';
    constructor() { }
}

export class UserRate {
    static type = '[User] Update Rate';
    constructor(public rated: boolean) { }
}

export class SetCloudUserId {
    static type = '[User] Set Cloud User Id';
    constructor(public userId: string) { }
}

export class UserDelete {
    static type = '[User] Delete';
    constructor() { }
}

export class UserSignOut {
    static type = '[User] Sign out';
    constructor() { }
}

/* EVENTS */
export class UserEmpty {
    static type = '[User] Empty';
    constructor() { }
}

export class SetShow {
    static type = '[User] Set Show';
    constructor(public show: any) { }
}
