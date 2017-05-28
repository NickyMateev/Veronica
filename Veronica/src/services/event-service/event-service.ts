import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../user-service/user-service';

@Injectable()
export class EventService {
    events: FirebaseListObservable<any[]>;
    eventsArray: any;

    constructor(db: AngularFireDatabase, userService: UserService) {
        this.events = db.list("/Events");
        this.events.subscribe(events => this.eventsArray = events);
    }

    getEvents() {
        return this.eventsArray;
    }

    getOrganizationEvents(orgId) {
        var result = [];
        for(var i = 0; i < this.eventsArray.length; i++) {
            if(this.eventsArray[i].idOrganization == orgId) {
                result.push(this.eventsArray[i]);
            }
        }
        return result;
    }

    getOrganizationsEvents(organizationIds) {
        var result = [];
        for(var i = 0; i < organizationIds.length; i++) {
           result.push(this.getOrganizationEvents(organizationIds[i]));
           console.log("iteration #" + i + ": " + result);
        }
        return result;
    }
}