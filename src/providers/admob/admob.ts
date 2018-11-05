/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of Admob Free.
 * Native plugin - https://ionicframework.com/docs/native/admob-free/
 * File path - '../../../src/providers/admob-free/admob-free'
 */

import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { AdmobConfig } from '../../assets/config/admob';

@Injectable()
export class AdmobProvider {

  private admobId;
  public bannerPrepared: boolean = false;
  public interstitialPrepared: boolean = false;
  public videoPrepared: boolean = false;
  public bannerConfig: AdMobFreeBannerConfig;
  public interstitialConfig: AdMobFreeInterstitialConfig;
  public videoRewardsConfig: AdMobFreeRewardVideoConfig;
  public bannerSizeOpts: any;
  public bannerAtTop: boolean = false;
  public bannerOverlap: boolean = true;
  public adAutoShow: boolean = true;
  public bannerSizes = [
    {
      android: {
        BANNER: 'BANNER',
        IAB_BANNER: 'IAB_BANNER',
        IAB_LEADERBOARD: 'IAB_LEADERBOARD',
        IAB_MRECT: 'IAB_MRECT',
        LARGE_BANNER: 'LARGE_BANNER',
        SMART_BANNER: 'SMART_BANNER',
        FLUID: 'FLUID',
        FULL_BANNER: 'FULL_BANNER',
        LEADERBOARD: 'LEADERBOARD',
        MEDIUM_RECTANGLE: 'MEDIUM_RECTANGLE',
        SEARCH: 'SEARCH',
        WIDE_SKYSCRAPER: 'WIDE_SKYSCRAPER'
      }
    },
    {
      ios: {
        BANNER: 'BANNER',
        IAB_BANNER: 'IAB_BANNER',
        IAB_LEADERBOARD: 'IAB_LEADERBOARD',
        IAB_MRECT: 'IAB_MRECT',
        LARGE_BANNER: 'LARGE_BANNER',
        SMART_BANNER: 'SMART_BANNER',
        FLUID: 'FLUID'
      }
    }
  ];


  constructor(private platform: Platform,
    private admobFree: AdMobFree) {

    this.platform.ready().then(() => {
      // For Android
      if (platform.is('android')) {
        this.admobId = {
          banner: AdmobConfig.androidBanner,
          interstitial: AdmobConfig.androidInterstitial,
          video: AdmobConfig.androidVideo
        };
        this.bannerSizeOpts = this.bannerSizes[0]['android'];
      }

      // For iOS
      if (platform.is('ios')) {
        this.admobId = {
          banner: AdmobConfig.iosBanner,
          interstitial: AdmobConfig.iosInterstitial,
          video: AdmobConfig.iosVideo
        };
        this.bannerSizeOpts = this.bannerSizes[1]['ios'];
      }
      this.init();
    });
  }

  /**
   * AdMob initialising
   */
  init() {
    // Not found any Admob
    if (!this.admobFree) {
      console.log("No AdMob?");
      return;
    }

    // Initialise other default config options for banner
    this.bannerConfig = {
      isTesting: false,
      autoShow: this.adAutoShow
    }
    this.admobFree.banner.config(this.bannerConfig);

    // Initialise other default config options for interstitial
    this.interstitialConfig = {
      isTesting: false,
      autoShow: this.adAutoShow
    }

    this.admobFree.interstitial.config(this.interstitialConfig);

    // Initialise other default config options for Video
    this.videoRewardsConfig = {
      isTesting: false,
      autoShow: this.adAutoShow
    }
    this.admobFree.rewardVideo.config(this.videoRewardsConfig);
  }

  /**
   * Prepare Banner
   */
  prepareBanner(): Promise<any> {
    this.bannerConfig.id = this.admobId.banner;
    this.admobFree.banner.config(this.bannerConfig);
    return this.admobFree.banner.prepare()
      .then(() => {
        this.bannerPrepared = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Remove Banner
   */
  removeBanner() {
    this.admobFree.banner.remove()
      .then(() => {
        this.bannerPrepared = false;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Prepare Interstitial
   */
  prepareInterstitial(): Promise<any> {
    this.interstitialConfig.id = this.admobId.interstitial;
    this.admobFree.interstitial.config(this.interstitialConfig);
    return this.admobFree.interstitial.prepare()
      .then(() => {
        this.interstitialPrepared = true;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  /**
   * Prepare Video
   */
  prepareAdmobVideo(): Promise<any> {
    this.videoRewardsConfig.id = this.admobId.video;
    this.admobFree.rewardVideo.config(this.videoRewardsConfig);
    return this.admobFree.rewardVideo.prepare()
      .then(() => {
        this.videoPrepared = true;
      })
      .catch((err) => {
        console.error(err);
      })
  }
}
