// src/services/audioService.js
import Sound from 'react-native-sound';

// Enable playback in silence mode for iOS
Sound.setCategory('Playback');

let currentSound = null;
let currentUrl = null;
let isPlaying = false;
let duration = 0;
let currentTime = 0;
let progressInterval = null;

const listeners = new Set();

let activeStartTimestamp = 0;
let activeEndTimestamp = 0;

const notifyListeners = () => {
  const state = {
    isPlaying,
    currentTime,
    duration,
    currentUrl,
    activeStartTimestamp,
    activeEndTimestamp,
  };
  listeners.forEach(cb => cb(state));
};

export const subscribeAudioState = (callback) => {
  listeners.add(callback);
  // Send immediate state
  callback({
    isPlaying,
    currentTime,
    duration,
    currentUrl,
    activeStartTimestamp,
    activeEndTimestamp,
  });
  return () => {
    listeners.delete(callback);
  };
};


const startProgressTimer = () => {
  stopProgressTimer();
  progressInterval = setInterval(() => {
    if (currentSound && isPlaying) {
      currentSound.getCurrentTime((seconds) => {
        currentTime = seconds;
        notifyListeners();

        // Auto-pause and reset active segment when current time reaches or exceeds end timestamp
        if (activeEndTimestamp > 0 && seconds >= activeEndTimestamp) {
          stopAudioTrack();
        }


      });
    }
  }, 200);
};



const stopProgressTimer = () => {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
};

/**
 * Plays or toggles audio track with optional segment start and end timestamps.
 */
export const playAudioTrack = ({ url, title = 'Stothram', start = 0, end = 0 }) => {
  if (!url) return;

  const targetStart = start || 0;
  const targetEnd = end > 0 ? end : 0;

  // If same URL is already loaded
  if (currentSound && currentUrl === url) {
    // Check if tapping the EXACT same segment/stanza that was active
    const isSameSegment =
      (targetStart === 0 && targetEnd === 0)
        ? (activeStartTimestamp === 0 && activeEndTimestamp === 0)
        : (activeStartTimestamp === targetStart && activeEndTimestamp === targetEnd);

    if (isSameSegment) {
      if (isPlaying) {
        pauseAudioTrack();
      } else {
        // If current position has reached or passed the end timestamp, reset to start before playing
        if (activeEndTimestamp > 0 && currentTime >= activeEndTimestamp - 0.5) {
          currentSound.setCurrentTime(activeStartTimestamp);
          currentTime = activeStartTimestamp;
        }
        currentSound.play(onPlaybackFinish);
        isPlaying = true;
        startProgressTimer();
        notifyListeners();
      }
    } else {
      // Switching to a DIFFERENT stanza/segment:
      // 1. Immediately update active timestamps to the NEW segment
      activeStartTimestamp = targetStart;
      activeEndTimestamp = targetEnd;
      currentTime = targetStart;

      // 2. Seek sound to beginning of NEW segment
      currentSound.setCurrentTime(targetStart);

      // 3. Ensure sound is actively playing
      currentSound.play(onPlaybackFinish);
      isPlaying = true;
      startProgressTimer();
      notifyListeners();
    }
    return;
  }

  // Release previous sound instance if playing a new URL
  stopAudioTrack();

  currentUrl = url;
  activeStartTimestamp = targetStart;
  activeEndTimestamp = targetEnd;
  currentTime = targetStart;


  currentSound = new Sound(url, '', error => {
    if (error) {
      console.error('Failed to load audio sound:', error);
      stopAudioTrack();
      return;
    }

    duration = currentSound.getDuration();

    if (start > 0) {
      currentSound.setCurrentTime(start);
    }

    currentSound.play(onPlaybackFinish);
    isPlaying = true;
    startProgressTimer();
    notifyListeners();
  });
};


const onPlaybackFinish = (success) => {
  isPlaying = false;
  stopProgressTimer();
  if (!success) {
    console.error('Audio playback failed during playback');
  }
  notifyListeners();
};

/**
 * Pauses playback
 */
export const pauseAudioTrack = () => {
  if (currentSound && isPlaying) {
    currentSound.pause();
    isPlaying = false;
    stopProgressTimer();
    notifyListeners();
  }
};

/**
 * Seeks to position in seconds
 */
export const seekAudioTrack = (seconds) => {
  if (currentSound) {
    currentSound.setCurrentTime(seconds);
    currentTime = seconds;
    notifyListeners();
  }
};

/**
 * Stops playback and releases sound instance
 */
export const stopAudioTrack = () => {
  stopProgressTimer();
  if (currentSound) {
    try {
      currentSound.stop();
      currentSound.release();
    } catch (err) {
      console.error('Error releasing Sound instance:', err);
    }
    currentSound = null;
    currentUrl = null;
    isPlaying = false;
    duration = 0;
    currentTime = 0;
    notifyListeners();
  }
};
