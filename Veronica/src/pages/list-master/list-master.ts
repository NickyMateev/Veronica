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

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  organizations: any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, db: AngularFireDatabase, userService: UserService, organizationService: OrganizationService) {
    this.currentItems = this.items.query();
    this.organizations = organizationService.getOrganizations();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
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
    this.navCtrl.push(ItemDetailPage, {
      organization: organization
    });
  }

  searchForOrganizations() {
    this.navCtrl.push(SearchPage);

  }
}
