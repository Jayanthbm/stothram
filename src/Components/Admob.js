import React from 'react';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
let adUnits = [
  'ca-app-pub-0714649342045057/8222174259',
  'ca-app-pub-0714649342045057/5615643477',
  'ca-app-pub-0714649342045057/1676398465',
  'ca-app-pub-0714649342045057/6338246941',
  'ca-app-pub-0714649342045057~1333332271',
];
function GenerateId() {
  try {
    let rN = Math.floor(Math.random() * adUnits.length);
    return adUnits[rN];
  } catch (error) {
    return adUnits[0];
  }
}
const Admob = () => {
  let unitId = GenerateId();
  return (
    <React.Fragment>
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </React.Fragment>
  );
};

export default Admob;
