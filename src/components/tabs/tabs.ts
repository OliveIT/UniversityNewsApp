/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Tab
 * File path - '../../../../src/components/tabs/tabs'
 * 
 * We used Swipeable Tabs for Ionic 3 from -https://github.com/zyra/ionic2-super-tabs
 */

import { Component } from '@angular/core';
import { SuperTabsController } from 'ionic2-super-tabs';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {
  constructor(private superTabsCtrl: SuperTabsController) { }

}
