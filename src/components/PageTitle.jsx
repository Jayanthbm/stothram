// src/components/PageTitle.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import MyText from './MyText';

const PageTitle = ({ title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <MyText
        accessibilityRole="header"
        ellipsizeMode="tail"
        style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
      >
        {title}
      </MyText>

      {subtitle ? (
        <MyText
          numberOfLines={2}
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {subtitle}
        </MyText>
      ) : null}
    </View>
  );
};

export default React.memo(PageTitle);

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
  },
});
