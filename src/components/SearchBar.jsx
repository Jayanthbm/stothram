// src/components/SearchBar.jsx

import React, { useState, useRef } from 'react';
import {
  Animated,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';

import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '../contexts/themeContext';

const SearchBar = ({
  placeholder = 'Search',
  value,
  onChangeText,
  onClear,
  style,
  disabled = false,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const elevation = useRef(new Animated.Value(0)).current;

  const animateFocus = toValue => {
    Animated.timing(elevation, {
      toValue,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    animateFocus(4);
  };

  const handleBlur = () => {
    setIsFocused(false);
    animateFocus(0);
  };

  const backgroundColor = isFocused
    ? theme.colors.surface
    : theme.colors.searchContainer;
  const textColor = theme.colors.onSurfaceVariant;
  const ripple = theme.colors.onSurfaceVariant + '22';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          elevation: elevation,
          shadowColor: Platform.OS === 'ios' ? theme.colors.shadow : undefined,
          shadowOpacity: Platform.OS === 'ios' && isFocused ? 0.2 : 0,
          shadowOffset:
            Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
          shadowRadius: Platform.OS === 'ios' && isFocused ? 3 : 0,
          borderWidth: isFocused ? 0 : 1,
          borderColor: isFocused ? 'transparent' : theme.colors.outlineVariant,
        },
        style,
      ]}
    >
      <MaterialDesignIcons
        name="text-box-search-outline"
        size={20}
        color={theme.colors.onSurfaceVariant}
        style={{ marginRight: 8 }}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.onSurfaceVariant + '99'}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled}
        accessibilityLabel="Search field"
        accessibilityHint="Type to search"
        style={[styles.input, { color: textColor }]}
        {...props}
      />
      {value?.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          accessibilityLabel="Clear search"
          android_ripple={{ color: ripple, borderless: true }}
        >
          <MaterialDesignIcons
            name="close-circle"
            size={18}
            color={theme.colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    fontFamily: 'NotoSans',
  },
});

export default SearchBar;
