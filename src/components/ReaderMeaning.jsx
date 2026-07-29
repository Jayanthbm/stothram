// src/components/ReaderMeaning.jsx
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './MyText';
import { useTheme } from '../contexts/themeContext';

/**
 * ReaderMeaning
 * Renders line-by-line or block-level meanings with distinct styling.
 */
const ReaderMeaning = memo(({ line, lines, font }) => {
  const { theme } = useTheme();
  const fontSize = font ? Math.max(11, parseInt(font) - 4) : 13;


  if (line) {
    return (
      <View style={styles.lineMeaningContainer}>
        <MyText
          numberOfLines={0}
          ellipsizeMode="none"
          style={[
            styles.meaningText,
            {
              fontSize,
              color: theme.colors.primary || '#333333',
              lineHeight: fontSize + 6,
            },
          ]}
        >
          {line}
        </MyText>
      </View>
    );
  }

  if (Array.isArray(lines) && lines.length > 0) {
    return (
      <View style={styles.blockMeaningContainer}>
        {lines.map((itemLine, index) => (
          <MyText
            key={index}
            numberOfLines={0}
            ellipsizeMode="none"
            style={[
              styles.meaningText,
              {
                fontSize,
                color: theme.colors.primary || '#333333',
                lineHeight: fontSize + 6,
              },
            ]}
          >
            {itemLine}
          </MyText>
        ))}
      </View>
    );
  }

  return null;
});

const styles = StyleSheet.create({
  lineMeaningContainer: {
    marginTop: 2,
    marginBottom: 6,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#4b6b94',
  },
  blockMeaningContainer: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#cccccc',
  },
  meaningText: {
    fontStyle: 'italic',
    opacity: 0.85,
    lineHeight: 20,
  },
});

export default ReaderMeaning;
