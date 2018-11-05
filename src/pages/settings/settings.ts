/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * File path - '../../../src/pages/settings/settings'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sharingVar: SocialSharing,
    private utilsProvider: UtilsProvider) {
  }

  rateus() {
    window.open('https://play.google.com/store/apps/details?id=com.ionicbucket.newsapp&hl=en');
  }

  share() {
    this.sharingVar.share("Greeting From IonicBucket", "Greeting From IonicBucket", "http://ionicbucket.com/")
      .then((data) => {
        this.utilsProvider.presentToast('Success', 3000, 'top');
      })
      .catch((err) => {
        this.utilsProvider.presentToast('Failed to Share', 3000, 'top');
      });
  }

  gotoPrivacyPolicy() {
    window.open('http://ionicbucket.com/policy');
  }
}

