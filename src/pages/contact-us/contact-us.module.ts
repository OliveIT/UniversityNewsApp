import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ContactUsPage),
  ],
})
export class ContactUsPageModule { }
