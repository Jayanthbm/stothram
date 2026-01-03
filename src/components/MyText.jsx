// src/components/MyText.js
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../contexts/themeContext';

// Detect ANY non-English / non-numeric character
const containsNonEnglish = text => {
  if (!text) return false;
  return /[^A-Za-z0-9 .,!?'"@#$%^&*()_+\-=;:/\\|<>[\]{}~`]/.test(text);
};

const MyText = ({
  style,
  numberOfLines = 1,
  ellipsizeMode = 'tail',
  fontFamily = 'NotoSerif',
  children,
}) => {
  const { theme } = useTheme();

  // Safely extract text from any children
  const textValue = Array.isArray(children)
    ? children.join('')
    : children?.toString?.() || '';

  const shouldApplyFont = containsNonEnglish(textValue);

  // Normalize styles
  const styleArray = Array.isArray(style) ? style : [style];
  const cleanedStyles = styleArray;

  const userPassedFontFamily = cleanedStyles.some(
    s => s && s.fontFamily !== undefined,
  );

  const userPassedColor = cleanedStyles.some(s => s && s.color !== undefined);

  const userPassedMarginBottom = cleanedStyles.some(
    s => s && s.marginBottom !== undefined,
  );

  const computedStyle = [
    ...cleanedStyles,
    !userPassedColor ? { color: theme.colors.onSurface } : null,
    shouldApplyFont && !userPassedFontFamily ? { fontFamily } : null,
    !userPassedMarginBottom ? { marginBottom: shouldApplyFont ? 4 : 0 } : null,
  ];

  const textProps =
    ellipsizeMode === 'none' ? {} : { numberOfLines, ellipsizeMode };

  const properStyles = {};
  computedStyle.forEach(s => {
    if (s) {
      Object.assign(properStyles, s);
    }
  });

  if (properStyles.fontFamily === 'NudiParijathaBold') {
    properStyles.fontWeight =
      properStyles.fontWeight < 600 ? properStyles.fontWeight : 600;
  }
  return (
    <Text style={properStyles} {...textProps}>
      {children}
    </Text>
  );
};

export default MyText;
