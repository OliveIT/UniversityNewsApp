import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleDetailsPage } from './article-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ArticleDetailsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ArticleDetailsPage),
  ],
})
export class ArticleDetailsPageModule { }
