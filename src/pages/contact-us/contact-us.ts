/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of contact us page
 * File path - '../../../../src/pages/contact-us/contact-us'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../models/contact';
import { ContactUsProvider } from '../../providers/contact-us/contact-us';


@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {


  contactInfo: Contact = new Contact();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public contactusProvider: ContactUsProvider) {
  }

  ngOnInit() {
    // Get Contact Us Information From Firestore Database
    this.contactusProvider.getContactInfo().valueChanges().subscribe((data: any) => {
      if (data) {
        this.contactInfo = data;
      }
    })
  }

}