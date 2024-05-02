import Slider from '@react-native-community/slider';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BackHandler, FlatList, StyleSheet, Text, View } from 'react-native';

import Admob from '../components/admob';
import CustomHeaderLeft from '../components/headerLeft';
import CustomHeaderRight from '../components/headerRight';
import { SCREEN_NAMES } from '../constants';
import { ThemeContext } from '../contexts/themeContext';
import { commonNavigationOptions } from '../navigationOptions';
import { COLOR_SCHEME, commonStyles } from '../styles/styles';
import { dataHelper } from '../utils/dataUtils';

const generateStyles = (
  backgroundColor,
  textColor,
  borderColor,
  headerBackground,
  headertext,
  fontSize = 18,
) => {
  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: backgroundColor,
    },
    paragraphStyle: {
      marginLeft: 7,
      marginRight: 2,
      marginBottom: 18,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    lineStyle: {
      fontWeight: '700',
      marginBottom: 4,
      fontSize: fontSize,
      color: textColor,
      fontFamily: 'NotoSerif',
    },
    subHeadingContainer: {
      marginBottom: 5,
      padding: 5,
      backgroundColor: headerBackground,
    },
    subHeadingText: {
      color: headertext,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: '500',
    },
    highlightedItem: {
      borderLeftColor: borderColor,
      borderLeftWidth: 2,
      paddingLeft:2
    }
  });
};

// Main ReaderScreen component
const ReaderScreen = ({ navigation, route }) => {
  // Extract theme-related context
  const { font, updateFont, darkmode } = useContext(ThemeContext);
  // Navigation State
  const { item } = route.params;
  // State variables for managing data and UI
  const [title, setTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [readerData, setReaderData] = useState(null);
  const sliderColor = darkmode ? '#ab8b2c' : '#6200EE';
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const flatListRef = useRef(null);
  const updateFontSize = useCallback(
    value => {
      updateFont(value);
      setTimeout(() => {
        scrollToHighlightedIndex(highlightedIndex);
      }, 500);
    },
    [updateFont],
  );

  // useEffect to set navigation options
  useEffect(() => {
    navigation.setOptions({
      title: displayTitle ? displayTitle : title,
      ...commonNavigationOptions(
        COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headerBackground,
        COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext,
        'NotoSerif',
      ),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      headerRight: () => <CustomHeaderRight navigation={navigation} />,
    });
  }, [navigation, title, displayTitle, darkmode]);

  // useEffect to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await dataHelper(
          item?.title,
          item?.dataUrl,
          SCREEN_NAMES.READER_SCREEN,
        );
        if (fetchedData) {
          setReaderData(fetchedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setDisplayTitle(item.displayTitle);
    setTitle(item?.title);
    if (item?.dataUrl) {
      fetchData();
    }
  }, [item]);

  const confirmExit = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    // Handle hardware back press event
    const backAction = () => {
      // Confirm exit when the hardware back button is pressed
      confirmExit();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const scrollToHighlightedIndex = index => {
    if (flatListRef.current && index >= 0) {
      flatListRef.current.scrollToIndex({ index: index, animated: true });
    }
  };

  // Generate styles based on current context values
  const styles = generateStyles(
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].backgroundColor,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].borderColor,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headerBackground,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext,
    font,
  );

  return (
    <View style={styles.container}>
      {readerData && (
        <Slider
          value={font}
          onValueChange={updateFontSize}
          minimumValue={15}
          maximumValue={25}
          step={1}
          style={{
            height: 40,
          }}
          thumbTintColor={sliderColor}
          minimumTrackTintColor={sliderColor}
          tapToSeek={true}
        />
      )}

      <FlatList
        ref={flatListRef}
        data={readerData?.content}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (item?.type === 'paragraph') {
            return (
              <View
                style={[
                  styles.paragraphStyle,
                  highlightedIndex === index && styles.highlightedItem,
                ]}
                onTouchStart={() => {
                  if (highlightedIndex !== index) {
                    setHighlightedIndex(index);
                  }
                }}>
                {item.lines.map((line, index) => (
                  <Text style={styles.lineStyle} key={index}>
                    {line}
                  </Text>
                ))}
              </View>
            );
          }
          if (item.type === 'subheading') {
            return (
              <View style={styles.subHeadingContainer}>
                <Text style={styles.subHeadingText}>{item.title}</Text>
              </View>
            );
          }
        }}
      />

      <Admob />
    </View>
  );
};

export default ReaderScreen;
