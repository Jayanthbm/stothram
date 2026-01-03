// src/components/AppBar.jsx

import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/themeContext';
import MyText from './MyText';

const ICON_SIZE = 26;
const ICON_TOUCH = 44;
const RIGHT_WIDTH = ICON_TOUCH * 2;

const AppBar = ({ showBack = true, title = 'Stothram', rightIcons = [] }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const onBackPress = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const iconColor = theme.colors.onSurface;
  const backgroundColor = theme.colors.surface;
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
      {/* LEFT SECTION */}
      <View style={[styles.sideSection]}>
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
          // Placeholder to keep layout consistent
          <View style={styles.iconButton} />
        )}
      </View>

      {/* TITLE */}
      <View style={styles.titleContainer}>
        <MyText
          style={[
            styles.title,
            {
              marginLeft: showBack ? 4 : 0,
            },
          ]}
          ellipsizeMode="middle"
        >
          {title}
        </MyText>
      </View>

      {/* RIGHT SECTION (fixed width) */}
      <View style={[styles.rightSection, { width: RIGHT_WIDTH }]}>
        {/* LEFT placeholders to push icons to the right */}
        {Array(2 - rightIcons.length)
          .fill(0)
          .map((_, i) => (
            <View key={`ph-left-${i}`} style={styles.iconButton} />
          ))}

        {/* Actual icons */}
        {rightIcons.slice(0, 2).map((item, index) => (
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

  sideSection: {
    width: ICON_TOUCH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  iconButton: {
    width: ICON_TOUCH,
    height: ICON_TOUCH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ICON_TOUCH / 2,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },

  titleContainer: {
    flex: 1,
    paddingHorizontal: 8,
    flexShrink: 1, // allows text to truncate
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.15,
  },
});
