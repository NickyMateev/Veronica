import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';
import { SearchPage } from '../search/search';

import { Items } from '../../providers/providers';

import { Item } from '../../models/item';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../../services/user-service/user-service';
import { OrganizationService } from '../../services/organization-service/organization-service';

import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  organizations: any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, db: AngularFireDatabase, userService: UserService, organizationService: OrganizationService, public vibration: Vibration) {
    this.currentItems = this.items.query();
    this.organizations = organizationService.getOrganizations();
    //this.organizations = db.list("/Organizations");
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  createOrganization() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openOrgDesc(organization) {
    this.vibration.vibrate(5000);
    this.navCtrl.push(ItemDetailPage, {
      organization: organization
    });
  }

  searchForOrganizations() {
    this.navCtrl.push(SearchPage);

  }
}
