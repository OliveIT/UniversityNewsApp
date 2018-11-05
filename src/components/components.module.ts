import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { SuperTabsModule } from 'ionic2-super-tabs';
import { HeaderOneComponent } from './header-one/header-one';
import { TabsComponent } from './tabs/tabs';
import { HeaderTwoComponent } from './header-two/header-two';

@NgModule({
  declarations: [HeaderOneComponent,
    TabsComponent,
    HeaderTwoComponent],
  imports: [IonicModule, SuperTabsModule],
  exports: [HeaderOneComponent,
    TabsComponent,
    HeaderTwoComponent]
})
export class ComponentsModule { }


