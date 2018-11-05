/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of category,
 * File path - '../../../src/providers/category/category'
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoryProvider {

  // Collection of Category
  categoryCollection: AngularFirestoreCollection<Category>;

  // Observable array list of category
  categories: Observable<Category[]>;

  constructor(public http: HttpClient,
    private afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection('category');
  }

  /**
   * --------------------------------------------------------------
   *  Return an observable list of Categories
   * --------------------------------------------------------------
   * @method    getCategoriesList
   */
  getCategoriesList() {
    this.categories = this.categoryCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Category;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
    return this.categories;
  }

  /**
   * --------------------------------------------------------------
   *  Get Category By Key
   * --------------------------------------------------------------
   * @method    getCategoryByKey
   */
  getCategoryByKey(key) {
    return this.categoryCollection.doc(key).ref.get().then((doc) => {
      return doc.data();
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
}
