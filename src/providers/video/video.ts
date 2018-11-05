/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of video,
 * File path - '../../../src/providers/video/video'
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Video } from '../../models/video';

@Injectable()
export class VideoProvider {

  // Collection of video
  videoCollection: AngularFirestoreCollection<any>;

  // Video document object
  videoArticles: Observable<Video[]>;

  constructor(public http: HttpClient,
    private afs: AngularFirestore) { }

  /**
   * --------------------------------------------------------------
   *  Get Video Article By Category
   * --------------------------------------------------------------
   * @method    getArticleByCategory
   */
  getVideoArticlesByCategoryId(categoryId, offset?) {
    this.videoCollection = this.afs.collection('video', ref => {
      return ref
        .orderBy('timestamp', 'desc')
        .limit(offset)
        .where('category', '==', categoryId)
    });

    return this.videoCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Video;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }

  /**
   * --------------------------------------------------------------
   *  Get Video Article
   * --------------------------------------------------------------
   * @method    getArticleByCategory
   */
  getVideoArticles(offset, lastVisible?) {
    if (lastVisible) {
      return this.videoCollection = this.afs.collection('video', ref => {
        return ref
          .orderBy('timestamp', 'desc')
          .startAfter(lastVisible)
          .limit(offset)
      });
    } else {
      return this.videoCollection = this.afs.collection('video', ref => {
        return ref
          .orderBy('timestamp', 'desc')
          .limit(offset)
      });
    }
  }
}
