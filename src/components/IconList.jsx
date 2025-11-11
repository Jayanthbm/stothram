// src/components/IconList.jsx

import React from 'react';
import { View, Text, Platform, Pressable } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '../contexts/themeContext';

const IconList = ({
  leftIcon,
  keyName = '',
  title,
  subtitle = '',
  onPress,
  rightContent,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const isAndroid = Platform.OS === 'android';
  return (
    <>
      <Pressable
        key={`${theme.mode}-${keyName}`}
        style={({ pressed }) => [
          {
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: 16,
            marginVertical: 4,
            backgroundColor: theme.colors.surface,
            opacity: pressed && !isAndroid ? 0.9 : 1,
            transform: [{ scale: pressed && !isAndroid ? 0.98 : 1 }],
          },
        ]}
        onPress={onPress}
        android_ripple={
          isAndroid && !disabled
            ? {
                color: theme.colors.onSurfaceVariant + '22',
                borderless: false,
                foreground: true,
              }
            : undefined
        }
      >
        <MaterialDesignIcons
          name={leftIcon}
          size={22}
          color={theme.colors.primary}
          style={{
            marginRight: 14,
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: theme.colors.onSurface,
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: theme.colors.onSurface,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {rightContent}
      </Pressable>
    </>
  );
};

export default IconList;
