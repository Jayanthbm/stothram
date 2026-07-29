// src/components/ReaderTransliteration.jsx
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './MyText';

/**
 * ReaderTransliteration
 * Renders transliterated text for a paragraph when active.
 */
const ReaderTransliteration = memo(
  ({ transliterations, language, fontFamily, font, lineGap }) => {
    if (!transliterations) return null;

    const target = transliterations[language];
    const lines = target?.text || [];

    if (!Array.isArray(lines) || lines.length === 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        {lines.map((line, index) => (
          <MyText
            key={index}
            style={{
              ...(fontFamily && { fontFamily }),
              fontSize: font,
              lineHeight: parseInt(font) + lineGap,
            }}
          >
            {line}
          </MyText>
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
  },
});

export default ReaderTransliteration;
