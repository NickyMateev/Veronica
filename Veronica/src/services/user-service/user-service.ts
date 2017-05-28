import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    private currentUser: any;

    constructor() {}

    setUser(user) {
        this.currentUser = user;
    }

    getUser() {
        return this.currentUser;
    }
}
