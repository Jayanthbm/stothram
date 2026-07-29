// src/components/ReaderSubheading.jsx
import React, { memo } from 'react';
import Card from './Card';
import MyText from './MyText';
import { useTheme } from '../contexts/themeContext';

/**
 * ReaderSubheading
 * Renders centered subheadings with appropriate font styles.
 */
const ReaderSubheading = memo(({ title, fontFamily, font }) => {
  const { theme } = useTheme();

  return (
    <Card
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        padding: 2,
        marginVertical: 4,
      }}
      disableRipple={true}
    >
      <MyText
        style={{
          ...(fontFamily && { fontFamily }),
          fontSize: parseInt(font) + 2,
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        {title}
      </MyText>
    </Card>
  );
});

export default ReaderSubheading;
