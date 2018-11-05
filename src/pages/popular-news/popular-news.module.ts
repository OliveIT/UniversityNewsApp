import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularNewsPage } from './popular-news';

@NgModule({
  declarations: [
    PopularNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularNewsPage),
  ],
})
export class PopularNewsPageModule {}
