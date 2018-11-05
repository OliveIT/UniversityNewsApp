import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoDetailsPage } from './video-details';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    VideoDetailsPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(VideoDetailsPage),
  ],
})
export class VideoDetailsPageModule { }
