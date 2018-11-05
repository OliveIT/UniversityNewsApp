/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Article Details
 * File path - '../../../../src/pages/article-details/article-details'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Category } from '../../models/category';
import { Article } from '../../models/article';
import { ArticleProvider } from '../../providers/article/article';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage {

  // Category Object
  category: Category = new Category();

  // Article Object
  article: Article = new Article();

  // List of Related Articles
  relatedArticles: any = [];

  // Limit Count For Each Time Populated Data From Firestore
  offset: any = 3;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public articleProvider: ArticleProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public afs: AngularFirestore) {
  }

  // Do Any Initialization
  ngOnInit() {
    this.getNavParamsData();
    this.getArticlesByCategoryId();

  }

  /**
   * ------------------------------------------------------
   * Get Query Params Data
   * ------------------------------------------------------
   */
  getNavParamsData() {
    if (this.navParams.get('category')) {
      this.category = this.navParams.get('category');
      this.article = this.navParams.get('article');
      this.increaseArticleViewCount();
    }
  }

  /**
   * ------------------------------------------------------
   * Increase Specific Article View Count
   * ------------------------------------------------------
   */
  increaseArticleViewCount() {
    this.articleProvider.increaseArticleViewCount(this.article);
  }

  /**
   * ------------------------------------------------------
   * Get Related Articles
   * ------------------------------------------------------
   */
  getArticlesByCategoryId() {
    const collection = this.articleProvider.getArticlesByCategoryId(this.category.$key, this.offset);
    collection
      .snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Article;
          data.$key = a.payload.doc.id;
          return data;
        });
      }).subscribe((data: any) => {
        this.relatedArticles = _.uniqBy(this.relatedArticles.concat(data), '$key');
      });
  }


  /**
   * ------------------------------------------------------
   * Open Specific Article Details Page
   * ------------------------------------------------------
   * @param article     Article Object
   */
  openArticle(article) {
    this.viewCtrl.dismiss();
    const modal = this.modalCtrl.create('ArticleDetailsPage', { article: article, category: this.category });
    modal.present();
  }
}
