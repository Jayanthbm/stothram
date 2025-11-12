// src/components/NoDataCard.jsx

import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '../contexts/themeContext';

const NoDataCard = ({
  title = 'No data available',
  icon = 'text-search',
  actionLabel = 'Clear',
  onActionPress,
  actionColor,
}) => {
  const { theme } = useTheme();

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={title}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outlineVariant,
          shadowColor: theme.colors.shadow,
          elevation: theme.isDark ? 0 : 1,
        },
      ]}
    >
      <MaterialDesignIcons
        name={icon}
        size={48}
        color={theme.colors.onSurfaceVariant}
        style={{ marginBottom: 8 }}
      />
      <Text
        numberOfLines={2}
        style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
      >
        {title}
      </Text>

      {onActionPress && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onActionPress}
          android_ripple={{
            color: theme.colors.primary + '22',
            borderless: true,
          }}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? theme.colors.surfaceVariant
                : 'transparent',
            },
          ]}
        >
          <Text
            style={[
              styles.actionLabel,
              { color: actionColor || theme.colors.primary },
            ]}
          >
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 60,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'NotoSans',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'NotoSans',
  },
});

export default NoDataCard;
