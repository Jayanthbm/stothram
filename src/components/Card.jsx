// src/components/Card.jsx

import { Platform, Pressable, StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../contexts/themeContext';

export default function Card({
  title,
  subtitle,
  children,
  style,
  onPress,
  onPressIn,
  onPressOut,
  disabled = false,
}) {
  const { theme } = useTheme();
  const isAndroid = Platform.OS === 'android';

  const [pressed, setPressed] = useState(false);

  const combinedStyle = [
    styles.cardBase,
    { backgroundColor: theme.colors.surface },
    pressed && !isAndroid ? { transform: [{ scale: 0.98 }] } : null,
    style,
  ];

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
        isAndroid && !disabled
          ? {
              color: theme.colors.onSurfaceVariant + '22',
              borderless: false,
              foreground: true,
            }
          : undefined
      }
      style={combinedStyle}
    >
      {title && (
        <Text
          style={[styles.title, { color: theme.colors.onSurface }]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
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
