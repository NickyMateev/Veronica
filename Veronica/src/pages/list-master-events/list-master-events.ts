import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user-service/user-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { OrganizationService } from '../../services/organization-service/organization-service';
import { EventService } from '../../services/event-service/event-service';
import { ChannelPage } from "../channel/channel";

/**
 * Generated class for the ListMasterEventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list-master-events',
  templateUrl: 'list-master-events.html',
})
export class ListMasterEventsPage {
  organizationIds: any;
  events: FirebaseListObservable<any[]>;
  eventsArr: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public organizationService: OrganizationService, public eventService: EventService, public db: AngularFireDatabase) {
      this.eventsArr = [];
      this.organizationIds = organizationService.getOrganizationIds();
      this.events = db.list("/Events");
      this.events.subscribe(events => {
            for(var i = 0; i < events.length; i++) {
                if(this.isEventRelevant(events[i])) {
                   this.eventsArr.push(events[i]);
                }
            }
      });
  }

  isEventRelevant(event) {
     for(var i = 0; i < this.organizationIds.length; i++) {
         if(this.organizationIds[i] == event.idOrganization) {
             return true;
         }
     }
     return false;
  }

  goToChannel(event) {
      //this.navParams.data = event;
      this.navCtrl.push(ChannelPage, {
          event: event
      });
  }
}
