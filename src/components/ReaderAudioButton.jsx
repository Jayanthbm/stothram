import React, { memo, useEffect, useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Slider from '@react-native-community/slider';
import NetInfo from '@react-native-community/netinfo';
import MyText from './MyText';
import { useTheme } from '../contexts/themeContext';
import {
  playAudioTrack,
  seekAudioTrack,
  stopAudioTrack,
  subscribeAudioState,
} from '../services/audioService';

const formatTime = seconds => {
  if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * ReaderAudioButton
 * Audio Player for Top Screen Bar & Paragraph Cards.
 * Rendered ONLY if the device is connected to the internet.
 */
const ReaderAudioButton = memo(
  ({
    audioUrl,
    start = 0,
    end = 0,
    isTopPlayer = false,
    title = '',
    displayTitle = '',
    onPress,
  }) => {
    const { theme } = useTheme();
    const [isConnected, setIsConnected] = useState(true);
    const [audioState, setAudioState] = useState({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      currentUrl: null,
      activeStartTimestamp: 0,
      activeEndTimestamp: 0,
    });

    useEffect(() => {
      // Subscribe to network connection state
      const unsubscribeNetInfo = NetInfo.addEventListener(state => {
        setIsConnected(
          Boolean(state.isConnected && state.isInternetReachable !== false),
        );
      });

      const unsubscribeAudio = subscribeAudioState(state => {
        setAudioState(state);
      });

      return () => {
        unsubscribeNetInfo();
        unsubscribeAudio();
      };
    }, []);

    // Do not render audio player if offline
    if (!isConnected) {
      return null;
    }

    const hasUrl = typeof audioUrl === 'string' && audioUrl.trim().length > 0;
    const hasTimestamps = start !== 0 || end !== 0;

    // Show player only if URL is present (or start/end non-zero)
    if (isTopPlayer) {
      if (!hasUrl) return null;
    } else {
      if (!hasUrl || !hasTimestamps) return null;
    }

    const isThisTrackLoaded =
      audioState.currentUrl === audioUrl &&
      (isTopPlayer
        ? audioState.activeStartTimestamp === 0 &&
          audioState.activeEndTimestamp === 0
        : audioState.activeStartTimestamp === start &&
          audioState.activeEndTimestamp === end);

    const isThisPlaying = isThisTrackLoaded && audioState.isPlaying;

    const handlePlayPause = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (onPress) {
        onPress();
      } else {
        playAudioTrack({
          url: audioUrl,
          title: displayTitle || title || 'Stothram Audio',
          start,
          end,
        });
      }
    };

    const handleStop = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      stopAudioTrack();
    };

    const handleSlidingComplete = value => {
      if (!isThisTrackLoaded) {
        // Start playback if not loaded yet
        playAudioTrack({
          url: audioUrl,
          title: displayTitle || title || 'Stothram Audio',
          start: value,
          end,
        });
      } else {
        seekAudioTrack(value);
      }
    };

    // Determine slider range
    const sliderMin = end > start ? start : 0;
    const sliderMax =
      end > start ? end : audioState.duration > 0 ? audioState.duration : 100;
    const sliderValue = isThisTrackLoaded
      ? Math.min(sliderMax, Math.max(sliderMin, audioState.currentTime))
      : sliderMin;

    // 🌟 Render Paragraph Segment Design (Compact Seekable Slider + Small Play/Pause Icon + Stop Icon)
    if (!isTopPlayer) {
      return (
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={styles.segmentPlayBtn}
            onPress={handlePlayPause}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons
              name={isThisPlaying ? 'pause-circle' : 'play-circle'}
              size={22}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          {isThisTrackLoaded && (
            <>
              <Slider
                style={styles.segmentSlider}
                minimumValue={sliderMin}
                maximumValue={sliderMax}
                value={sliderValue}
                onSlidingComplete={handleSlidingComplete}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.outlineVariant || '#e0e0e0'}
                thumbTintColor={theme.colors.primary}
              />
              <TouchableOpacity
                style={styles.segmentStopBtn}
                onPress={handleStop}
                activeOpacity={0.7}
              >
                <MaterialDesignIcons
                  name="stop-circle"
                  size={20}
                  color={theme.colors.error || '#b00020'}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      );
    }

    // 🌟 Render Top Player Design:
    // Default: Small play icon on left (no background card, no timings, no stop button)
    // Active: Expands into full player card with animation
    if (!isThisTrackLoaded) {
      return (
        <View style={styles.topIdleContainer}>
          <TouchableOpacity
            style={styles.topIdlePlayBtn}
            onPress={handlePlayPause}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons
              name="play-circle"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.topContainer}>
        <View
          style={[
            styles.playerCard,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          {/* Row 1: Play/Pause Toggle + Seeking Slider + Stop Button */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handlePlayPause}
              activeOpacity={0.7}
            >
              <MaterialDesignIcons
                name={isThisPlaying ? 'pause-circle' : 'play-circle'}
                size={28}
                color={theme.colors.onPrimaryContainer}
              />
            </TouchableOpacity>

            <Slider
              style={styles.topSlider}
              minimumValue={0}
              maximumValue={audioState.duration || 100}
              value={audioState.currentTime}
              onSlidingComplete={handleSlidingComplete}
              minimumTrackTintColor={theme.colors.onPrimaryContainer}
              maximumTrackTintColor={theme.colors.outlineVariant || '#cccccc'}
              thumbTintColor={theme.colors.onPrimaryContainer}
            />

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleStop}
              activeOpacity={0.7}
            >
              <MaterialDesignIcons
                name="stop-circle"
                size={26}
                color={theme.colors.onPrimaryContainer}
              />
            </TouchableOpacity>
          </View>

          {/* Row 2: Timers (Current Position / Total Duration) */}
          <View style={styles.timerRow}>
            <MyText
              style={[
                styles.timeText,
                { color: theme.colors.onPrimaryContainer },
              ]}
            >
              {formatTime(audioState.currentTime)}
            </MyText>
            <MyText
              style={[
                styles.timeText,
                { color: theme.colors.onPrimaryContainer },
              ]}
            >
              {formatTime(audioState.duration)}
            </MyText>
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  topIdleContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 4,
    alignItems: 'flex-start',
  },
  topIdlePlayBtn: {
    paddingVertical: 2,
  },

  topContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: 'stretch',
  },

  playerCard: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topSlider: {
    flex: 1,
    height: 24,
    marginLeft: 6,
    marginRight: 6,
  },
  actionBtn: {
    padding: 2,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 2,
  },
  timeText: {
    fontSize: 11,
    opacity: 0.8,
  },
  segmentContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  segmentPlayBtn: {
    paddingRight: 4,
  },
  segmentSlider: {
    flex: 1,
    height: 20,
  },
  segmentStopBtn: {
    paddingLeft: 4,
  },
});

export default ReaderAudioButton;
