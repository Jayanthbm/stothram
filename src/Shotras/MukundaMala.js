/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Switch, Dimensions, BackHandler, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';
import Header from '../Components/Header';
import St from '../Components/St';
import Admob from '../Components/Admob';
import * as Adhelper from '../Constants/AdUnits';

const MukundaMala = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(null);
  const [darkmode, setDarkMode] = useState(null);
  const [showToggle, setShowToggle] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [orientation, setOrientation] = useState('portrait');
  const backgroundColor = darkmode ? '#000' : '#fff';
  const textColor = darkmode ? '#fff' : '#000';

  const [font, setFont] = useState(24);
  const storeData = async (value) => {
    try {
      let v = value ? 'true' : 'false';
      await AsyncStorage.setItem('@darkmode', v);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@darkmode');
      if (value !== null) {
        if (value === 'true') {
          setDarkMode(true);
          setIsEnabled(true);
        }
        if (value === 'false') {
          setDarkMode(false);
          setIsEnabled(false);
        }
      }
      const dmt = await AsyncStorage.getItem('@darkmodetoggle');
      if (dmt !== null) {
        if (dmt === 'true') {
          setShowToggle(true);
        }
        if (dmt === 'false') {
          setShowToggle(false);
        }
      } else {
        setShowToggle(true);
      }
    } catch (e) {
      // error reading value
    }
  };


  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };
  Dimensions.addEventListener('change', () => {
    let orr = isPortrait() ? 'portrait' : 'landscape';
    if (orr === 'portrait') {
      setFont(24);
    }
    if (orr === 'landscape') {
      setFont(38);
    }
    setOrientation(orr);
  });
  useEffect(() => {
    getData();
    let or = isPortrait() ? 'portrait' : 'landscape';
    setOrientation(or);
    const backAction = () => {
      navigation.navigate('ShotramScreen');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();

  }, []);
  return (
    <View style={{ backgroundColor: backgroundColor, flex: 1 }} >
      <React.Fragment>
        {showToggle && showToggle === true && (
          <Switch
            style={{
              marginTop: '3%',
            }}
            value={isEnabled}
            onValueChange={() => {
              setIsEnabled(!isEnabled);
              storeData(!darkmode);
              setDarkMode(!darkmode);
            }}
          />
        )}
        <Header
          title="ಮುಕುಂದಮಾಲಾ ಸ್ತೋತ್ರಂ"
          darkmode={darkmode}
        />
        <Slider
          value={font}
          onValueChange={value => setFont(value)}
          minimumValue={15}
          maximumValue={50}
          style={{
            marginStart: 15,
            marginEnd: 15,
          }}
        />
        <ScrollView>
          <View
            style={{
              marginLeft: 7,
              marginRight: 1,
            }}
          >
            <St
              color={textColor}
              fontSize={font}
              line1={'ಘುಷ್ಯತೇ ಯಸ್ಯ ನಗರೇ ರಂಗಯಾತ್ರಾ ದಿನೇ ದಿನೇ |'}
              line2={'ತಮಹಂ ಶಿರಸಾ ವಂದೇ ರಾಜಾನಂ ಕುಲಶೇಖರಮ್ ||'}
              line3={'ಶ್ರೀವಲ್ಲಭೇತಿ ವರದೇತಿ ದಯಾಪರೇತಿ'}
              line4={'ಭಕ್ತಪ್ರಿಯೇತಿ ಭವಲುಂಠನಕೋವಿದೇತಿ |'}
              line5={'ನಾಥೇತಿ ನಾಗಶಯನೇತಿ ಜಗನ್ನಿವಾಸೇತಿ'}
              line6={'ಆಲಾಪನಂ ಪ್ರತಿಪದಂ ಕುರು ಮೇ ಮುಕುಂದ || ೧ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಜಯತು ಜಯತು ದೇವೋ ದೇವಕೀನಂದನೋಽಯಂ'}
              line2={'ಜಯತು ಜಯತು ಕೃಷ್ಣೋ ವೃಷ್ಣಿವಂಶಪ್ರದೀಪಃ |'}
              line3={'ಜಯತು ಜಯತು ಮೇಘಶ್ಯಾಮಲಃ ಕೋಮಲಾಂಗಃ'}
              line4={'ಜಯತು ಜಯತು ಪೃಥ್ವೀಭಾರನಾಶೋ ಮುಕುಂದಃ || ೨ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಮುಕುಂದ ಮೂರ್ಧ್ನಾ ಪ್ರಣಿಪತ್ಯ ಯಾಚೇ'}
              line2={'ಭವಂತಮೇಕಾಂತಮಿಯಂತಮರ್ಥಮ್ |'}
              line3={'ಅವಿಸ್ಮೃತಿಸ್ತ್ವಚ್ಚರಣಾರವಿಂದೇ'}
              line4={'ಭವೇ ಭವೇ ಮೇಽಸ್ತು ಭವತ್ಪ್ರಸಾದಾತ್ || ೩ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ನಾಹಂ ವಂದೇ ತವ ಚರಣಯೋರ್ದ್ವಂದ್ವಮದ್ವಂದ್ವಹೇತೋಃ'}
              line2={'ಕುಂಭೀಪಾಕಂ ಗುರುಮಪಿ ಹರೇ ನಾರಕಂ ನಾಪನೇತುಮ್ |'}
              line3={'ರಮ್ಯಾರಾಮಾಮೃದುತನುಲತಾ ನಂದನೇ ನಾಪಿ ರಂತುಂ'}
              line4={'ಭಾವೇ ಭಾವೇ ಹೃದಯಭವನೇ ಭಾವಯೇಯಂ ಭವಂತಮ್ || ೪ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ನಾಸ್ಥಾ ಧರ್ಮೇ ನ ವಸುನಿಚಯೇ ನೈವ ಕಾಮೋಪಭೋಗೇ'}
              line2={'ಯದ್ಯದ್ಭವ್ಯಂ ಭವತು ಭಗವನ್ಪೂರ್ವಕರ್ಮಾನುರೂಪಮ್ |'}
              line3={'ಏತತ್ಪ್ರಾರ್ಥ್ಯಂ ಮಮ ಬಹುಮತಂ ಜನ್ಮಜನ್ಮಾಂತರೇಽಪಿ'}
              line4={'ತ್ವತ್ಪಾದಾಂಭೋರುಹಯುಗಗತಾ ನಿಶ್ಚಲಾ ಭಕ್ತಿರಸ್ತು || ೫ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ದಿವಿ ವಾ ಭುವಿ ವಾ ಮಮಾಸ್ತು ವಾಸೋ'}
              line2={'ನರಕೇ ವಾ ನರಕಾಂತಕ ಪ್ರಕಾಮಮ್ |'}
              line3={'ಅವಧೀರಿತಶಾರದಾರವಿಂದೌ'}
              line4={'ಚರಣೌ ತೇ ಮರಣೇಽಪಿ ಚಿಂತಯಾಮಿ || ೬ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಕೃಷ್ಣ ತ್ವದೀಯಪದಪಂಕಜಪಂಜರಾಂತಂ'}
              line2={'ಅದ್ಯೈವ ಮೇ ವಿಶತು ಮಾನಸರಾಜಹಂಸಃ |'}
              line3={'ಪ್ರಾಣಪ್ರಯಾಣಸಮಯೇ ಕಫವಾತಪಿತ್ತೈಃ'}
              line4={'ಕಂಠಾವರೋಧನವಿಧೌ ಸ್ಮರಣಂ ಕುತಸ್ತೇ || ೭ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಚಿಂತಯಾಮಿ ಹರಿಮೇವ ಸಂತತಂ'}
              line2={'ಮಂದಮಂದ ಹಸಿತಾನನಾಂಬುಜಂ'}
              line3={'ನಂದಗೋಪತನಯಂ ಪರಾತ್ ಪರಂ'}
              line4={'ನಾರದಾದಿಮುನಿವೃಂದವಂದಿತಮ್ || ೮ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಕರಚರಣಸರೋಜೇ ಕಾಂತಿಮನ್ನೇತ್ರಮೀನೇ'}
              line2={'ಶ್ರಮಮುಷಿ ಭುಜವೀಚಿವ್ಯಾಕುಲೇಽಗಾಧಮಾರ್ಗೇ |'}
              line3={'ಹರಿಸರಸಿ ವಿಗಾಹ್ಯಾಪೀಯ ತೇಜೋಜಲೌಘಂ'}
              line4={'ಭವಮರುಪರಿಖಿನ್ನಃ ಖೇದ ಮದ್ಯತ್ಯಜಾಮಿ || ೯ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಸರಸಿಜನಯನೇ ಸಶಂಖಚಕ್ರೇ'}
              line2={'ಮುರಭಿದಿ ಮಾ ವಿರಮಸ್ವ ಚಿತ್ತ ರಂತುಮ್ |'}
              line3={'ಸುಖತರಮಪರಂ ನ ಜಾತು ಜಾನೇ'}
              line4={'ಹರಿಚರಣಸ್ಮರಣಾಮೃತೇನ ತುಲ್ಯಮ್ || ೧೦ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಾಭೀರ್ಮಂದಮನೋ ವಿಚಿಂತ್ಯ ಬಹುಧಾ ಯಾಮೀಶ್ಚಿರಂ ಯಾತನಾಃ'}
              line2={'ನಾಮೀ ನಃ ಪ್ರಭವಂತಿ ಪಾಪರಿಪವಃ ಸ್ವಾಮೀ ನನು ಶ್ರೀಧರಃ |'}
              line3={'ಆಲಸ್ಯಂ ವ್ಯಪನೀಯ ಭಕ್ತಿಸುಲಭಂ ಧ್ಯಾಯಸ್ವ ನಾರಾಯಣಂ'}
              line4={'ಲೋಕಸ್ಯ ವ್ಯಸನಾಪನೋದನಕರೋ ದಾಸಸ್ಯ ಕಿಂ ನ ಕ್ಷಮಃ || ೧೧ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಭವಜಲಧಿಗತಾನಾಂ ದ್ವಂದ್ವವಾತಾಹತಾನಾಂ'}
              line2={'ಸುತದುಹಿತೃಕಲತ್ರತ್ರಾಣಭಾರಾರ್ದಿತಾನಾಮ್ |'}
              line3={'ವಿಷಮವಿಷಯತೋಯೇ ಮಜ್ಜತಾಮಪ್ಲವಾನಾಂ'}
              line4={'ಭವತು ಶರಣಮೇಕೋ ವಿಷ್ಣುಪೋತೋ ನರಾಣಾಮ್ || ೧೨ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಭವಜಲಧಿಮಗಾಧಂ ದುಸ್ತರಂ ನಿಸ್ತರೇಯಂ'}
              line2={'ಕಥಮಹಮಿತಿ ಚೇತೋ ಮಾ ಸ್ಮ ಗಾಃ ಕಾತರತ್ವಮ್ |'}
              line3={'ಸರಸಿಜದೃಶಿ ದೇವೇ ತಾವಕೀ ಭಕ್ತಿರೇಕಾ'}
              line4={'ನರಕಭಿದಿ ನಿಷಣ್ಣಾ ತಾರಯಿಷ್ಯತ್ಯವಶ್ಯಮ್ || ೧೩ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ತೃಷ್ಣಾತೋಯೇ ಮದನಪವನೋದ್ಧೂತಮೋಹೋರ್ಮಿಮಾಲೇ'}
              line2={'ದಾರಾವರ್ತೇ ತನಯಸಹಜಗ್ರಾಹಸಂಘಾಕುಲೇ ಚ |'}
              line3={'ಸಂಸಾರಾಖ್ಯೇ ಮಹತಿ ಜಲಧೌ ಮಜ್ಜತಾಂ ನಸ್ತ್ರಿಧಾಮನ್'}
              line4={'ಪಾದಾಂಭೋಜೇ ವರದ ಭವತೋ ಭಕ್ತಿನಾವಂ ಪ್ರಯಚ್ಛ || ೧೪ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಾದ್ರಾಕ್ಷಂ ಕ್ಷೀಣಪುಣ್ಯಾನ್ ಕ್ಷಣಮಪಿ ಭವತೋ ಭಕ್ತಿಹೀನಾನ್ಪದಾಬ್ಜೇ'}
              line2={'ಮಾಶ್ರೌಷಂ ಶ್ರಾವ್ಯಬಂಧಂ ತವ ಚರಿತಮಪಾಸ್ಯಾನ್ಯದಾಖ್ಯಾನಜಾತಮ್ |'}
              line3={'ಮಾಸ್ಮಾರ್ಷಂ ಮಾಧವ ತ್ವಾಮಪಿ ಭುವನಪತೇ ಚೇತಸಾಪಹ್ನುವಾನಾನ್'}
              line4={'ಮಾಭೂವಂ ತ್ವತ್ಸಪರ್ಯಾಪರಿಕರರಹಿತೋ ಜನ್ಮಜನ್ಮಾಂತರೇಽಪಿ || ೧೫ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಜಿಹ್ವೇ ಕೀರ್ತಯ ಕೇಶವಂ ಮುರರಿಪುಂ ಚೇತೋ ಭಜ ಶ್ರೀಧರಂ'}
              line2={'ಪಾಣಿದ್ವಂದ್ವ ಸಮರ್ಚಯಾಚ್ಯುತಕಥಾಃ ಶ್ರೋತ್ರದ್ವಯ ತ್ವಂ ಶೃಣು |'}
              line3={'ಕೃಷ್ಣಂ ಲೋಕಯ ಲೋಚನದ್ವಯ ಹರೇರ್ಗಚ್ಛಾಂಘ್ರಿಯುಗ್ಮಾಲಯಂ'}
              line4={'ಜಿಘ್ರ ಘ್ರಾಣ ಮುಕುಂದಪಾದತುಲಸೀಂ ಮೂರ್ಧನ್ ನಮಾಧೋಕ್ಷಜಮ್ || ೧೬ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಹೇ ಲೋಕಾಃ ಶ್ರುಣುತ ಪ್ರಸೂತಿಮರಣವ್ಯಾಧೇಶ್ಚಿಕಿತ್ಸಾಮಿಮಾಂ'}
              line2={'ಯೋಗಜ್ಞಾಃ ಸಮುದಾಹರಂತಿ ಮುನಯೋ ಯಾಂ ಯಾಜ್ಞವಲ್ಕ್ಯಾದಯಃ |'}
              line3={'ಅಂತರ್ಜ್ಯೋತಿರಮೇಯಮೇಕಮಮೃತಂ ಕೃಷ್ಣಾಖ್ಯಮಾಪೀಯತಾಂ'}
              line4={'ತತ್ಪೀತಂ ಪರಮೌಷಧಂ ವಿತನುತೇ ನಿರ್ವಾಣಮಾತ್ಯಂತಿಕಮ್ || ೧೭ |'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಹೇ ಮರ್ತ್ಯಾಃ ಪರಮಂ ಹಿತಂ ಶ್ರುಣುತ ವೋ ವಕ್ಷ್ಯಾಮಿ ಸಂಕ್ಷೇಪತಃ'}
              line2={'ಸಂಸಾರಾರ್ಣವಮಾಪದೂರ್ಮಿಬಹುಲಂ ಸಮ್ಯಕ್ ಪ್ರವಿಶ್ಯ ಸ್ಥಿತಾಃ |'}
              line3={'ನಾನಾಜ್ಞಾನಮಪಾಸ್ಯ ಚೇತಸಿ ನಮೋ ನಾರಾಯಣಾಯೇತ್ಯಮುಂ-'}
              line4={'ಮಂತ್ರಂ ಸಪ್ರಣವಂ ಪ್ರಣಾಮಸಹಿತಂ ಪ್ರಾವರ್ತಯಧ್ವಂ ಮುಹುಃ || ೧೮ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಪೃಥ್ವೀರೇಣುರಣುಃ ಪಯಾಂಸಿ ಕಣಿಕಾಃ ಫಲ್ಗುಸ್ಫುಲಿಂಗೋ ಲಘುಃ'}
              line2={'ತೇಜೋ ನಿಶ್ಶ್ವಸನಂ ಮರುತ್ ತನುತರಂ ರಂಧ್ರಂ ಸುಸೂಕ್ಷ್ಮಂ ನಭಃ |'}
              line3={'ಕ್ಷುದ್ರಾ ರುದ್ರಪಿತಾಮಹಪ್ರಭೃತಯಃ ಕೀಟಾಃ ಸಮಸ್ತಾಃ ಸುರಾಃ'}
              line4={'ದೃಷ್ಟೇ ಯತ್ರ ಸ ತಾವಕೋ ವಿಜಯತೇ ಭೂಮಾವಧೂತಾವಧಿಃ || ೧೯ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಬದ್ಧೇನಾಂಜಲಿನಾ ನತೇನ ಶಿರಸಾ ಗಾತ್ರೈಃ ಸರೋಮೋದ್ಗಮೈಃ'}
              line2={'ಕಂಠೇನ ಸ್ವರಗದ್ಗದೇನ ನಯನೇನೋದ್ಗೀರ್ಣಬಾಷ್ಪಾಂಬುನಾ |'}
              line3={'ನಿತ್ಯಂ ತ್ವಚ್ಚರಣಾರವಿಂದಯುಗಳಧ್ಯಾನಾಮೃತಾಸ್ವಾದಿನಾಂ'}
              line4={'ಅಸ್ಮಾಕಂ ಸರಸೀರುಹಾಕ್ಷ ಸತತಂ ಸಂಪದ್ಯತಾಂ ಜೀವಿತಮ್ || ೨೦ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಹೇ ಗೋಪಾಲಕ ಹೇ ಕೃಪಾಜಲನಿಧೇ ಹೇ ಸಿಂಧುಕನ್ಯಾಪತೇ'}
              line2={'ಹೇ ಕಂಸಾಂತಕ ಹೇ ಗಜೇಂದ್ರಕರುಣಾಪಾರೀಣ ಹೇ ಮಾಧವ |'}
              line3={'ಹೇ ರಾಮಾನುಜ ಹೇ ಜಗತ್ತ್ರಯಗುರೋ ಹೇ ಪುಂಡರೀಕಾಕ್ಷ ಮಾಂ'}
              line4={'ಹೇ ಗೋಪೀಜನನಾಥ ಪಾಲಯ ಪರಂ ಜಾನಾಮಿ ನ ತ್ವಾಂ ವಿನಾ || ೨೧ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಭಕ್ತಾಪಾಯಭುಜಂಗಗಾರುಡಮಣಿಸ್ತ್ರೈಲೋಕ್ಯರಕ್ಷಾಮಣಿಃ'}
              line2={'ಗೋಪೀಲೋಚನಚಾತಕಾಂಬುದಮಣಿಃ ಸೌಂದರ್ಯಮುದ್ರಾಮಣಿಃ |'}
              line3={'ಯಃ ಕಾಂತಾಮಣಿರುಕ್ಮಿಣೀಘನಕುಚದ್ವಂದ್ವೈಕಭೂಷಾಮಣಿಃ'}
              line4={'ಶ್ರೇಯೋ ದೇವಶಿಖಾಮಣಿರ್ದಿಶತು ನೋ ಗೋಪಾಲಚೂಡಾಮಣಿಃ || ೨೨ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಶತ್ರುಚ್ಛೇದೈಕಮಂತ್ರಂ ಸಕಲಮುಪನಿಷದ್ವಾಕ್ಯಸಂಪೂಜ್ಯಮಂತ್ರಂ'}
              line2={'ಸಂಸಾರೋತ್ತಾರಮಂತ್ರಂ ಸಮುಚಿತತಮಸಃ ಸಂಘನಿರ್ಯಾಣಮಂತ್ರಮ್ |'}
              line3={'ಸರ್ವೈಶ್ವರ್ಯೈಕಮಂತ್ರಂ ವ್ಯಸನಭುಜಗಸಂದಷ್ಟಸಂತ್ರಾಣಮಂತ್ರಂ'}
              line4={'ಜಿಹ್ವೇ ಶ್ರೀಕೃಷ್ಣಮಂತ್ರಂ ಜಪ ಜಪ ಸತತಂ ಜನ್ಮಸಾಫಲ್ಯಮಂತ್ರಮ್ || ೨೩ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ವ್ಯಾಮೋಹ ಪ್ರಶಮೌಷದಂ ಮುನಿಮನೋವೃತ್ತಿ ಪ್ರವೃತ್ತ್ಯೌಷಧಂ'}
              line2={'ದೈತ್ಯೇಂದ್ರಾರ್ತಿಕರೌಷಧಂ ತ್ರಿಭುವನೀ ಸಂಜೀವನೈ ಕೌಷಧಮ್ |'}
              line3={'ಭಕ್ತಾತ್ಯನ್ತಹಿತೌಷಧಂ ಭವಭಯಪ್ರಧ್ವಂಸನೈ ಕೌಷಧಂ'}
              line4={'ಶ್ರೇಯಃಪ್ರಾಪ್ತಿಕರೌಷಧಂ ಪಿಬ ಮನಃ ಶ್ರೀಕೃಷ್ಣದಿವ್ಯೌಷಧಮ್ || ೨೪ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಮ್ನಾಯಾಭ್ಯಸನಾನ್ಯರಣ್ಯರುದಿತಂ ವೇದವ್ರತಾನ್ಯನ್ವಹಂ'}
              line2={'ಮೇದಶ್ಛೇದಫಲಾನಿ ಪೂರ್ತವಿಧಯಃ ಸರ್ವೇ ಹುತಂ ಭಸ್ಮನಿ |'}
              line3={'ತೀರ್ಥಾನಾಮವಗಾಹನಾನಿ ಚ ಗಜಸ್ನಾನಂ ವಿನಾ ಯತ್ಪದ-'}
              line4={'ದ್ವಂದ್ವಾಮ್ಭೋರುಹಸಂಸ್ಮೃತಿರ್ವಿಜಯತೇ ದೇವಃ ಸ ನಾರಾಯಣಃ || ೨೫ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀಮನ್ನಾಮ ಪ್ರೋಚ್ಯ ನಾರಾಯಣಾಖ್ಯಂ'}
              line2={'ಕೇನ ಪ್ರಾಪುರ್ವಾಂಛಿತಂ ಪಾಪಿನೋಽಪಿ |'}
              line3={'ಹಾ ನಃ ಪೂರ್ವಂ ವಾಕ್ಪ್ರವೃತ್ತಾ ನ ತಸ್ಮಿನ್'}
              line4={'ತೇನ ಪ್ರಾಪ್ತಂ ಗರ್ಭವಾಸಾದಿದುಃಖಮ್ || ೨೬ ||'}
            />


            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಜ್ಜನ್ಮನಃ ಫಲಮಿದಂ ಮಧುಕೈಟಭಾರೇ'}
              line2={'ಮತ್ಪ್ರಾರ್ಥನೀಯ ಮದನುಗ್ರಹ ಏಷ ಏವ |'}
              line3={'ತ್ವದ್ಭೃತ್ಯಭೃತ್ಯಪರಿಚಾರಕಭೃತ್ಯಭೃತ್ಯ-'}
              line4={'ಭೃತ್ಯಸ್ಯ ಭೃತ್ಯ ಇತಿ ಮಾಂ ಸ್ಮರ ಲೋಕನಾಥ || ೨೭ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ನಾಥೇ ನಃ ಪುರುಷೋತ್ತಮೇ ತ್ರಿಜಗತಾಮೇಕಾಧಿಪೇ ಚೇತಸಾ'}
              line2={'ಸೇವ್ಯೇ ಸ್ವಸ್ಯ ಪದಸ್ಯ ದಾತರಿ ಸುರೇ ನಾರಾಯಣೇ ತಿಷ್ಠತಿ |'}
              line3={'ಯಂ ಕಂಚಿತ್ಪುರುಷಾಧಮಂ ಕತಿಪಯಗ್ರಾಮೇಶಮಲ್ಪಾರ್ಥದಂ'}
              line4={'ಸೇವಾಯೈ ಮೃಗಯಾಮಹೇ ನರಮಹೋ ಮೂಢಾ ವರಾಕಾ ವಯಮ್ || ೨೮ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಮದನ ಪರಿಹರ ಸ್ಥಿತಿಂ ಮದೀಯೇ'}
              line2={'ಮನಸಿ ಮುಕುಂದಪದಾರವಿಂದಧಾಮ್ನಿ |'}
              line3={'ಹರನಯನಕೃಶಾನುನಾ ಕೃಶೋಽಸಿ'}
              line4={'ಸ್ಮರಸಿ ನ ಚಕ್ರಪರಾಕ್ರಮಂ ಮುರಾರೇಃ || ೨೯ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ತತ್ತ್ವಂ ಬ್ರುವಾಣಾನಿ ಪರಂ ಪರಸ್ಮಾತ್'}
              line2={'ಮಧು ಕ್ಷರನ್ತೀವ ಸತಾಂ ಫಲಾನಿ |'}
              line3={'ಪ್ರಾವರ್ತಯ ಪ್ರಾಂಜಲಿರಸ್ಮಿ ಜಿಹ್ವೇ'}
              line4={'ನಾಮಾನಿ ನಾರಾಯಣ ಗೋಚರಾಣಿ || ೩೦ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಇದಂ ಶರೀರಂ ಪರಿಣಾಮಪೇಶಲಂ'}
              line2={'ಪತತ್ಯವಶ್ಯಂ ಶ್ಲಥಸಂಧಿ ಜರ್ಜರಮ್ |'}
              line3={'ಕಿಮೌಷಧೈಃ ಕ್ಲಿಶ್ಯಸಿ ಮೂಢ ದುರ್ಮತೇ'}
              line4={'ನಿರಾಮಯಂ ಕೃಷ್ಣರಸಾಯನಂ ಪಿಬ || ೩೧ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ದಾರಾ ವಾರಾಕರವರಸುತಾ ತೇ ತನೂಜೋ ವಿರಿಂಚಿಃ'}
              line2={'ಸ್ತೋತಾ ವೇದಸ್ತವ ಸುರಗಣೋ ಭೃತ್ಯವರ್ಗಃ ಪ್ರಸಾದಃ |'}
              line3={'ಮುಕ್ತಿರ್ಮಾಯಾ ಜಗದವಿಕಲಂ ತಾವಕೀ ದೇವಕೀ ತೇ'}
              line4={'ಮಾತಾ ಮಿತ್ರಂ ಬಲರಿಪುಸುತಸ್ತ್ವಯ್ಯತೋಽನ್ಯನ್ನಜಾನೇ || ೩೨ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಕೃಷ್ಣೋ ರಕ್ಷತು ನೋ ಜಗತ್ತ್ರಯಗುರುಃ ಕೃಷ್ಣಂ ನಮಸ್ಯಾಮ್ಯಹಂ'}
              line2={'ಕೃಷ್ಣೇ ನಾಮರಶತ್ರವೋ ವಿನಿಹತಾಃ ಕೃಷ್ಣಾಯ ತುಭ್ಯಂ ನಮಃ |'}
              line3={'ಕೃಷ್ಣಾದೇವ ಸಮುತ್ಥಿತಂ ಜಗದಿದಂ ಕೃಷ್ಣಸ್ಯ ದಾಸೋಽಸ್ಮ್ಯಹಂ'}
              line4={'ಕೃಷ್ಣೇ ತಿಷ್ಠತಿ ಸರ್ವಮೇತದಖಿಲಂ ಹೇ ಕೃಷ್ಣ ರಕ್ಷಸ್ವ ಮಾಮ್ || ೩೩ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ತತ್ತ್ವಂ ಪ್ರಸೀದ ಭಗವನ್ ಕುರು ಮಯ್ಯನಾಥೇ'}
              line2={'ವಿಷ್ಣೋ ಕೃಪಾಂ ಪರಮಕಾರುಣಿಕಃ ಖಿಲ ತ್ವಮ್ |'}
              line3={'ಸಂಸಾರಸಾಗರನಿಮಗ್ನಮನಂತ ದೀನ-'}
              line4={'ಮುದ್ಧರ್ತುಮರ್ಹಸಿ ಹರೇ ಪುರುಷೋತ್ತಮೋಽಸಿ || ೩೪ ||'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನಮಾಮಿ ನಾರಾಯಣಪಾದಪಂಕಜಂ'}
              line2={'ಕರೋಮಿ ನಾರಾಯಣಪೂಜನಂ ಸದಾ |'}
              line3={'ವದಾಮಿ ನಾರಾಯಣನಾಮ ನಿರ್ಮಲಂ'}
              line4={'ಸ್ಮರಾಮಿ ನಾರಾಯಣತತ್ತ್ವಮವ್ಯಯಮ್ || ೩೫ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀನಾಥ ನಾರಾಯಣ ವಾಸುದೇವ'}
              line2={'ಶ್ರೀಕೃಷ್ಣ ಭಕ್ತಪ್ರಿಯ ಚಕ್ರಪಾಣೇ |'}
              line3={'ಶ್ರೀಪದ್ಮನಾಭಾಚ್ಯುತ ಕೈಟಭಾರೇ'}
              line4={'ಶ್ರೀರಾಮ ಪದ್ಮಾಕ್ಷ ಹರೇ ಮುರಾರೇ || ೩೬ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಅನಂತ ವೈಕುಂಠ ಮುಕುಂದ ಕೃಷ್ಣ'}
              line2={'ಗೋವಿಂದ ದಾಮೋದರ ಮಾಧವೇತಿ |'}
              line3={'ವಕ್ತುಂ ಸಮರ್ಥೋಽಪಿ ನ ವಕ್ತಿ ಕಶ್ಚಿತ್'}
              line4={'ಅಹೋ ಜನಾನಾಂ ವ್ಯಸನಾಭಿಮುಖ್ಯಮ್ || ೩೭ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಧ್ಯಾಯಂತಿ ಯೇ ವಿಷ್ಣುಮನಂತಮವ್ಯಯಂ'}
              line2={'ಹೃತ್ಪದ್ಮಮಧ್ಯೇ ಸತತಂ ವ್ಯವಸ್ಥಿತಮ್ |'}
              line3={'ಸಮಾಹಿತಾನಾಂ ಸತತಾಭಯಪ್ರದಂ'}
              line4={'ತೇ ಯಾಂತಿ ಸಿದ್ಧಿಂ ಪರಮಾಂ ಚ ವೈಷ್ಣವೀಮ್ || ೩೮ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಕ್ಷೀರಸಾಗರತರಂಗಶೀಕರಾ &#8211;'}
              line2={'ಸಾರತಾರಕಿತಚಾರುಮೂರ್ತಯೇ |'}
              line3={'ಭೋಗಿಭೋಗಶಯನೀಯಶಾಯಿನೇ'}
              line4={'ಮಾಧವಾಯ ಮಧುವಿದ್ವಿಷೇ ನಮಃ || ೩೯ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಯಸ್ಯ ಪ್ರಿಯೌ ಶ್ರುತಿಧರೌ ಕವಿಲೋಕವೀರೌ'}
              line2={'ಮಿತ್ರೌ ದ್ವಿಜನ್ಮಪದಪದ್ಮಶರಾವಭೂತಾಮ್ |'}
              line3={'ತೇನಾಂಬುಜಾಕ್ಷಚರಣಾಂಬುಜಷಟ್ಪದೇನ'}
              line4={'ರಾಜ್ಞಾ ಕೃತಾ ಕೃತಿರಿಯಂ ಕುಲಶೇಖರೇಣ || ೪೦ ||'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಕುಂಭೇಪುನರ್ವಸೌಜಾತಂ ಕೇರಳೇ ಚೋಳಪಟ್ಟಣೇ |'}
              line2={'ಕೌಸ್ತುಭಾಂಶಂ ಧರಾಧೀಶಂ ಕುಲಶೇಖರಮಾಶ್ರಯೇ ||'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಇತಿ ಮುಕುಂದಮಾಲಾ ಸಂಪೂರ್ಣಾ ||'}
            />

          </View>
        </ScrollView>
        <Admob
          type={'banner'}
          unitId={Adhelper.GenerateId()}
        />
      </React.Fragment>
    </View>

  );
};


export default MukundaMala;
