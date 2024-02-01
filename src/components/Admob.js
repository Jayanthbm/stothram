import React from 'react';
import { Platform } from 'react-native';
import {
  GAMBannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
let AD_UNITS = [
  'ca-app-pub-0714649342045057/8222174259',
  'ca-app-pub-0714649342045057/5615643477',
  'ca-app-pub-0714649342045057/1676398465',
  'ca-app-pub-0714649342045057/6338246941',
  'ca-app-pub-0714649342045057~1333332271',
  'ca-app-pub-0714649342045057~1333332271'
];
function generateId() {
  try {
    let rN = Math.floor(Math.random() * AD_UNITS.length);
    return AD_UNITS[rN];
  } catch (error) {
    return AD_UNITS[0];
  }
}
const Admob = () => {
  let unitId = generateId();
  return <></>
  // return (
  //   <React.Fragment>
  //     {Platform.OS === 'android' ? (
  //       <GAMBannerAd
  //         unitId={unitId}
  //         sizes={[BannerAdSize.FULL_BANNER]}
  //         requestOptions={{
  //           requestNonPersonalizedAdsOnly: true,
  //         }}
  //       />
  //     ) : null}
  //   </React.Fragment>
  // );
};

export default Admob;
