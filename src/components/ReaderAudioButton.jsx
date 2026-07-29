// src/components/ReaderAudioButton.jsx
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import MyText from './MyText';
import { useTheme } from '../contexts/themeContext';

/**
 * ReaderAudioButton
 * Reusable audio control placeholder for Stothram Reader screen.
 * Resolves paragraph vs. global audio URLs and timestamps.
 */
const ReaderAudioButton = memo(({ audioUrl, start, end, onPress }) => {
  const { theme } = useTheme();

  // If no valid audio URL is configured anywhere, we can hide or show placeholder
  if (!audioUrl) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.surfaceVariant }]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={true} // Disabled placeholder until audio player integration
      >
        <MaterialDesignIcons
          name="play-circle-outline"
          size={20}
          color={theme.colors.outline}
        />
        <MyText style={[styles.text, { color: theme.colors.outline }]}>
          Audio Coming Soon
        </MyText>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  text: {
    fontSize: 12,
    marginLeft: 6,
  },
});

export default ReaderAudioButton;
