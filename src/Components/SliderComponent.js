/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import Slider from '@react-native-community/slider';
import {ThemeContext} from '../providers/ThemeProvider';
const SliderComponent = () => {
  const {font, updateFont, headerBackground} = useContext(ThemeContext);
  return (
    <Slider
      value={font}
      onValueChange={(value) => updateFont(value)}
      minimumValue={15}
      maximumValue={40}
      step={3}
      style={{
        height: 40,
      }}
      thumbTintColor={headerBackground}
      minimumTrackTintColor={headerBackground}
      tapToSeek={true}
    />
  );
};

export default React.memo(SliderComponent);
