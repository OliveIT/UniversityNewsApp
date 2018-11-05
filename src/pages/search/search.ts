/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * File path - '../../../src/pages/search/search'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, App } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
import { ArticleProvider } from '../../providers/article/article';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  // List of Articles
  articles: any;

  // List of New Articles
  newArticleList: any;

  // List of Categories
  categories: any = [];

  // Input Search Field
  searchInput: string;

  // Keep Track of Last page
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();


  constructor(
    public navCtrl: NavController,
    public categoryProvider: CategoryProvider,
    public articleProvider: ArticleProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public app: App) {
  }

  /** Do any initialization */
  ngOnInit() {

    // Call `getCategories` method to get category list
    this.getCategories();

    // Search Latest Value Continuously
    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((result) => {
        this.articles = result;
      })
    })
  }

  /**
   * --------------------------------------------------------
   * Search Any Articles
   * --------------------------------------------------------
   */
  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.articles = this.articles;
    }
  }

  /**
   * --------------------------------------------------------
   * Get Search Data
   * --------------------------------------------------------
   */
  firequery(start, end) {
    return this.articleProvider.searchResult(start, end);
  }

  /**
   * ------------------------------------------------------
   * Get List of Categories
   * ------------------------------------------------------
   */
  getCategories() {
    this.categoryProvider.getCategoriesList().subscribe(data => {
      this.categories = data;
    })
  }

  /**
   * ------------------------------------------------------
   * Get Category Details by Key
   * ------------------------------------------------------
   */
  async getCategoryByKey(category) {
    return this.categoryProvider.getCategoryByKey(category).then((data) => {
      return data;
    });
  }

  /**
   * --------------------------------------------------------------
   * Open Article Details Page
   * --------------------------------------------------------------
   */
  gotoArticleDetailsPage(article) {
    this.dismiss();
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
   * Open Article Page
   * --------------------------------------------------------------
   */
  gotoArticlePage(category) {
    this.dismiss();
    this.app.getRootNav().push('ArticlesPage', { category: category });
  }

  /**
   * Dismiss Modal
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}

