/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of video details page
 * File path - '../../../../src/pages/video-details/video-details'
 */

import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ModalController, ViewController, Events } from 'ionic-angular';
import { Category } from '../../models/category';
import { Video } from '../../models/video';
import { VideoProvider } from '../../providers/video/video';
import { CategoryProvider } from '../../providers/category/category';

@IonicPage()
@Component({
  selector: 'page-video-details',
  templateUrl: 'video-details.html',
})
export class VideoDetailsPage {

  // Category Object
  category: Category = new Category();

  // Video Object
  videoDetails: Video = new Video();

  // List of video
  videos: any = [];

  // Limit Count For Each Time Populated Data From Firestore
  offset: any = 3;

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public videoProvider: VideoProvider,
    public categoryProvider: CategoryProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public events: Events) {

    //To avoid the play store rejection

    /**
     * Pause Video in Background
     */
    this.events.subscribe('App:Paused', () => {
      this.pauseVideo();
    });

    /**
     * Resume Video
     */
    this.events.subscribe('App:Resume', () => {
      this.playVideo();
    });

  }

  // Do Any Initialization
  ngOnInit() {
    this.getNavParamsData();
  }

  /***
   * ------------------------------------------------------
   * Lifecycle Event -  Fired when you leave a page
   * ------------------------------------------------------
   */
  ionViewWillLeave() {
    this.stopVideo(); // Stop any playing video
  }

  /**
   * ------------------------------------------------------
   * Get Query Params Data
   * ------------------------------------------------------
   */
  getNavParamsData() {
    if (this.navParams.get('video')) {
      this.videoDetails = this.navParams.get('video');

      this.getVideos();
      this.getCategoryByKey(this.videoDetails.category);
    }
  }

  /**
   * --------------------------------------------------------------
   *  Get Specific Category By Key
   * --------------------------------------------------------------
   * @method    getCategoryByKey
   */
  getCategoryByKey(key) {
    this.categoryProvider.getCategoryByKey(key).then((data: any) => {
      this.category = data;
    });
  }

  /**
   * ------------------------------------------------------
   * Get All Related Videos
   * ------------------------------------------------------
   */
  getVideos() {
    this.videoProvider.getVideoArticlesByCategoryId(this.videoDetails.category, this.offset).subscribe((data) => {
      this.videos = data.filter(video => video.$key !== this.videoDetails.$key);
    });
  }

  /**
   * ------------------------------------------------------
   * Play Video
   * ------------------------------------------------------
   */
  playVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
  }

  /**
   * ------------------------------------------------------
   * Pause Video
   * ------------------------------------------------------
   */
  pauseVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }

  /**
   * ------------------------------------------------------
   * Stop Video
   * ------------------------------------------------------
   */
  stopVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
  }

  /**
   * ------------------------------------------------------
   * Generate Youtube Video Link
   * ------------------------------------------------------
   * @param url 
   */
  videoLink(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return 'https://www.youtube.com/embed/' + match[2] + '?enablejsapi=1';
    } else {
      console.log('error');
    }
  }

  /**
   * ------------------------------------------------------
   * Open Specific Video Article Page
   * ------------------------------------------------------
   * @param video     Video Object
   */
  openVideoDetails(video) {
    this.viewCtrl.dismiss();
    const modal = this.modalCtrl.create('VideoDetailsPage', { video: video });
    modal.present();
  }
}
