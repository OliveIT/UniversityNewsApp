import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SuperTabsModule, SuperTabsController } from 'ionic2-super-tabs';
import { AdMobFree } from '@ionic-native/admob-free';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdmobProvider } from '../providers/admob/admob';
import { firebaseConfig } from '../assets/config/firebase';
import { CategoryProvider } from '../providers/category/category';
import { ArticleProvider } from '../providers/article/article';
import { VideoProvider } from '../providers/video/video';
import { AboutUsProvider } from '../providers/about-us/about-us';
import { ContactUsProvider } from '../providers/contact-us/contact-us';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UtilsProvider } from '../providers/utils/utils';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SuperTabsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    IonicModule.forRoot(MyApp, {
      menuType: 'overlay'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SocialSharing,
    SuperTabsController,
    AdMobFree,
    AdmobProvider,
    CategoryProvider,
    ArticleProvider,
    VideoProvider,
    AboutUsProvider,
    ContactUsProvider,
    UtilsProvider
  ]
})
export class AppModule { }
