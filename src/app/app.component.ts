import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdmobProvider } from '../providers/admob/admob';
import { CategoryProvider } from '../providers/category/category';
import { Category } from '../models/category';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  /**
   * Default Rootpage
   */
  rootPage: any = 'HomePage';

  /**
   * List of Categories
   */
  categories: any;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private categoryProvider: CategoryProvider,
    public modalCtrl: ModalController,
    public admobProvider: AdmobProvider,
    public events: Events) {
    this.initializeApp();
    this.getCategories(); // Load List of Categories
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('ios') || this.platform.is('android')) {
        // Show Video Ad After 1 Minutes
        setInterval(() => {
          this.prepareAdmobVideo();
        }, 120000);

        // Show Interstitial Ad After 30 Sec
        setInterval(() => {
          this.prepareInterstitial();
        }, 60000);
      }
    });

    /**
     * The Platform Pause Event
     */
    this.platform
      .pause
      .subscribe(() => {
        console.log('App Paused');
        this.events.publish('App:Paused');
      });

    /**
     * The Platform Resume Event
     */
    this.platform
      .resume
      .subscribe(() => {
        console.log('App Resume');
        this.events.publish('App:Resume');
      });
  }

  /**
   * --------------------------------------------------------------
   * Get All Categories
   * --------------------------------------------------------------
   */
  getCategories() {
    this.categories = this.categoryProvider.getCategoriesList();
  }


  openPage(component) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (component === 'SearchPage') {
      let modal = this.modalCtrl.create(component);
      modal.present();
    } else {
      this.nav.setRoot(component);
    }
  }

  /**
   * --------------------------------------------------------------
   * Open Article Page
   * --------------------------------------------------------------
   */
  gotoArticlePage(category: Category) {
    this.nav.setRoot('ArticlesPage', { category: category });
  }

  /**
   * Prepare and show admob Video ad
   */
  prepareAdmobVideo() {
    this.admobProvider.prepareAdmobVideo();
  }

  /**
   * Prepare and show admob Interstitial Ad
   */
  prepareInterstitial() {
    this.admobProvider.prepareInterstitial();
  }
}

