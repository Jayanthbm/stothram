// src/components/Card.jsx

import React, { useState, useMemo } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import MyText from './MyText';

export default function Card({
  title,
  subtitle,
  children,
  style,
  onPress,
  onPressIn,
  onPressOut,
  disabled = false,
  variant = 'elevated', // 'outlined' | 'elevated'
  disableRipple = false,
}) {
  const { theme } = useTheme();
  const isAndroid = Platform.OS === 'android';

  const [pressed, setPressed] = useState(false);

  const combinedStyle = useMemo(
    () => [
      styles.cardBase,
      {
        backgroundColor: theme.colors.surface,
        ...(variant === 'outlined'
          ? {
              elevation: 0,
              borderWidth: 1,
              borderColor: theme.colors.outlineVariant,
            }
          : {
              elevation: pressed ? 4 : 2,
            }),
      },
      pressed && !isAndroid ? { transform: [{ scale: 0.98 }] } : null,
      disabled && { opacity: 0.6 },
      style,
    ],
    [theme, pressed, isAndroid, disabled, variant, style],
  );

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={e => {
        setPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={e => {
        setPressed(false);
        onPressOut?.(e);
      }}
      android_ripple={
        isAndroid && !disabled && !disableRipple
          ? {
              color: theme.colors.onSurfaceVariant + '22',
              borderless: false,
              foreground: true,
            }
          : undefined
      }
      style={combinedStyle}
    >
      {title && <MyText style={styles.title}>{title}</MyText>}
      {subtitle && (
        <MyText
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {subtitle}
        </MyText>
      )}
      <View style={styles.body}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  subtitle: { fontSize: 14, fontWeight: '400', marginBottom: 8 },
  body: {
    flex: 1,
  },
});
