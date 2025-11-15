// src/components/MyText.js
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../contexts/themeContext';

// Detect ANY non-English / non-numeric character
const containsNonEnglish = text => {
  if (!text) return false;
  return /[^A-Za-z0-9 .,!?'"@#$%^&*()_+\-=;:/\\|<>[\]{}~`]/.test(text);
};

// Remove NotoSans safely
const removeNotoSans = s => {
  if (s && s.fontFamily === 'NotoSans') {
    const { fontFamily, ...rest } = s;
    return rest;
  }
  return s;
};

// Extract fontFamily from a style object
const getFontFromStyle = s => (s && s.fontFamily ? s.fontFamily : undefined);

const MyText = ({
  style,
  numberOfLines = 1,
  ellipsizeMode = 'tail',
  fontFamily = 'NotoSerif',
  children,
}) => {
  const { theme } = useTheme();
  const textValue = typeof children === 'string' ? children : '';

  const shouldApplyFont = containsNonEnglish(textValue);

  // Normalize styles array
  const styleArray = Array.isArray(style) ? style : [style];

  // Clean NotoSans from all user styles
  const cleanedStyles = styleArray.map(removeNotoSans);

  // Detect if the user supplied ANY fontFamily in any style
  const userPassedFontFamily = cleanedStyles.some(
    s => s && s.fontFamily !== undefined,
  );

  // Detect if user passed a color
  const userPassedColor = cleanedStyles.some(s => s && s.color !== undefined);

  const computedStyle = [
    ...cleanedStyles,
    !userPassedColor ? { color: theme.colors.onSurface } : null,
    shouldApplyFont && !userPassedFontFamily ? { fontFamily } : null,
  ];

  return (
    <Text
      style={computedStyle}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};

export default MyText;
