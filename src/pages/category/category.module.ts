import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CategoryPage),
  ],
})
export class CategoryPageModule { }
