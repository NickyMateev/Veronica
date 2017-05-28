import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user-service/user-service';
import { OrganizationService } from '../../services/organization-service/organization-service';
import { EventService } from '../../services/event-service/event-service';

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
  user: any;
  organizationIds: any;
  events: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public organizationService: OrganizationService, public eventService: EventService) {
    this.events = [];
    this.user = userService.getUser();
    this.organizationIds = organizationService.getOrganizationIds();
    this.events = this.getEvents();
  }

  private getEvents() {
    var resultEvents = [];
    for (var i = 0; i < this.organizationIds.length; i++) {
      var result = this.eventService.getOrganizationEvents(this.organizationIds[i]);
      for (var j = 0; j < result.length; j++) {
        resultEvents.push(result[j]);
      }
    }
    return resultEvents;
  }

}
