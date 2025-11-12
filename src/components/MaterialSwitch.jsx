// src/components/MaterialSwitch.jsx

import React, { useRef, useEffect } from 'react';
import { Animated, Pressable, StyleSheet, Easing } from 'react-native';
import { useTheme } from '../contexts/themeContext';

export default function MaterialSwitch({
  value,
  onValueChange,
  disabled = false,
}) {
  const { theme } = useTheme();

  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [value]);

  const trackColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.surfaceVariant, theme.colors.primaryContainer],
  });

  const trackBorderColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.outlineVariant, theme.colors.primary],
  });

  const thumbTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      disabled={disabled}
      accessibilityLabel="Toggle setting"
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        styles.pressable,
        { opacity: disabled ? 0.4 : pressed ? 0.8 : 1 },
      ]}
    >
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: trackColor,
            borderColor: trackBorderColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbTranslate }],
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.shadow,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 52,
    height: 32,
    justifyContent: 'center',
  },
  track: {
    width: 48,
    height: 28,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1.5,
  },
});
