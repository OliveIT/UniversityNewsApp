/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of ContactUs,
 * File path - '../../../src/providers/contact-us/contact-us'
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ContactUsProvider {

  constructor(public http: HttpClient,
    private afs: AngularFirestore) { }

  /**
   * --------------------------------------------------------
   * Get Contact Information
   * --------------------------------------------------------
   */
  getContactInfo() {
    return this.afs.collection('contactus').doc('contactus');
  }
}
