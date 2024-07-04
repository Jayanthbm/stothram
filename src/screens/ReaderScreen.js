import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
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
      paddingBottom: 5,
      borderBottomColor: borderColor,
    },
    lineStyle: {
      fontWeight: '700',
      lineHeight: parseInt(fontSize) + 12,
      fontSize: fontSize,
      color: textColor,
      fontFamily: 'brhknde',
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
      borderLeftWidth: 0,
      paddingLeft: 0,
    },
    pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    // pickerContainer: {
    //   display: 'none',
    // },
  });
};

const LANGUAGE_MAPPER = {
  kn: 'Kannada',
  en: 'English',
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
  const [pdfReader, setPdfReader] = useState(false);
  const sliderColor = darkmode ? '#ab8b2c' : '#6200EE';
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [fetchedData, setFetchedData] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const flatListRef = useRef(null);
  const pickerRef = useRef();
  const updateFontSize = useCallback(
    value => {
      updateFont(value);
      setTimeout(() => {
        scrollToHighlightedIndex(highlightedIndex);
      }, 500);
    },
    [updateFont],
  );

  const [pickerStyle, setPickerStyle] = useState({
    display: 'none',
  });
  const openPicker = () => {
    setPickerStyle({ display: 'flex' });
    pickerRef.current.focus();
  };

  const closePicker = () => {
    setPickerStyle({ display: 'none' });
    pickerRef.current.blur();
  };
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
      headerRight: () => (
        <CustomHeaderRight
          navigation={navigation}
          showLangPickerIcon={languages?.length > 0}
          openPicker={openPicker}
        />
      ),
    });
  }, [navigation, title, displayTitle, darkmode, languages]);

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
          setFetchedData(fetchedData);
          if (typeof fetchedData === 'string') {
            setPdfReader(true);
          }
          if (fetchedData.translations) {
            const languages = Object.keys(fetchedData.translations);
            setLanguages(languages);
            const currentLanguage = languages[0];
            setCurrentLanguage(currentLanguage);
          } else {
            setReaderData(fetchedData);
          }
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

  useEffect(() => {
    if (currentLanguage && fetchedData.translations !== undefined) {
      setReaderData(fetchedData['translations'][currentLanguage]);
      setDisplayTitle(fetchedData['translations'][currentLanguage].title);
    }
  }, [currentLanguage]);

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
      {languages && languages.length > 0 && (
        <View style={pickerStyle}>
          <Picker
            ref={pickerRef}
            selectedValue={currentLanguage}
            onValueChange={(itemValue, _itemIndex) => {
              setCurrentLanguage(itemValue);
              closePicker();
            }}
            style={{
              color: COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor,
            }}>
            {languages.map(language => (
              <Picker.Item
                key={language}
                label={
                  LANGUAGE_MAPPER[language]
                    ? LANGUAGE_MAPPER[language]
                    : language
                }
                value={language}
              />
            ))}
          </Picker>
        </View>
      )}
      {pdfReader ? (
        <>
          {readerData && (
            <Pdf
              source={{
                uri: readerData,
                cache: true,
              }}
              trustAllCerts={false}
              style={styles.pdf}
              showsHorizontalScrollIndicator={false}
              fitWidth={true}
              scale={1}
            />
          )}
        </>
      ) : (
        <>
          {readerData && (
            <Slider
              value={font}
              onValueChange={updateFontSize}
              minimumValue={15}
              maximumValue={30}
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
        </>
      )}
      <Admob />
    </View>
  );
};

export default ReaderScreen;
