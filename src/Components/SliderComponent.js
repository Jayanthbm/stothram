/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import Slider from '@react-native-community/slider';
import {ThemeContext} from '../providers/ThemeProvider';
const SliderComponent = () => {
  const {font, updateFont, darkmode} = useContext(ThemeContext);

  const sliderColor = darkmode ? '#ab8b2c' : '#6200EE';

  return (
    <Slider
      value={font}
      onValueChange={value => updateFont(value)}
      minimumValue={15}
      maximumValue={40}
      step={3}
      style={{
        height: 40,
      }}
      thumbTintColor={sliderColor}
      minimumTrackTintColor={sliderColor}
      tapToSeek={true}
    />
  );
};

export default React.memo(SliderComponent);
