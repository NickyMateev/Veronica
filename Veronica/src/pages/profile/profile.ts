import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../services/user-service/user-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
    this.user = userService.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
