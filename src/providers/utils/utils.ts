
/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a provider of Shared.
 * File path - '../../../src/providers/utils/utils'
 */

import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {

  constructor(
    private toastCtrl: ToastController) { }

  /**
   * --------------------------------------------------------------
   * Present Toast
   * --------------------------------------------------------------
   */
  presentToast(message, duration, position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
