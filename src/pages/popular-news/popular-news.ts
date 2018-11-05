/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of popular news page
 * File path - '../../../../src/pages/popular-news/popular-news'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Category } from '../../models/category';
import { Article } from '../../models/article';
import { ArticleProvider } from '../../providers/article/article';
import { CategoryProvider } from '../../providers/category/category';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-popular-news',
  templateUrl: 'popular-news.html',
})
export class PopularNewsPage {

  // Category Object
  category: Category = new Category();

  // List of Articles
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
    public modalCtrl: ModalController,
    public articleProvider: ArticleProvider,
    public categoryProvider: CategoryProvider) {
  }

  // Do Any Initialization
  ngOnInit() {
    this.getArticles();
  }

  /**
   * ------------------------------------------------------
   * Get All Articles
   * ------------------------------------------------------
   */
  async getArticles() {

    // Call article provider to get connection in firestore
    const collection = this.articleProvider.getPopularArticles(this.offset, this.lastValue);

    // Determines the doc snapshot to paginate next query
    collection.snapshotChanges().subscribe(details => {
      var docs = details[details.length - 1];
      if (docs && docs.payload && docs.payload.doc) {
        this.lastValue = docs.payload.doc;
        this._done.next(false);
      } else {
        this._done.next(true);
      }
    });

    // Load list of article collection
    collection
      .snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Article;
          data.$key = a.payload.doc.id;
          return data;
        });
      }).subscribe((data: any) => {
        this.articles = _.uniqBy(this.articles.concat(data), '$key');
      });
  }

  async getCategoryByKey(category) {
    return this.categoryProvider.getCategoryByKey(category).then((data) => {
      return data;
    });
  }

  /**
   * ------------------------------------------------------
   * Open Specific Article Page
   * ------------------------------------------------------
   * @param article    Article Object
   */
  openArticle(article: Article) {
    this.getCategoryByKey(article.category).then((categoryDetails) => {
      categoryDetails = Object.assign(categoryDetails, { $key: article.category });
      if (categoryDetails) {
        const modal = this.modalCtrl.create('ArticleDetailsPage', { article: article, category: categoryDetails });
        modal.present();
      }
    });
  }

  /**
    * --------------------------------------------------------------
    * Infinite Scroll
    * --------------------------------------------------------------
    * @method doInfinite
    * 
    * The Infinite Scroll allows to perform an action when user
    * scrolls a specified distance from the bottom,
    * and load next news articles.
    */
  doInfinite(event) {
    setTimeout(() => {
      this.getArticles().then(() => {
        event.complete();
      });
    }, 1000);
  }
}
