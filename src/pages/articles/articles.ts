/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of article page
 * File path - '../../../../src/pages/articles/articles'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Category } from '../../models/category';
import { Article } from '../../models/article';
import { ArticleProvider } from '../../providers/article/article';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  // Category Object
  category: Category = new Category();

  // Array List of Articles
  articles: any = [];

  // Limit Count For Each Time Populated Data From Firestore
  offset: any = 10;

  // Last Item from Article List
  lastValue: any;

  // Keep record of Firestore Collection
  private _done = new BehaviorSubject(false);
  done: Observable<boolean> = this._done.asObservable();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public articleProvider: ArticleProvider,
    public modalCtrl: ModalController) {
  }

  // Do Any Initialization
  ngOnInit() {
    this.getNavParamsData();
    this.getArticles();
  }

  /**
   * ------------------------------------------------------
   * Get Query Params Data
   * ------------------------------------------------------
   */
  getNavParamsData() {
    if (this.navParams.get('category')) {
      this.category = this.navParams.get('category');
    }
  }

  /**
   * ------------------------------------------------------
   * Get List of Articles
   * ------------------------------------------------------
   * @method    getArticles
   */
  async getArticles() {
    if (this.category.$key) {

      // Call article provider to get connection in firestore
      const collection = this.articleProvider.getArticlesByCategoryId(this.category.$key, this.offset, this.lastValue);

      // Determines the doc snapshot to paginate next query
      collection.snapshotChanges().subscribe(details => {
        var docs = details[details.length - 1];
        if (docs && docs.payload && docs.payload.doc) {
          this.lastValue = docs.payload.doc;
          this._done.next(false);
        } else {
          this._done.next(true);
        }
      })

      // Load list of article collection
      collection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Article;
          data.$key = a.payload.doc.id;
          return data;
        });
      }).subscribe((data: any) => {
        this.articles = _.uniqBy(this.articles.concat(data), '$key');
      });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  /**
   * ------------------------------------------------------
   * Open Specific Article Page
   * ------------------------------------------------------
   * @param article     Selected Article Object
   */
  openArticle(article) {
    const modal = this.modalCtrl.create('ArticleDetailsPage', { article: article, category: this.category });
    modal.present();
  }

  /**
    * --------------------------------------------------------------
    * Infinite Scroll
    * --------------------------------------------------------------
    * @method doInfinite
    * 
    * The Infinite Scroll allows to perform an action when the user
    * scrolls a specified distance from the bottom,
    * and load next page news articles.
    */
  doInfinite(event) {
    setTimeout(() => {
      this.getArticles().then(() => {
        event.complete();
      });
    }, 1000);
  }
}
