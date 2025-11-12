// src/components/ScrolltoTopIcon.jsx
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '../contexts/themeContext';

const ICON_SIZE = 32;

const ScrolltoTopIcon = ({
  visible = true,
  onPress,
  align = 'center', // 'left', 'right', or 'center'
  bottom = 20, // optional margin from bottom
}) => {
  const { theme } = useTheme();
  const { width } = Dimensions.get('window');

  // 🔹 Determine horizontal alignment
  let leftPosition = null;
  let rightPosition = null;

  switch (align) {
    case 'left':
      leftPosition = 24;
      break;
    case 'right':
      rightPosition = 24;
      break;
    default: // center
      leftPosition = (width - ICON_SIZE) / 2;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        position: 'absolute',
        bottom,
        left: leftPosition,
        right: rightPosition,
        opacity: visible ? 1 : 0,
        zIndex: 20,
      }}
      hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }} // better touch area
    >
      <MaterialDesignIcons
        name="chevron-up-circle"
        size={ICON_SIZE}
        color={theme.colors.primary}
      />
    </TouchableOpacity>
  );
};

export default ScrolltoTopIcon;
