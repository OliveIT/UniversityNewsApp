import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Article } from '../../models/article';

@Injectable()
export class ArticleProvider {

  // Collection of Article
  articleCollection: AngularFirestoreCollection<any>;

  // Article Document Object
  articleDoc: AngularFirestoreDocument<Article>;

  // Article Observable List
  articles: Observable<Article[]>;


  constructor(public http: HttpClient,
    private afs: AngularFirestore) { }

  /**
   * --------------------------------------------------------------
   *  Get Article By Key
   * --------------------------------------------------------------
   * @method    getArticlesByCategoryId
   */
  getArticlesByCategoryId(categoryId, offset, lastVisible?) {
    if (lastVisible) {
      return this.articleCollection = this.afs.collection('article', ref => {
        return ref
          .orderBy('timestamp', 'desc')
          .limit(offset)
          .startAfter(lastVisible)
          .where('category', '==', categoryId)
      });
    } else {
      return this.articleCollection = this.afs.collection('article', ref => {
        return ref
          .orderBy('timestamp', 'desc')
          .limit(offset)
          .where('category', '==', categoryId)
      });
    }
  }

  /**
   * --------------------------------------------------------------
   *  Collection of Articles
   * --------------------------------------------------------------
   * @method    getArticles
   */
  getArticles(offset, lastValue?) {
    if (lastValue) {
      return this.articleCollection = this.afs.collection('article', ref => {
        return ref
          .orderBy('timestamp', 'desc')
          .startAfter(lastValue)
          .limit(offset)
      });
    } else {
      return this.articleCollection = this.afs.collection('article', ref => {
        return ref
          .orderBy('timestamp', 'desc')
          .limit(offset)
      });
    }
  }

  /**
   * --------------------------------------------------------------
   *  Article Search Result
   * --------------------------------------------------------------
   * @method    searchResult
   */
  searchResult(start, end) {
    this.articleCollection = this.afs.collection('article', ref => {
      return ref
        .orderBy('lowerCaseTitle')
        .startAt(start.toLowerCase()).endAt(end.toLowerCase())
    });

    return this.articleCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Article;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }

  /**
   * --------------------------------------------------------------
   *  Increase Specific Article View Count
   * --------------------------------------------------------------
   * @method    increaseArticleViewCount
   */
  increaseArticleViewCount(article: Article) {
    this.articleCollection.ref.doc(article.$key).update({ count: article.count + 1 });
  }

  /**
   * --------------------------------------------------------------
   *  Collection of Popular Articles
   * --------------------------------------------------------------
   * @method    getPopularArticles
   */
  getPopularArticles(offset, lastValue?) {
    if (lastValue) {
      return this.articleCollection = this.afs.collection('article', ref => {
        return ref
          .orderBy('count', 'desc')
          .startAfter(lastValue)
          .limit(offset)
      });
    } else {
      return this.articleCollection = this.afs.collection('article', ref => {
        return ref
          .orderBy('count', 'desc')
          .limit(offset)
      });
    }
  }
}
