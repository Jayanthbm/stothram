import Slider from '@react-native-community/slider';
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
      fontWeight: '500',
      marginBottom: 4,
      fontSize: fontSize,
      color: textColor,
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
  });
};

// Main ReaderScreen component
const ReaderScreen = ({navigation, route}) => {
  // Extract theme-related context
  const {font, updateFont, darkmode} = useContext(ThemeContext);

  // Navigation State
  const {item} = route.params;

  // State variables for managing data and UI
  const [title, setTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [readerData, setReaderData] = useState(null);
  const sliderColor = darkmode ? '#ab8b2c' : '#6200EE';

  // useEffect to set navigation options
  useEffect(() => {
    navigation.setOptions({
      title: displayTitle ? displayTitle : title,
      ...commonNavigationOptions(
        COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headerBackground,
        COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext,
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

  // Generate styles based on current context values
  const styles = generateStyles(
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].backgroundColor,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].borderColor,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headerBackground,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext,
    font,
  );

  const MemoizedParagraph = React.memo(({data, styles}) => {
    return (
      <View style={styles.paragraphStyle}>
        {data.lines.map((line, index) => (
          <Text style={styles.lineStyle} key={index}>
            {line}
          </Text>
        ))}
      </View>
    );
  });

  const MemoizedSubheading = React.memo(({data, styles}) => {
    return (
      <View style={styles.subHeadingContainer}>
        <Text style={styles.subHeadingText}>{data.title}</Text>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      {readerData && (
        <Slider
          value={font}
          onValueChange={value => updateFont(value)}
          minimumValue={15}
          maximumValue={40}
          step={1}
          style={{
            height: 40,
          }}
          thumbTintColor={sliderColor}
          minimumTrackTintColor={sliderColor}
          tapToSeek={true}
        />
      )}

      {/* FlatList for displaying reader content */}
      <FlatList
        data={readerData?.content}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          if (item?.type === 'paragraph') {
            // Render paragraphs using MemoizedParagraph
            return <MemoizedParagraph data={item} styles={styles} />;
          }
          if (item.type === 'subheading') {
            // Render subheadings using MemoizedSubheading
            return <MemoizedSubheading data={item} styles={styles} />;
          }
        }}
      />
      {/* Display Admob component */}
      <Admob />
    </View>
  );
};

export default ReaderScreen;
