// src/components/ReaderMeaning.jsx
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './MyText';

/**
 * ReaderMeaning
 * Renders meanings for a paragraph if populated.
 */
const ReaderMeaning = memo(({ meanings, language }) => {
  if (!meanings) return null;

  const currentMeaningData = meanings[language] || meanings.en || meanings.kn;
  const lines = currentMeaningData?.text || [];

  if (!Array.isArray(lines) || lines.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {lines.map((line, index) => (
        <MyText key={index} style={styles.meaningText}>
          {line}
        </MyText>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#cccccc',
  },
  meaningText: {
    fontStyle: 'italic',
    opacity: 0.8,
  },
});

export default ReaderMeaning;
