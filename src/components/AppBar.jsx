// src/components/AppBar.jsx

import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/themeContext';

const ICON_SIZE = 26;
const ICON_TOUCH = 44;

const AppBar = ({ showBack = true, title = 'Stothram', rightIcons = [] }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const onBackPress = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const iconColor = theme.colors.onSurface;
  const backgroundColor = theme.colors.surface;
  const textColor = theme.colors.onSurface;
  const ripple = theme.colors.onSurfaceVariant + '22';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderBottomColor: theme.colors.outlineVariant,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      {/* LEFT: Back icon + Title */}
      <View style={styles.leftSection}>
        {showBack ? (
          <Pressable
            onPress={onBackPress}
            android_ripple={{ color: ripple, borderless: true }}
            style={({ pressed }) => [
              styles.iconButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <MaterialDesignIcons
              name="arrow-left"
              size={ICON_SIZE}
              color={iconColor}
            />
          </Pressable>
        ) : (
          // placeholder to preserve layout
          <View style={styles.iconButton} />
        )}

        <Text
          style={[
            styles.title,
            {
              color: textColor,
              marginLeft: showBack ? 4 : 0,
              fontFamily: 'NotoSans',
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* RIGHT: Icons */}
      <View style={styles.rightSection}>
        {rightIcons.map((item, index) => (
          <Pressable
            key={item.iconName || index}
            onPress={item.onPress}
            android_ripple={{ color: ripple, borderless: true }}
            style={({ pressed }) => [
              styles.iconButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <MaterialDesignIcons
              name={item.iconName}
              size={ICON_SIZE}
              color={iconColor}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // takes available space
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: ICON_TOUCH,
    height: ICON_TOUCH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ICON_TOUCH / 2,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
});
