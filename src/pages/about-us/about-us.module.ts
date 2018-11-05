import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutUsPage } from './about-us';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AboutUsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AboutUsPage),
  ],
})
export class AboutUsPageModule { }
