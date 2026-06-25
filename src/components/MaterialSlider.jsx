// src/components/MaterialSlider.jsx
import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../contexts/themeContext';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const MaterialSlider = ({
  value = 24,
  onValueChange,
  min = 16,
  max = 36,
  step = 1,
}) => {
  const { theme } = useTheme();

  const rippleColor =
    theme.colors.primaryContainer || theme.colors.primary + '33';

  const decrease = () => {
    if (value > min) onValueChange(value - step);
  };

  const increase = () => {
    if (value < max) onValueChange(value + step);
  };

  return (
    <View style={styles.container}>
      {/* Minus Button */}
      <Pressable
        onPress={decrease}
        disabled={value <= min}
        android_ripple={
          Platform.OS === 'android'
            ? { color: rippleColor, borderless: false }
            : undefined
        }
        style={({ pressed }) => [
          styles.iconButton,
          {
            opacity: value <= min ? 0.3 : pressed ? 0.7 : 1,
          },
        ]}
      >
        <MaterialDesignIcons
          name="minus"
          size={24}
          color={theme.colors.primary}
        />
      </Pressable>

      {/* Slider */}
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

      {/* Plus Button */}
      <Pressable
        onPress={increase}
        disabled={value >= max}
        android_ripple={
          Platform.OS === 'android'
            ? { color: rippleColor, borderless: false }
            : undefined
        }
        style={({ pressed }) => [
          styles.iconButton,
          {
            opacity: value >= max ? 0.3 : pressed ? 0.7 : 1,
          },
        ]}
      >
        <MaterialDesignIcons
          name="plus"
          size={24}
          color={theme.colors.primary}
        />
      </Pressable>
    </View>
  );
};

export default MaterialSlider;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  slider: {
    flex: 1,
    height: 40,
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // ✅ REQUIRED for ripple clipping
  },
});
