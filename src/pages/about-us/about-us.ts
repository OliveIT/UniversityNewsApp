/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of About Us
 * File path - '../../../../src/pages/about-us/about-us'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Aboutus } from '../../models/aboutus';
import { AboutUsProvider } from '../../providers/about-us/about-us';


@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  aboutus: Aboutus = new Aboutus();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public aboutusProvider: AboutUsProvider) {
  }

  ngOnInit() {
    // Get About Us Information
    this.aboutusProvider.getAboutUs().valueChanges().subscribe((data: any) => {
      if (data) {
        this.aboutus = data;
      }
    })
  }
}
