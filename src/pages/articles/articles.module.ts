import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlesPage } from './articles';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ArticlesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ArticlesPage),
  ],
})
export class ArticlesPageModule { }
