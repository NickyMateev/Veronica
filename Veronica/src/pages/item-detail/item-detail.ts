import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import { Items } from '../../providers/providers';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  organization: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.organization = navParams.get('organization');
  }

}
