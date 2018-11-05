/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of video page
 * File path - '../../../../src/pages/videos/videos'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
import { Video } from '../../models/video';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  // List of Video Articles
  videos: any = [];

  // Limit Count For Each Time Populated Data From Firestore
  offset: any = 10;

  // Last Item from Video Article List
  lastValue: any;

  // Keep record of Firestore Collection
  private _done = new BehaviorSubject(false);
  done: Observable<boolean> = this._done.asObservable();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public videoProvider: VideoProvider,
    public modalCtrl: ModalController) {
  }

  // Do Any Initialization
  ngOnInit() {
    this.getVideos();
  }

  /**
   * --------------------------------------------------------------
   *  Get List of Video Article
   * --------------------------------------------------------------
   * @method    getVideos
   */
  async getVideos() {

    // Call video provider to get connection in firestore
    const collection = this.videoProvider.getVideoArticles(this.offset, this.lastValue);

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

    // Load list of video article collection
    collection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Video;
        data.$key = a.payload.doc.id;
        return data;
      });
    }).subscribe((data: any) => {
      this.videos = _.uniqBy(this.videos.concat(data), '$key');
    });
  }

  /**
   * --------------------------------------------------------------
   *  Open Specific Video Details Page
   * --------------------------------------------------------------
   * @method    openVideo
   */
  openVideo(video) {
    const modal = this.modalCtrl.create('VideoDetailsPage', { video: video });
    modal.present();
  }

  /**
    * --------------------------------------------------------------
    * Infinite Scroll
    * --------------------------------------------------------------
    * @method doInfinite
    * 
    * The Infinite Scroll allows to perform an action when user
    * scrolls a specified distance from the bottom,
    * and load next page news articles.
    */
  doInfinite(event) {
    setTimeout(() => {
      this.getVideos().then(() => {
        event.complete();
      });
    }, 1000);
  }
}
