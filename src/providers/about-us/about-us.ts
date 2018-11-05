/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of AboutUs,
 * File path - '../../../src/providers/about-us/about-us'
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AboutUsProvider {

  constructor(public http: HttpClient,
    private afs: AngularFirestore) { }

  /**
   * --------------------------------------------------------
   * Get AboutUs Information
   * --------------------------------------------------------
   */
  getAboutUs() {
    return this.afs.collection('aboutus').doc('aboutus');
  }
}
