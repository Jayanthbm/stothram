// src/components/MaterialSlider.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../contexts/themeContext';

const MaterialSlider = ({
  value = 24,
  onValueChange,
  min = 16,
  max = 36,
  step = 1,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.outlineVariant}
        thumbTintColor={theme.colors.primary}
      />
    </View>
  );
};

export default MaterialSlider;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 0,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
});
