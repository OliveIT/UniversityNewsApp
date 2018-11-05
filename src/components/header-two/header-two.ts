/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Header Navbar
 * File path - '../../../../src/components/header-two/header-two'
 */

import { Component, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'header-two',
  templateUrl: 'header-two.html'
})
export class HeaderTwoComponent {

  @Input('title') title: string; // Page Title

  constructor(public viewCtrl: ViewController) { }

  /**
   * Dismiss function
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}

