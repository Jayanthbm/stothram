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
const ReaderScreen = ({navigation, route}) => {
  const {item} = route.params;
  const {
    backgroundColor,
    headerBackground,
    textColor,
    font,
    updateFont,
    darkmode,
  } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [dataUrl, setDataUrl] = useState(null);
  const [readerData, setReaderData] = useState(null);

  const sliderColor = darkmode ? '#ab8b2c' : '#6200EE';
  useEffect(() => {
    navigation.setOptions({
      title: displayTitle ? displayTitle : title,
      ...commonNavigationOptions(headerBackground),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      headerRight: () => <CustomHeaderRight navigation={navigation} />,
    });
  }, [navigation, title, displayTitle, headerBackground]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await dataHelper(
        item?.title,
        item?.dataUrl,
        SCREEN_NAMES.READER_SCREEN,
      );
      if (fetchedData) {
        setReaderData(fetchedData);
      }
    };
    setDisplayTitle(item.displayTitle);
    setTitle(item?.title);
    setDataUrl(item?.dataUrl);
    if (item?.dataUrl) {
      fetchData();
    }
  }, [item]);

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
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
          thumbTintColor={sliderColor}
          minimumTrackTintColor={sliderColor}
          tapToSeek={true}
        />
      )}

      <ScrollView>
        {readerData?.content.map((data, index) => {
          if (data?.type == 'paragraph') {
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

      <Admob />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
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
