// src/components/Chip.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import MyText from './MyText';

const Chip = ({ label }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: theme.colors.primaryContainer,
        },
      ]}
    >
      <MyText
        style={[
          styles.text,
          {
            color: theme.colors.onPrimaryContainer,
          },
        ]}
      >
        {label}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Chip;
