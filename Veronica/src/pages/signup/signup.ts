import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../../services/user-service/user-service';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  users: FirebaseListObservable<any[]>;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    db: AngularFireDatabase,
    public userService: UserService) {
    this.users = db.list("/Users");
    /* DISABLING ERROR MESSAGING
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
    */
  }

  doSignup() {
    // Attempt to login in through our User service
    var email = this.account.email;
    var pass = this.account.password;
    var userAlreadyExists = false;

    this.users.subscribe(users => {
      for(var i = 0; i < users.length; i++) {
        if(users[i].email === email) {
          userAlreadyExists = true;
          break;
        }
      }

      if(!userAlreadyExists) {
        this.users.push({email: email, password: pass});
        this.userService.setCurrentUserToLatest();

        let toast = this.toastCtrl.create({
          message: "Successfully created user!",
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.push(MainPage);
      } else {
        let toast = this.toastCtrl.create({
          message: "Email is already in use! Try with a diffent address.",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    })

    /*
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage); // TODO: Remove this when you add your signup endpoint

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    */


  }
}
