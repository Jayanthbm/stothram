// src/components/PageTitle.jsx

import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/themeContext';

const PageTitle = ({ title }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        marginTop: 8,
        color: theme.colors.onSurfaceVariant,
        fontWeight: '600',
        fontSize: 18,
      }}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {title}
    </Text>
  );
};

export default React.memo(PageTitle);
