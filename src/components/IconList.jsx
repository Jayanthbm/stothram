// src/components/IconList.jsx

import React from 'react';
import { View, Platform, Pressable, StyleSheet } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '../contexts/themeContext';
import MyText from './MyText';

const H_PADDING = 12;
const V_PADDING = 14;
const BORDER_RADIUS = 16;

const IconList = ({
  leftIcon,
  keyName = '',
  title,
  subtitle = '',
  onPress,
  rightContent,
  disabled = false,
  textStyle = {},
}) => {
  const { theme } = useTheme();
  const isAndroid = Platform.OS === 'android';
  const ripple = theme.colors.onSurfaceVariant + '22';
  return (
    <>
      <Pressable
        key={`${theme.mode}-${keyName}`}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={subtitle || 'Tap to open'}
        disabled={disabled}
        style={({ pressed }) => [
          styles.container,
          {
            backgroundColor: pressed
              ? theme.colors.surfaceVariant
              : theme.colors.surface,
            opacity: disabled ? 0.5 : pressed && !isAndroid ? 0.9 : 1,
            transform: [{ scale: pressed && !isAndroid ? 0.98 : 1 }],
          },
        ]}
        onPress={onPress}
        android_ripple={
          isAndroid && !disabled
            ? {
                color: ripple,
                borderless: false,
                foreground: true,
              }
            : undefined
        }
      >
        {leftIcon && (
          <MaterialDesignIcons
            name={leftIcon}
            size={22}
            color={theme.colors.primary}
            style={styles.leftIcon}
          />
        )}

        <View style={styles.textContainer}>
          <MyText style={[styles.title, { ...textStyle }]}>{title}</MyText>
          {subtitle ? (
            <MyText
              style={[
                styles.subtitle,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
            >
              {subtitle}
            </MyText>
          ) : null}
        </View>
        {rightContent}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    paddingVertical: V_PADDING,
    paddingHorizontal: H_PADDING,
    marginVertical: 4,
    overflow: 'hidden',
  },
  leftIcon: {
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
    marginBottom: 2,
  },
});
export default IconList;
