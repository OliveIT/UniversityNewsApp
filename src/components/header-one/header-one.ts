/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Header Navbar
 * File path - '../../../../src/components/header-one/header-one'
 */

import { Component, Input } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'header-one',
  templateUrl: 'header-one.html'
})
export class HeaderOneComponent {

  @Input('title') title: string; // Page Title

  constructor(public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
  }

  openPage(component) {
    const modal = this.modalCtrl.create(component);
    modal.present();
  }
}

