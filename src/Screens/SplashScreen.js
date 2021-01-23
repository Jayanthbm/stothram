/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import {ThemeContext} from '../providers/ThemeProvider';
import LottieView from 'lottie-react-native';
const SplashScreen = ({navigation}) => {
  const {darkmode, backgroundColor} = useContext(ThemeContext);
  let image = darkmode
    ? require('../Assets/splash-dark.json')
    : require('../Assets/splash-light.json');
  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <LottieView
        source={image}
        autoPlay={true}
        loop={false}
        onAnimationFinish={() => {
          navigation.navigate('HomeScreen');
        }}
      />
    </View>
  );
};

export default SplashScreen;
