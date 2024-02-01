import Slider from '@react-native-community/slider';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Admob from '../components/admob';
import CustomHeaderLeft from '../components/headerLeft';
import CustomHeaderRight from '../components/headerRight';
import {SCREEN_NAMES} from '../constants';
import {ThemeContext} from '../contexts/themeContext';
import {commonNavigationOptions} from '../navigationOptions';
import {dataHelper} from '../utils/dataUtils';
import { commonStyles } from '../styles/styles';

// Main ReaderScreen component
const ReaderScreen = ({ navigation, route }) => {
  // Extract theme-related context
  const {
    backgroundColor,
    headerBackground,
    textColor,
    font,
    updateFont,
    darkmode,
  } = useContext(ThemeContext);

  // Navigation State
  const {item} = route.params;

  // State variables for managing data and UI
  const [title, setTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [readerData, setReaderData] = useState(null);
  const SLIDER_COLOR = darkmode ? '#ab8b2c' : '#6200EE';

  // useEffect to set navigation options
  useEffect(() => {
    navigation.setOptions({
      title: displayTitle ? displayTitle : title,
      ...commonNavigationOptions(headerBackground),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      headerRight: () => <CustomHeaderRight navigation={navigation} />,
    });
  }, [navigation, title, displayTitle, headerBackground]);

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

  return (
    <View style={[commonStyles.container, {backgroundColor}]}>
      {readerData && (
        <Slider
          value={font}
          onValueChange={value => updateFont(value)}
          minimumValue={15}
          maximumValue={40}
          step={3}
          style={{
            height: 40,
          }}
          thumbTintColor={SLIDER_COLOR}
          minimumTrackTintColor={SLIDER_COLOR}
          tapToSeek={true}
        />
      )}
      {/* ScrollView for displaying reader content */}
      <ScrollView>
        {readerData?.content.map((data, index) => {
          if (data?.type == 'paragraph') {
            // Render paragraphs
            return (
              <View
                style={[
                  styles.paragraphStyle,
                  {borderBottomColor: darkmode ? '#b8b6ab' : '#8f8f8f'},
                ]}
                key={index}>
                {data?.lines?.map((line, index) => {
                  return (
                    <Text
                      style={[
                        styles.lineStyle,
                        {fontSize: font, color: textColor},
                      ]}
                      key={index}>
                      {line}
                    </Text>
                  );
                })}
              </View>
            );
          }
          if (data.type === 'subheading') {
            // Render subheadings
            return (
              <View
                style={[
                  styles.subHeadingContainer,
                  {backgroundColor: headerBackground},
                ]}
                key={index}>
                <Text style={styles.subHeadingText}>{data.title}</Text>
              </View>
            );
          }
        })}
      </ScrollView>
      {/* Display Admob component */}
      <Admob />
    </View>
  );
};

const styles = StyleSheet.create({
  paragraphStyle: {
    marginLeft: 7,
    marginRight: 2,
    marginBottom: 18,
  },
  lineStyle: {
    fontWeight: '500',
    marginBottom: 4,
  },
  subHeadingContainer: {
    marginBottom: 5,
    padding: 5,
  },
  subHeadingText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ReaderScreen;
