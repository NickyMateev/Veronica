import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class UserService {
    private currentUser: any;
    private users: FirebaseListObservable<any[]>;

    constructor(db: AngularFireDatabase) {
        this.users = db.list("/Users");
    }

    setUser(user) {
        this.currentUser = user;
    }

    getUser() {
        return this.currentUser;
    }

    setCurrentUserToLatest() {
        this.users.subscribe(users => {
          this.currentUser = users[users.length - 1];
        });
    }
}
