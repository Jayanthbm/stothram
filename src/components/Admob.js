import React, { useEffect, useState } from 'react';
import { Alert, Button, Platform, StatusBar } from 'react-native';
import {
  BannerAdSize,
  GAMBannerAd,
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { AD_UNITS_BANNER, AD_UNITS_INTERSTITIAL } from '../constants';
import { getItem, storeItem } from '../utils/dataUtils';

const __DEV__ = true;

function generateId(type = 'banner') {
  const AD_UNITS = type === 'banner' ? AD_UNITS_BANNER : AD_UNITS_INTERSTITIAL;

  if (AD_UNITS.length === 0) {
    console.warn('No ad units available.');
    return null;
  }
  try {
    const randomIndex = Math.floor(Math.random() * AD_UNITS.length);
    return AD_UNITS[randomIndex];
  } catch (error) {
    console.error('Error generating Ad Unit ID:', error);
    return AD_UNITS[0];
  }
}

export const AdmobBanner = () => {
  // let bannerUnitId = generateId('banner');
  let bannerUnitId = __DEV__ ? TestIds.BANNER : generateId('banner');

  return (
    <React.Fragment>
      <GAMBannerAd
        unitId={bannerUnitId}
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </React.Fragment>
  );
};

export const AdmobInterstitialButton = () => {
  const [loaded, setLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Ad Unit ID
  const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : generateId('interstitial');
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
  });

  // Load the interstitial ad and set up event listeners
  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('Ad loaded successfully.');
        setLoaded(true);
      },
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        if (Platform.OS === 'ios') {
          StatusBar.setHidden(true); // Hide status bar on iOS
        }
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        if (Platform.OS === 'ios') {
          StatusBar.setHidden(false); // Restore status bar on iOS
        }
        // Reload the ad after it's closed
        interstitial.load();
        setLoaded(false); // Reset the loaded state while the ad is reloading
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, []);

  // Retry logic for showing ad
  const showAdWithRetry = () => {
    if (retryCount >= 3) {
      Alert.alert('Ad Error', 'Failed to load the ad after multiple attempts.');
      return;
    }

    if (loaded) {
      interstitial.show().catch(error => {
        console.error('Error showing interstitial:', error);
        Alert.alert('Ad Error', 'Ad could not be shown. Please try again.');
        setRetryCount(retryCount + 1);
        // Retry after a delay
        setTimeout(() => showAdWithRetry(), 2000);
      });
    } else {
      Alert.alert('Ad Not Ready', 'The ad is not ready yet. Please wait.');
      console.log('Ad is not ready yet.');
    }
  };

  return (
    <Button
      title="Show Ad"
      onPress={() => {
        if (loaded) {
          showAdWithRetry();
        } else {
          Alert.alert('Ad Not Ready', 'The ad is still loading. Please wait.');
          console.log('Ad is not ready yet.');
        }
      }}
      disabled={!loaded} // Disable the button if the ad is not loaded
    />
  );
};
