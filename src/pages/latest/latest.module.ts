import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LatestPage } from './latest';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LatestPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LatestPage),
  ],
})
export class LatestPageModule { }
