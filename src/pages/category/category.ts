/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of category page
 * File path - '../../../../src/pages/category/category'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
import { Category } from '../../models/category';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  /**
   * List of Categories
   */
  categories: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public categoryProvider: CategoryProvider) { }

  ngOnInit() {
    // Get All Categories
    this.categoryProvider.getCategoriesList().subscribe(data => {
      this.categories = data;
    })
  }

  /**
   * --------------------------------------------------------------
   * Open Article Page
   * --------------------------------------------------------------
   */
  gotoArticlePage(category: Category) {
    this.navCtrl.setRoot('ArticlesPage', { category: category });
  }
}
