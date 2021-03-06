import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../../services/user-service/user-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  users: FirebaseListObservable<any[]>;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@gmail.com',
    password: '123'
  };

  // Our translated text strings
  //private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    db: AngularFireDatabase,
    private userService: UserService) {

    this.users = db.list("/Users");

    /* DISABLING ERROR MESSAGING
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    */
  }

  // Attempt to login in through our User service
  doLogin() {
    var email = this.account.email;
    var pass = this.account.password;
    var areCredentialsCorrect = false;

    this.users.subscribe(users => {
      for(var i = 0; i < users.length; i++) {
          if(users[i].email === email && users[i].password === pass) {
            areCredentialsCorrect = true;
            this.userService.setUser(users[i]);
            this.navCtrl.push(MainPage);
          }
      }
    });

    if(!areCredentialsCorrect) {
      /*
      let toast = this.toastCtrl.create({
        message: "Invalid credentials! Try again.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      */
    }
    /*
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    */
  }
}
