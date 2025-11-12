// src/components/PageTitle.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';

const PageTitle = ({ title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        accessibilityRole="header"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          numberOfLines={2}
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {subtitle}
        </Text>
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
    fontFamily: 'NotoSans',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
    fontFamily: 'NotoSans',
  },
});
