import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../user-service/user-service';

@Injectable()
export class EventService {
    private userOrganization: FirebaseListObservable<any[]>;
    private organizations: FirebaseListObservable<any[]>;
    private events: FirebaseListObservable<any[]>;
    private currUser;

    constructor(db: AngularFireDatabase, userService: UserService) {
        this.userOrganization = db.list("/UserOrganization");
        this.organizations = db.list("/Organizations");
        this.events = db.list("/Events");
        this.currUser = userService.getUser();
    }

    getOrganizationEvents(organizationId) {
       var events = [];
       this.events.subscribe(events => {
           for(var i = 0; i < events.length; i++) {
               if(events[i].idOrganization === organizationId) {
                   events.push(events[i]);
               }
           }
       });

       return events;
    }
}