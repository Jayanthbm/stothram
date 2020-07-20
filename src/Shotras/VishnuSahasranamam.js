/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Switch, BackHandler, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';
import Header from '../Components/Header';
import St from '../Components/St';
import Admob from '../Components/Admob';
import * as Adhelper from '../Constants/AdUnits';

const VishnuSahasranamam = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(null);
  const [darkmode, setDarkMode] = useState(null);
  const [showToggle, setShowToggle] = useState(null);
  const backgroundColor = darkmode ? '#000' : '#fff';
  const textColor = darkmode ? '#fff' : '#000';

  const [font, setFont] = useState(24);
  const storeData = async (value) => {
    try {
      let v = value ? 'true' : 'false';
      await AsyncStorage.setItem('@darkmode', v);
    } catch (e) { }
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
    } catch (e) { }
  };

  useEffect(() => {
    getData();
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
          title="ಶ್ರೀ ವಿಷ್ಣು ಸಹಸ್ರ ನಾಮ ಸ್ತೋತ್ರಮ್"
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
            height: 20,
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
              line1={'ಓಂ ಶುಕ್ಲಾಂಬರಧರಂ ವಿಷ್ಣುಂ ಶಶಿವರ್ಣಂ ಚತುರ್ಭುಜಮ್ |'}
              line2={'ಪ್ರಸನ್ನವದನಂ ಧ್ಯಾಯೇತ್ ಸರ್ವವಿಘ್ನೋಪಶಾಂತಯೇ ‖ 1 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯಸ್ಯದ್ವಿರದವಕ್ತ್ರಾದ್ಯಾಃ ಪಾರಿಷದ್ಯಾಃ ಪರಃ ಶತಮ್ |'}
              line2={'ಪವಿಘ್ನಂ ನಿಘ್ನಂತಿ ಸತತಂ ವಿಷ್ವಕ್ಸೇನಂ ತಮಾಶ್ರಯೇ ‖ 2 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪೂರ್ವ ಪೀಠಿಕಾ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವ್ಯಾಸಂ ವಸಿಷ್ಠ ನಪ್ತಾರಂ ಶಕ್ತೇಃ ಪೌತ್ರಮಕಲ್ಮಷಂ |'}
              line2={'ಪರಾಶರಾತ್ಮಜಂ ವಂದೇ ಶುಕತಾತಂ ತಪೋನಿಧಿಂ ‖ 3 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವ್ಯಾಸಾಯ ವಿಷ್ಣು ರೂಪಾಯ ವ್ಯಾಸರೂಪಾಯ ವಿಷ್ಣವೇ |'}
              line2={'ನಮೋ ವೈ ಬ್ರಹ್ಮನಿಧಯೇ ವಾಸಿಷ್ಠಾಯ ನಮೋ ನಮಃ ‖ 4 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅವಿಕಾರಾಯ ಶುದ್ಧಾಯ ನಿತ್ಯಾಯ ಪರಮಾತ್ಮನೇ |'}
              line2={'ಸದೈಕ ರೂಪ ರೂಪಾಯ ವಿಷ್ಣವೇ ಸರ್ವಜಿಷ್ಣವೇ ‖ 5 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯಸ್ಯ ಸ್ಮರಣಮಾತ್ರೇಣ ಜನ್ಮಸಂಸಾರಬಂಧನಾತ್ |'}
              line2={'ವಿಮುಚ್ಯತೇ ನಮಸ್ತಸ್ಮೈ ವಿಷ್ಣವೇ ಪ್ರಭವಿಷ್ಣವೇ ‖ 6 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಓಂ ನಮೋ ವಿಷ್ಣವೇ ಪ್ರಭವಿಷ್ಣವೇ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀ ವೈಶಂಪಾಯನ ಉವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರುತ್ವಾ ಧರ್ಮಾ ನಶೇಷೇಣ ಪಾವನಾನಿ ಚ ಸರ್ವಶಃ |'}
              line2={'ಯುಧಿಷ್ಠಿರಃ ಶಾಂತನವಂ ಪುನರೇವಾಭ್ಯ ಭಾಷತ ‖ 7 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯುಧಿಷ್ಠಿರ ಉವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕಿಮೇಕಂ ದೈವತಂ ಲೋಕೇ ಕಿಂ ವಾಽಪ್ಯೇಕಂ ಪರಾಯಣಂ'}
              line2={'ಸ್ತುವಂತಃ ಕಂ ಕಮರ್ಚಂತಃ ಪ್ರಾಪ್ನುಯುರ್ಮಾನವಾಃ ಶುಭಮ್ ‖ 8 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕೋ ಧರ್ಮಃ ಸರ್ವಧರ್ಮಾಣಾಂ ಭವತಃ ಪರಮೋ ಮತಃ |'}
              line2={'ಕಿಂ ಜಪನ್ಮುಚ್ಯತೇ ಜಂತುರ್ಜನ್ಮಸಂಸಾರ ಬಂಧನಾತ್ ‖ 9 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀ ಭೀಷ್ಮ ಉವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಜಗತ್ಪ್ರಭುಂ ದೇವದೇವ ಮನಂತಂ ಪುರುಷೋತ್ತಮಂ |'}
              line2={'ಸ್ತುವನ್ನಾಮ ಸಹಸ್ರೇಣ ಪುರುಷಃ ಸತತೋತ್ಥಿತಃ ‖ 10 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ತಮೇವ ಚಾರ್ಚಯನ್ನಿತ್ಯಂ ಭಕ್ತ್ಯಾ ಪುರುಷಮವ್ಯಯಂ |'}
              line2={'ಧ್ಯಾಯನ್ ಸ್ತುವನ್ನಮಸ್ಯಂಶ್ಚ ಯಜಮಾನಸ್ತಮೇವ ಚ ‖ 11 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅನಾದಿ ನಿಧನಂ ವಿಷ್ಣುಂ ಸರ್ವಲೋಕ ಮಹೇಶ್ವರಂ |'}
              line2={'ಲೋಕಾಧ್ಯಕ್ಷಂ ಸ್ತುವನ್ನಿತ್ಯಂ ಸರ್ವ ದುಃಖಾತಿಗೋ ಭವೇತ್ ‖ 12 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಬ್ರಹ್ಮಣ್ಯಂ ಸರ್ವ ಧರ್ಮಜ್ಞಂ ಲೋಕಾನಾಂ ಕೀರ್ತಿ ವರ್ಧನಂ |'}
              line2={'ಲೋಕನಾಥಂ ಮಹದ್ಭೂತಂ ಸರ್ವಭೂತ ಭವೋದ್ಭವಮ್‖ 13 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಏಷ ಮೇ ಸರ್ವ ಧರ್ಮಾಣಾಂ ಧರ್ಮೋಽಧಿಕ ತಮೋಮತಃ |'}
              line2={'ಯದ್ಭಕ್ತ್ಯಾ ಪುಂಡರೀಕಾಕ್ಷಂ ಸ್ತವೈರರ್ಚೇನ್ನರಃ ಸದಾ ‖ 14 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪರಮಂ ಯೋ ಮಹತ್ತೇಜಃ ಪರಮಂ ಯೋ ಮಹತ್ತಪಃ |'}
              line2={'ಪರಮಂ ಯೋ ಮಹದ್ಬ್ರಹ್ಮ ಪರಮಂ ಯಃ ಪರಾಯಣಮ್ | 15 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪವಿತ್ರಾಣಾಂ ಪವಿತ್ರಂ ಯೋ ಮಂಗಳಾನಾಂ ಚ ಮಂಗಳಂ |'}
              line2={'ದೈವತಂ ದೇವತಾನಾಂ ಚ ಭೂತಾನಾಂ ಯೋಽವ್ಯಯಃ ಪಿತಾ ‖ 16 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯತಃ ಸರ್ವಾಣಿ ಭೂತಾನಿ ಭವಂತ್ಯಾದಿ ಯುಗಾಗಮೇ |'}
              line2={'ಯಸ್ಮಿಂಶ್ಚ ಪ್ರಲಯಂ ಯಾಂತಿ ಪುನರೇವ ಯುಗಕ್ಷಯೇ ‖ 17 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ತಸ್ಯ ಲೋಕ ಪ್ರಧಾನಸ್ಯ ಜಗನ್ನಾಥಸ್ಯ ಭೂಪತೇ |'}
              line2={'ವಿಷ್ಣೋರ್ನಾಮ ಸಹಸ್ರಂ ಮೇ ಶ್ರುಣು ಪಾಪ ಭಯಾಪಹಮ್ ‖ 18 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯಾನಿ ನಾಮಾನಿ ಗೌಣಾನಿ ವಿಖ್ಯಾತಾನಿ ಮಹಾತ್ಮನಃ |'}
              line2={'ಋಷಿಭಿಃ ಪರಿಗೀತಾನಿ ತಾನಿ ವಕ್ಷ್ಯಾಮಿ ಭೂತಯೇ ‖ 19 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಋಷಿರ್ನಾಮ್ನಾಂ ಸಹಸ್ರಸ್ಯ ವೇದವ್ಯಾಸೋ ಮಹಾಮುನಿಃ ‖'}
              line2={'ಛಂದೋಽನುಷ್ಟುಪ್ ತಥಾ ದೇವೋ ಭಗವಾನ್ ದೇವಕೀಸುತಃ ‖ 20 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಮೃತಾಂ ಶೂದ್ಭವೋ ಬೀಜಂ ಶಕ್ತಿರ್ದೇವಕಿನಂದನಃ |'}
              line2={'ತ್ರಿಸಾಮಾ ಹೃದಯಂ ತಸ್ಯ ಶಾಂತ್ಯರ್ಥೇ ವಿನಿಯುಜ್ಯತೇ ‖ 21 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಿಷ್ಣುಂ ಜಿಷ್ಣುಂ ಮಹಾವಿಷ್ಣುಂ ಪ್ರಭವಿಷ್ಣುಂ ಮಹೇಶ್ವರಂ ‖'}
              line2={'ಅನೇಕರೂಪ ದೈತ್ಯಾಂತಂ ನಮಾಮಿ ಪುರುಷೋತ್ತಮಮ್ ‖ 22 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪೂರ್ವನ್ಯಾಸಃ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಸ್ಯ ಶ್ರೀ ವಿಷ್ಣೋರ್ದಿವ್ಯ ಸಹಸ್ರನಾಮ ಸ್ತೋತ್ರ ಮಹಾಮಂತ್ರಸ್ಯ ‖'}
              line2={'ಶ್ರೀ ವೇದವ್ಯಾಸೋ ಭಗವಾನ್ ಋಷಿಃ |'}
              line3={'ಅನುಷ್ಟುಪ್ ಛಂದಃ |'}
              line4={'ಶ್ರೀಮಹಾವಿಷ್ಣುಃ ಪರಮಾತ್ಮಾ ಶ್ರೀಮನ್ನಾರಾಯಣೋ ದೇವತಾ |'}
              line5={'ಅಮೃತಾಂಶೂದ್ಭವೋ ಭಾನುರಿತಿ ಬೀಜಂ |'}
              line6={'ದೇವಕೀನಂದನಃ ಸ್ರಷ್ಟೇತಿ ಶಕ್ತಿಃ |'}
              line7={'ಉದ್ಭವಃ, ಕ್ಷೋಭಣೋ ದೇವ ಇತಿ ಪರಮೋಮಂತ್ರಃ |'}
              line8={'ಶಂಖಭೃನ್ನಂದಕೀ ಚಕ್ರೀತಿ ಕೀಲಕಮ್ |'}
              line9={'ಶಾರಂಗಧನ್ವಾ ಗದಾಧರ ಇತ್ಯಸ್ತ್ರಮ್ |'}
              line10={'ರಥಾಂಗಪಾಣಿ ರಕ್ಷೋಭ್ಯ ಇತಿ ನೇತ್ರಂ |'}
              line11={'ತ್ರಿಸಾಮಾಸಾಮಗಃ ಸಾಮೇತಿ ಕವಚಮ್ |'}
              line12={'ಆನಂದಂ ಪರಬ್ರಹ್ಮೇತಿ ಯೋನಿಃ |'}
              line13={'ಋತುಸ್ಸುದರ್ಶನಃ ಕಾಲ ಇತಿ ದಿಗ್ಬಂಧಃ ‖'}
              line14={'ಶ್ರೀವಿಶ್ವರೂಪ ಇತಿ ಧ್ಯಾನಂ |'}
              line15={'ಶ್ರೀ ಮಹಾವಿಷ್ಣು ಪ್ರೀತ್ಯರ್ಥೇ ಸಹಸ್ರನಾಮ ಜಪೇ ಪಾರಾಯಣೇ ವಿನಿಯೋಗಃ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕರನ್ಯಾಸಃ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಿಶ್ವಂ ವಿಷ್ಣುರ್ವಷಟ್ಕಾರ ಇತ್ಯಂಗುಷ್ಠಾಭ್ಯಾಂ ನಮಃ'}
              line2={'ಅಮೃತಾಂ ಶೂದ್ಭವೋ ಭಾನುರಿತಿ ತರ್ಜನೀಭ್ಯಾಂ ನಮಃ'}
              line3={'ಬ್ರಹ್ಮಣ್ಯೋ ಬ್ರಹ್ಮಕೃತ್ ಬ್ರಹ್ಮೇತಿ ಮಧ್ಯಮಾಭ್ಯಾಂ ನಮಃ'}
              line4={'ಸುವರ್ಣಬಿಂದು ರಕ್ಷೋಭ್ಯ ಇತಿ ಅನಾಮಿಕಾಭ್ಯಾಂ ನಮಃ'}
              line5={'ನಿಮಿಷೋಽನಿಮಿಷಃ ಸ್ರಗ್ವೀತಿ ಕನಿಷ್ಠಿಕಾಭ್ಯಾಂ ನಮಃ'}
              line6={'ರಥಾಂಗಪಾಣಿ ರಕ್ಷೋಭ್ಯ ಇತಿ ಕರತಲ ಕರಪೃಷ್ಠಾಭ್ಯಾಂ ನಮಃ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಂಗನ್ಯಾಸಃ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುವ್ರತಃ ಸುಮುಖಃ ಸೂಕ್ಷ್ಮ ಇತಿ ಜ್ಞಾನಾಯ ಹೃದಯಾಯ ನಮಃ'}
              line2={'ಸಹಸ್ರಮೂರ್ತಿಃ ವಿಶ್ವಾತ್ಮಾ ಇತಿ ಐಶ್ವರ್ಯಾಯ ಶಿರಸೇ ಸ್ವಾಹಾ'}
              line3={'ಸಹಸ್ರಾರ್ಚಿಃ ಸಪ್ತಜಿಹ್ವ ಇತಿ ಶಕ್ತ್ಯೈ ಶಿಖಾಯೈ ವಷಟ್'}
              line4={'ತ್ರಿಸಾಮಾ ಸಾಮಗಸ್ಸಾಮೇತಿ ಬಲಾಯ ಕವಚಾಯ ಹುಂ'}
              line5={'ರಥಾಂಗಪಾಣಿ ರಕ್ಷೋಭ್ಯ ಇತಿ ನೇತ್ರಾಭ್ಯಾಂ ವೌಷಟ್'}
              line6={'ಶಾಂಗಧನ್ವಾ ಗದಾಧರ ಇತಿ ವೀರ್ಯಾಯ ಅಸ್ತ್ರಾಯಫಟ್'}
              line7={'ಋತುಃ ಸುದರ್ಶನಃ ಕಾಲ ಇತಿ ದಿಗ್ಭಂಧಃ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಧ್ಯಾನಮ್'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕ್ಷೀರೋಧನ್ವತ್ಪ್ರದೇಶೇ ಶುಚಿಮಣಿವಿಲಸತ್ಸೈಕತೇಮೌಕ್ತಿಕಾನಾಂ'}
              line2={'ಮಾಲಾಕ್ಲುಪ್ತಾಸನಸ್ಥಃ ಸ್ಫಟಿಕಮಣಿನಿಭೈರ್ಮೌಕ್ತಿಕೈರ್ಮಂಡಿತಾಂಗಃ |'}
              line3={'ಶುಭ್ರೈರಭ್ರೈರದಭ್ರೈರುಪರಿವಿರಚಿತೈರ್ಮುಕ್ತಪೀಯೂಷ ವರ್ಷೈಃ'}
              line4={'ಆನಂದೀ ನಃ ಪುನೀಯಾದರಿನಲಿನಗದಾ ಶಂಖಪಾಣಿರ್ಮುಕುಂದಃ ‖ 1 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭೂಃ ಪಾದೌ ಯಸ್ಯ ನಾಭಿರ್ವಿಯದಸುರನಿಲಶ್ಚಂದ್ರ ಸೂರ್ಯೌ ಚ ನೇತ್ರೇ'}
              line2={'ಕರ್ಣಾವಾಶಾಃ ಶಿರೋದ್ಯೌರ್ಮುಖಮಪಿ ದಹನೋ ಯಸ್ಯ ವಾಸ್ತೇಯಮಬ್ಧಿಃ |'}
              line3={'ಅಂತಃಸ್ಥಂ ಯಸ್ಯ ವಿಶ್ವಂ ಸುರ ನರಖಗಗೋಭೋಗಿಗಂಧರ್ವದೈತ್ಯೈಃ'}
              line4={'ಚಿತ್ರಂ ರಂ ರಮ್ಯತೇ ತಂ ತ್ರಿಭುವನ ವಪುಶಂ ವಿಷ್ಣುಮೀಶಂ ನಮಾಮಿ ‖ 2 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಓಂ ನಮೋ ಭಗವತೇ ವಾಸುದೇವಾಯ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶಾಂತಾಕಾರಂ ಭುಜಗಶಯನಂ ಪದ್ಮನಾಭಂ ಸುರೇಶಂ'}
              line2={'ವಿಶ್ವಾಧಾರಂ ಗಗನಸದೃಶಂ ಮೇಘವರ್ಣಂ ಶುಭಾಂಗಮ್ |'}
              line3={'ಲಕ್ಷ್ಮೀಕಾಂತಂ ಕಮಲನಯನಂ ಯೋಗಿಹೃರ್ಧ್ಯಾನಗಮ್ಯಮ್'}
              line4={'ವಂದೇ ವಿಷ್ಣುಂ ಭವಭಯಹರಂ ಸರ್ವಲೋಕೈಕನಾಥಮ್ ‖ 3 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮೇಘಶ್ಯಾಮಂ ಪೀತಕೌಶೇಯವಾಸಂ'}
              line2={'ಶ್ರೀವತ್ಸಾಕಂ ಕೌಸ್ತುಭೋದ್ಭಾಸಿತಾಂಗಮ್ |'}
              line3={'ಪುಣ್ಯೋಪೇತಂ ಪುಂಡರೀಕಾಯತಾಕ್ಷಂ'}
              line4={'ವಿಷ್ಣುಂ ವಂದೇ ಸರ್ವಲೋಕೈಕನಾಥಮ್ ‖ 4 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನಮಃ ಸಮಸ್ತ ಭೂತಾನಾಂ ಆದಿ ಭೂತಾಯ ಭೂಭೃತೇ |'}
              line2={'ಅನೇಕರೂಪ ರೂಪಾಯ ವಿಷ್ಣವೇ ಪ್ರಭವಿಷ್ಣವೇ ‖ 5‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸಶಂಖಚಕ್ರಂ ಸಕಿರೀಟಕುಂಡಲಂ'}
              line2={'ಸಪೀತವಸ್ತ್ರಂ ಸರಸೀರುಹೇಕ್ಷಣಂ |'}
              line3={'ಸಹಾರ ವಕ್ಷಃಸ್ಥಲ ಶೋಭಿ ಕೌಸ್ತುಭಂ'}
              line4={'ನಮಾಮಿ ವಿಷ್ಣುಂ ಶಿರಸಾ ಚತುರ್ಭುಜಮ್ | 6‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಛಾಯಾಯಾಂ ಪಾರಿಜಾತಸ್ಯ ಹೇಮಸಿಂಹಾಸನೋಪರಿ'}
              line2={'ಆಸೀನಮಂಬುದಶ್ಯಾಮಮಾಯತಾಕ್ಷಮಲಂಕೃತಮ್ ‖ 7 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಚಂದ್ರಾನನಂ ಚತುರ್ಬಾಹುಂ ಶ್ರೀವತ್ಸಾಂಕಿತ ವಕ್ಷಸಮ್'}
              line2={'ರುಕ್ಮಿಣೀ ಸತ್ಯಭಾಮಾಭ್ಯಾಂ ಸಹಿತಂ ಕೃಷ್ಣಮಾಶ್ರಯೇ ‖ 8 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪಂಚಪೂಜ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಲಂ - ಪೃಥಿವ್ಯಾತ್ಮನೇ ಗಂಥಂ ಸಮರ್ಪಯಾಮಿ'}
              line2={'ಹಂ - ಆಕಾಶಾತ್ಮನೇ ಪುಷ್ಪೈಃ ಪೂಜಯಾಮಿ'}
              line3={'ಯಂ - ವಾಯ್ವಾತ್ಮನೇ ಧೂಪಮಾಘ್ರಾಪಯಾಮಿ'}
              line4={'ರಂ - ಅಗ್ನ್ಯಾತ್ಮನೇ ದೀಪಂ ದರ್ಶಯಾಮಿ'}
              line5={'ವಂ - ಅಮೃತಾತ್ಮನೇ ನೈವೇದ್ಯಂ ನಿವೇದಯಾಮಿ'}
              line6={'ಸಂ - ಸರ್ವಾತ್ಮನೇ ಸರ್ವೋಪಚಾರ ಪೂಜಾ ನಮಸ್ಕಾರಾನ್ '}
              line7={'ಸಮರ್ಪಯಾಮಿ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸ್ತೋತ್ರಮ್'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಹರಿಃ ಓಮ್'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಿಶ್ವಂ ವಿಷ್ಣುರ್ವಷಟ್ಕಾರೋ ಭೂತಭವ್ಯಭವತ್ಪ್ರಭುಃ |'}
              line2={'ಭೂತಕೃದ್ಭೂತಭೃದ್ಭಾವೋ ಭೂತಾತ್ಮಾ ಭೂತಭಾವನಃ ‖ 1 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪೂತಾತ್ಮಾ ಪರಮಾತ್ಮಾ ಚ ಮುಕ್ತಾನಾಂ ಪರಮಾಗತಿಃ |'}
              line2={'ಅವ್ಯಯಃ ಪುರುಷಃ ಸಾಕ್ಷೀ ಕ್ಷೇತ್ರಜ್ಞೋಽಕ್ಷರ ಏವ ಚ ‖ 2 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯೋಗೋ ಯೋಗವಿದಾಂ ನೇತಾ ಪ್ರಧಾನ ಪುರುಷೇಶ್ವರಃ |'}
              line2={'ನಾರಸಿಂಹವಪುಃ ಶ್ರೀಮಾನ್ ಕೇಶವಃ ಪುರುಷೋತ್ತಮಃ ‖ 3 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸರ್ವಃ ಶರ್ವಃ ಶಿವಃ ಸ್ಥಾಣುರ್ಭೂತಾದಿರ್ನಿಧಿರವ್ಯಯಃ |'}
              line2={'ಸಂಭವೋ ಭಾವನೋ ಭರ್ತಾ ಪ್ರಭವಃ ಪ್ರಭುರೀಶ್ವರಃ ‖ 4 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸ್ವಯಂಭೂಃ ಶಂಭುರಾದಿತ್ಯಃ ಪುಷ್ಕರಾಕ್ಷೋ ಮಹಾಸ್ವನಃ |'}
              line2={'ಅನಾದಿನಿಧನೋ ಧಾತಾ ವಿಧಾತಾ ಧಾತುರುತ್ತಮಃ ‖ 5 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಪ್ರಮೇಯೋ ಹೃಷೀಕೇಶಃ ಪದ್ಮನಾಭೋಽಮರಪ್ರಭುಃ |'}
              line2={'ವಿಶ್ವಕರ್ಮಾ ಮನುಸ್ತ್ವಷ್ಟಾ ಸ್ಥವಿಷ್ಠಃ ಸ್ಥವಿರೋ ಧ್ರುವಃ ‖ 6 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಗ್ರಾಹ್ಯಃ ಶಾಶ್ವತೋ ಕೃಷ್ಣೋ ಲೋಹಿತಾಕ್ಷಃ ಪ್ರತರ್ದನಃ |'}
              line2={'ಪ್ರಭೂತಸ್ತ್ರಿಕಕುಬ್ಧಾಮ ಪವಿತ್ರಂ ಮಂಗಳಂ ಪರಮ್ ‖ 7 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಈಶಾನಃ ಪ್ರಾಣದಃ ಪ್ರಾಣೋ ಜ್ಯೇಷ್ಠಃ ಶ್ರೇಷ್ಠಃ ಪ್ರಜಾಪತಿಃ |'}
              line2={'ಹಿರಣ್ಯಗರ್ಭೋ ಭೂಗರ್ಭೋ ಮಾಧವೋ ಮಧುಸೂದನಃ ‖ 8 ‖'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಈಶ್ವರೋ ವಿಕ್ರಮೀಧನ್ವೀ ಮೇಧಾವೀ ವಿಕ್ರಮಃ ಕ್ರಮಃ |'}
              line2={'ಅನುತ್ತಮೋ ದುರಾಧರ್ಷಃ ಕೃತಜ್ಞಃ ಕೃತಿರಾತ್ಮವಾನ್‖ 9 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುರೇಶಃ ಶರಣಂ ಶರ್ಮ ವಿಶ್ವರೇತಾಃ ಪ್ರಜಾಭವಃ |'}
              line2={'ಅಹಸ್ಸಂವತ್ಸರೋ ವ್ಯಾಳಃ ಪ್ರತ್ಯಯಃ ಸರ್ವದರ್ಶನಃ ‖ 10 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಜಸ್ಸರ್ವೇಶ್ವರಃ ಸಿದ್ಧಃ ಸಿದ್ಧಿಃ ಸರ್ವಾದಿರಚ್ಯುತಃ |'}
              line2={'ವೃಷಾಕಪಿರಮೇಯಾತ್ಮಾ ಸರ್ವಯೋಗವಿನಿಸ್ಸೃತಃ ‖ 11 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಸುರ್ವಸುಮನಾಃ ಸತ್ಯಃ ಸಮಾತ್ಮಾ ಸಮ್ಮಿತಸ್ಸಮಃ |'}
              line2={'ಅಮೋಘಃ ಪುಂಡರೀಕಾಕ್ಷೋ ವೃಷಕರ್ಮಾ ವೃಷಾಕೃತಿಃ ‖ 12 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ರುದ್ರೋ ಬಹುಶಿರಾ ಬಭ್ರುರ್ವಿಶ್ವಯೋನಿಃ ಶುಚಿಶ್ರವಾಃ |'}
              line2={'ಅಮೃತಃ ಶಾಶ್ವತಸ್ಥಾಣುರ್ವರಾರೋಹೋ ಮಹಾತಪಾಃ ‖ 13 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸರ್ವಗಃ ಸರ್ವ ವಿದ್ಭಾನುರ್ವಿಷ್ವಕ್ಸೇನೋ ಜನಾರ್ದನಃ |'}
              line2={'ವೇದೋ ವೇದವಿದವ್ಯಂಗೋ ವೇದಾಂಗೋ ವೇದವಿತ್ಕವಿಃ ‖ 14 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಲೋಕಾಧ್ಯಕ್ಷಃ ಸುರಾಧ್ಯಕ್ಷೋ ಧರ್ಮಾಧ್ಯಕ್ಷಃ ಕೃತಾಕೃತಃ |'}
              line2={'ಚತುರಾತ್ಮಾ ಚತುರ್ವ್ಯೂಹಶ್ಚತುರ್ದಂಷ್ಟ್ರಶ್ಚತುರ್ಭುಜಃ ‖ 15 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭ್ರಾಜಿಷ್ಣುರ್ಭೋಜನಂ ಭೋಕ್ತಾ ಸಹಿಷ್ನುರ್ಜಗದಾದಿಜಃ |'}
              line2={'ಅನಘೋ ವಿಜಯೋ ಜೇತಾ ವಿಶ್ವಯೋನಿಃ ಪುನರ್ವಸುಃ ‖ 16 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಉಪೇಂದ್ರೋ ವಾಮನಃ ಪ್ರಾಂಶುರಮೋಘಃ ಶುಚಿರೂರ್ಜಿತಃ |'}
              line2={'ಅತೀಂದ್ರಃ ಸಂಗ್ರಹಃ ಸರ್ಗೋ ಧೃತಾತ್ಮಾ ನಿಯಮೋ ಯಮಃ ‖ 17 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವೇದ್ಯೋ ವೈದ್ಯಃ ಸದಾಯೋಗೀ ವೀರಹಾ ಮಾಧವೋ ಮಧುಃ |'}
              line2={'ಅತೀಂದ್ರಿಯೋ ಮಹಾಮಾಯೋ ಮಹೋತ್ಸಾಹೋ ಮಹಾಬಲಃ ‖ 18 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಹಾಬುದ್ಧಿರ್ಮಹಾವೀರ್ಯೋ ಮಹಾಶಕ್ತಿರ್ಮಹಾದ್ಯುತಿಃ |'}
              line2={'ಅನಿರ್ದೇಶ್ಯವಪುಃ ಶ್ರೀಮಾನಮೇಯಾತ್ಮಾ ಮಹಾದ್ರಿಧೃಕ್ ‖ 19 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಹೇಶ್ವಾಸೋ ಮಹೀಭರ್ತಾ ಶ್ರೀನಿವಾಸಃ ಸತಾಂಗತಿಃ |'}
              line2={'ಅನಿರುದ್ಧಃ ಸುರಾನಂದೋ ಗೋವಿಂದೋ ಗೋವಿದಾಂ ಪತಿಃ ‖ 20 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮರೀಚಿರ್ದಮನೋ ಹಂಸಃ ಸುಪರ್ಣೋ ಭುಜಗೋತ್ತಮಃ |'}
              line2={'ಹಿರಣ್ಯನಾಭಃ ಸುತಪಾಃ ಪದ್ಮನಾಭಃ ಪ್ರಜಾಪತಿಃ ‖ 21 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಮೃತ್ಯುಃ ಸರ್ವದೃಕ್ ಸಿಂಹಃ ಸಂಧಾತಾ ಸಂಧಿಮಾನ್ ಸ್ಥಿರಃ |'}
              line2={'ಅಜೋ ದುರ್ಮರ್ಷಣಃ ಶಾಸ್ತಾ ವಿಶ್ರುತಾತ್ಮಾ ಸುರಾರಿಹಾ ‖ 22 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಗುರುರ್ಗುರುತಮೋ ಧಾಮ ಸತ್ಯಃ ಸತ್ಯಪರಾಕ್ರಮಃ |'}
              line2={'ನಿಮಿಷೋಽನಿಮಿಷಃ ಸ್ರಗ್ವೀ ವಾಚಸ್ಪತಿರುದಾರಧೀಃ ‖ 23 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಗ್ರಣೀಗ್ರಾಮಣೀಃ ಶ್ರೀಮಾನ್ ನ್ಯಾಯೋ ನೇತಾ ಸಮೀರಣಃ'}
              line2={'ಸಹಸ್ರಮೂರ್ಧಾ ವಿಶ್ವಾತ್ಮಾ ಸಹಸ್ರಾಕ್ಷಃ ಸಹಸ್ರಪಾತ್ ‖ 24 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಆವರ್ತನೋ ನಿವೃತ್ತಾತ್ಮಾ ಸಂವೃತಃ ಸಂಪ್ರಮರ್ದನಃ |'}
              line2={'ಅಹಃ ಸಂವರ್ತಕೋ ವಹ್ನಿರನಿಲೋ ಧರಣೀಧರಃ ‖ 25 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುಪ್ರಸಾದಃ ಪ್ರಸನ್ನಾತ್ಮಾ ವಿಶ್ವಧೃಗ್ವಿಶ್ವಭುಗ್ವಿಭುಃ |'}
              line2={'ಸತ್ಕರ್ತಾ ಸತ್ಕೃತಃ ಸಾಧುರ್ಜಹ್ನುರ್ನಾರಾಯಣೋ ನರಃ ‖ 26 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಸಂಖ್ಯೇಯೋಽಪ್ರಮೇಯಾತ್ಮಾ ವಿಶಿಷ್ಟಃ ಶಿಷ್ಟಕೃಚ್ಛುಚಿಃ |'}
              line2={'ಸಿದ್ಧಾರ್ಥಃ ಸಿದ್ಧಸಂಕಲ್ಪಃ ಸಿದ್ಧಿದಃ ಸಿದ್ಧಿ ಸಾಧನಃ ‖ 27 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವೃಷಾಹೀ ವೃಷಭೋ ವಿಷ್ಣುರ್ವೃಷಪರ್ವಾ ವೃಷೋದರಃ |'}
              line2={'ವರ್ಧನೋ ವರ್ಧಮಾನಶ್ಚ ವಿವಿಕ್ತಃ ಶ್ರುತಿಸಾಗರಃ ‖ 28 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುಭುಜೋ ದುರ್ಧರೋ ವಾಗ್ಮೀ ಮಹೇಂದ್ರೋ ವಸುದೋ ವಸುಃ |'}
              line2={'ನೈಕರೂಪೋ ಬೃಹದ್ರೂಪಃ ಶಿಪಿವಿಷ್ಟಃ ಪ್ರಕಾಶನಃ ‖ 29 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಓಜಸ್ತೇಜೋದ್ಯುತಿಧರಃ ಪ್ರಕಾಶಾತ್ಮಾ ಪ್ರತಾಪನಃ |'}
              line2={'ಋದ್ದಃ ಸ್ಪಷ್ಟಾಕ್ಷರೋ ಮಂತ್ರಶ್ಚಂದ್ರಾಂಶುರ್ಭಾಸ್ಕರದ್ಯುತಿಃ ‖ 30 ‖'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಮೃತಾಂಶೂದ್ಭವೋ ಭಾನುಃ ಶಶಬಿಂದುಃ ಸುರೇಶ್ವರಃ |'}
              line2={'ಔಷಧಂ ಜಗತಃ ಸೇತುಃ ಸತ್ಯಧರ್ಮಪರಾಕ್ರಮಃ ‖ 31 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭೂತಭವ್ಯಭವನ್ನಾಥಃ ಪವನಃ ಪಾವನೋಽನಲಃ |'}
              line2={'ಕಾಮಹಾ ಕಾಮಕೃತ್ಕಾಂತಃ ಕಾಮಃ ಕಾಮಪ್ರದಃ ಪ್ರಭುಃ ‖ 32 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯುಗಾದಿ ಕೃದ್ಯುಗಾವರ್ತೋ ನೈಕಮಾಯೋ ಮಹಾಶನಃ |'}
              line2={'ಅದೃಶ್ಯೋ ವ್ಯಕ್ತರೂಪಶ್ಚ ಸಹಸ್ರಜಿದನಂತಜಿತ್ ‖ 33 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಇಷ್ಟೋಽವಿಶಿಷ್ಟಃ ಶಿಷ್ಟೇಷ್ಟಃ ಶಿಖಂಡೀ ನಹುಷೋ ವೃಷಃ |'}
              line2={'ಕ್ರೋಧಹಾ ಕ್ರೋಧಕೃತ್ಕರ್ತಾ ವಿಶ್ವಬಾಹುರ್ಮಹೀಧರಃ ‖ 34 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಚ್ಯುತಃ ಪ್ರಥಿತಃ ಪ್ರಾಣಃ ಪ್ರಾಣದೋ ವಾಸವಾನುಜಃ |'}
              line2={'ಅಪಾಂನಿಧಿರಧಿಷ್ಠಾನಮಪ್ರಮತ್ತಃ ಪ್ರತಿಷ್ಠಿತಃ ‖ 35 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸ್ಕಂದಃ ಸ್ಕಂದಧರೋ ಧುರ್ಯೋ ವರದೋ ವಾಯುವಾಹನಃ |'}
              line2={'ವಾಸುದೇವೋ ಬೃಹದ್ಭಾನುರಾದಿದೇವಃ ಪುರಂಧರಃ ‖ 36 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಶೋಕಸ್ತಾರಣಸ್ತಾರಃ ಶೂರಃ ಶೌರಿರ್ಜನೇಶ್ವರಃ |'}
              line2={'ಅನುಕೂಲಃ ಶತಾವರ್ತಃ ಪದ್ಮೀ ಪದ್ಮನಿಭೇಕ್ಷಣಃ ‖ 37 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪದ್ಮನಾಭೋಽರವಿಂದಾಕ್ಷಃ ಪದ್ಮಗರ್ಭಃ ಶರೀರಭೃತ್ |'}
              line2={'ಮಹರ್ಧಿರೃದ್ಧೋ ವೃದ್ಧಾತ್ಮಾ ಮಹಾಕ್ಷೋ ಗರುಡಧ್ವಜಃ ‖ 38 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅತುಲಃ ಶರಭೋ ಭೀಮಃ ಸಮಯಜ್ಞೋ ಹವಿರ್ಹರಿಃ |'}
              line2={'ಸರ್ವಲಕ್ಷಣಲಕ್ಷಣ್ಯೋ ಲಕ್ಷ್ಮೀವಾನ್ ಸಮಿತಿಂಜಯಃ ‖ 39 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಿಕ್ಷರೋ ರೋಹಿತೋ ಮಾರ್ಗೋ ಹೇತುರ್ದಾಮೋದರಃ ಸಹಃ |'}
              line2={'ಮಹೀಧರೋ ಮಹಾಭಾಗೋ ವೇಗವಾನಮಿತಾಶನಃ ‖ 40 ‖'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಉದ್ಭವಃ, ಕ್ಷೋಭಣೋ ದೇವಃ ಶ್ರೀಗರ್ಭಃ ಪರಮೇಶ್ವರಃ |'}
              line2={'ಕರಣಂ ಕಾರಣಂ ಕರ್ತಾ ವಿಕರ್ತಾ ಗಹನೋ ಗುಹಃ ‖ 41 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವ್ಯವಸಾಯೋ ವ್ಯವಸ್ಥಾನಃ ಸಂಸ್ಥಾನಃ ಸ್ಥಾನದೋ ಧ್ರುವಃ |'}
              line2={'ಪರರ್ಧಿಃ ಪರಮಸ್ಪಷ್ಟಃ ತುಷ್ಟಃ ಪುಷ್ಟಃ ಶುಭೇಕ್ಷಣಃ ‖ 42 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ರಾಮೋ ವಿರಾಮೋ ವಿರಜೋ ಮಾರ್ಗೋನೇಯೋ ನಯೋಽನಯಃ |'}
              line2={'ವೀರಃ ಶಕ್ತಿಮತಾಂ ಶ್ರೇಷ್ಠೋ ಧರ್ಮೋಧರ್ಮ ವಿದುತ್ತಮಃ ‖ 43 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವೈಕುಂಠಃ ಪುರುಷಃ ಪ್ರಾಣಃ ಪ್ರಾಣದಃ ಪ್ರಣವಃ ಪೃಥುಃ |'}
              line2={'ಹಿರಣ್ಯಗರ್ಭಃ ಶತ್ರುಘ್ನೋ ವ್ಯಾಪ್ತೋ ವಾಯುರಧೋಕ್ಷಜಃ ‖ 44 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಋತುಃ ಸುದರ್ಶನಃ ಕಾಲಃ ಪರಮೇಷ್ಠೀ ಪರಿಗ್ರಹಃ |'}
              line2={'ಉಗ್ರಃ ಸಂವತ್ಸರೋ ದಕ್ಷೋ ವಿಶ್ರಾಮೋ ವಿಶ್ವದಕ್ಷಿಣಃ ‖ 45 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಿಸ್ತಾರಃ ಸ್ಥಾವರ ಸ್ಥಾಣುಃ ಪ್ರಮಾಣಂ ಬೀಜಮವ್ಯಯಂ |'}
              line2={'ಅರ್ಥೋಽನರ್ಥೋ ಮಹಾಕೋಶೋ ಮಹಾಭೋಗೋ ಮಹಾಧನಃ ‖ 46 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅನಿರ್ವಿಣ್ಣಃ ಸ್ಥವಿಷ್ಠೋ ಭೂದ್ಧರ್ಮಯೂಪೋ ಮಹಾಮಖಃ |'}
              line2={'ನಕ್ಷತ್ರನೇಮಿರ್ನಕ್ಷತ್ರೀ ಕ್ಷಮಃ, ಕ್ಷಾಮಃ ಸಮೀಹನಃ ‖ 47 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯಜ್ಞ ಇಜ್ಯೋ ಮಹೇಜ್ಯಶ್ಚ ಕ್ರತುಃ ಸತ್ರಂ ಸತಾಂಗತಿಃ |'}
              line2={'ಸರ್ವದರ್ಶೀ ವಿಮುಕ್ತಾತ್ಮಾ ಸರ್ವಜ್ಞೋ ಜ್ಞಾನಮುತ್ತಮಂ ‖ 48 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುವ್ರತಃ ಸುಮುಖಃ ಸೂಕ್ಷ್ಮಃ ಸುಘೋಷಃ ಸುಖದಃ ಸುಹೃತ್ |'}
              line2={'ಮನೋಹರೋ ಜಿತಕ್ರೋಧೋ ವೀರ ಬಾಹುರ್ವಿದಾರಣಃ ‖ 49 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸ್ವಾಪನಃ ಸ್ವವಶೋ ವ್ಯಾಪೀ ನೈಕಾತ್ಮಾ ನೈಕಕರ್ಮಕೃತ್| |'}
              line2={'ವತ್ಸರೋ ವತ್ಸಲೋ ವತ್ಸೀ ರತ್ನಗರ್ಭೋ ಧನೇಶ್ವರಃ ‖ 50 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಧರ್ಮಗುಬ್ಧರ್ಮಕೃದ್ಧರ್ಮೀ ಸದಸತ್ಕ್ಷರಮಕ್ಷರಮ್‖'}
              line2={'ಅವಿಜ್ಞಾತಾ ಸಹಸ್ತ್ರಾಂಶುರ್ವಿಧಾತಾ ಕೃತಲಕ್ಷಣಃ ‖ 51 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಗಭಸ್ತಿನೇಮಿಃ ಸತ್ತ್ವಸ್ಥಃ ಸಿಂಹೋ ಭೂತ ಮಹೇಶ್ವರಃ |'}
              line2={'ಆದಿದೇವೋ ಮಹಾದೇವೋ ದೇವೇಶೋ ದೇವಭೃದ್ಗುರುಃ ‖ 52 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಉತ್ತರೋ ಗೋಪತಿರ್ಗೋಪ್ತಾ ಜ್ಞಾನಗಮ್ಯಃ ಪುರಾತನಃ |'}
              line2={'ಶರೀರ ಭೂತಭೃದ್ ಭೋಕ್ತಾ ಕಪೀಂದ್ರೋ ಭೂರಿದಕ್ಷಿಣಃ ‖ 53 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸೋಮಪೋಽಮೃತಪಃ ಸೋಮಃ ಪುರುಜಿತ್ ಪುರುಸತ್ತಮಃ |'}
              line2={'ವಿನಯೋ ಜಯಃ ಸತ್ಯಸಂಧೋ ದಾಶಾರ್ಹಃ ಸಾತ್ವತಾಂ ಪತಿಃ ‖ 54 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಜೀವೋ ವಿನಯಿತಾ ಸಾಕ್ಷೀ ಮುಕುಂದೋಽಮಿತ ವಿಕ್ರಮಃ |'}
              line2={'ಅಂಭೋನಿಧಿರನಂತಾತ್ಮಾ ಮಹೋದಧಿ ಶಯೋಂತಕಃ ‖ 55 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಜೋ ಮಹಾರ್ಹಃ ಸ್ವಾಭಾವ್ಯೋ ಜಿತಾಮಿತ್ರಃ ಪ್ರಮೋದನಃ |'}
              line2={'ಆನಂದೋಽನಂದನೋನಂದಃ ಸತ್ಯಧರ್ಮಾ ತ್ರಿವಿಕ್ರಮಃ ‖ 56 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಹರ್ಷಿಃ ಕಪಿಲಾಚಾರ್ಯಃ ಕೃತಜ್ಞೋ ಮೇದಿನೀಪತಿಃ |'}
              line2={'ತ್ರಿಪದಸ್ತ್ರಿದಶಾಧ್ಯಕ್ಷೋ ಮಹಾಶೃಂಗಃ ಕೃತಾಂತಕೃತ್ ‖ 57 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಹಾವರಾಹೋ ಗೋವಿಂದಃ ಸುಷೇಣಃ ಕನಕಾಂಗದೀ |'}
              line2={'ಗುಹ್ಯೋ ಗಭೀರೋ ಗಹನೋ ಗುಪ್ತಶ್ಚಕ್ರ ಗದಾಧರಃ ‖ 58 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವೇಧಾಃ ಸ್ವಾಂಗೋಽಜಿತಃ ಕೃಷ್ಣೋ ದೃಢಃ ಸಂಕರ್ಷಣೋಽಚ್ಯುತಃ |'}
              line2={'ವರುಣೋ ವಾರುಣೋ ವೃಕ್ಷಃ ಪುಷ್ಕರಾಕ್ಷೋ ಮಹಾಮನಾಃ ‖ 59 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭಗವಾನ್ ಭಗಹಾಽಽನಂದೀ ವನಮಾಲೀ ಹಲಾಯುಧಃ |'}
              line2={'ಆದಿತ್ಯೋ ಜ್ಯೋತಿರಾದಿತ್ಯಃ ಸಹಿಷ್ಣುರ್ಗತಿಸತ್ತಮಃ ‖ 60 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುಧನ್ವಾ ಖಂಡಪರಶುರ್ದಾರುಣೋ ದ್ರವಿಣಪ್ರದಃ |'}
              line2={'ದಿವಃಸ್ಪೃಕ್ ಸರ್ವದೃಗ್ವ್ಯಾಸೋ ವಾಚಸ್ಪತಿರಯೋನಿಜಃ ‖ 61 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ತ್ರಿಸಾಮಾ ಸಾಮಗಃ ಸಾಮ ನಿರ್ವಾಣಂ ಭೇಷಜಂ ಭಿಷಕ್ |'}
              line2={'ಸನ್ಯಾಸಕೃಚ್ಛಮಃ ಶಾಂತೋ ನಿಷ್ಠಾ ಶಾಂತಿಃ ಪರಾಯಣಮ್| 62 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶುಭಾಂಗಃ ಶಾಂತಿದಃ ಸ್ರಷ್ಟಾ ಕುಮುದಃ ಕುವಲೇಶಯಃ |'}
              line2={'ಗೋಹಿತೋ ಗೋಪತಿರ್ಗೋಪ್ತಾ ವೃಷಭಾಕ್ಷೋ ವೃಷಪ್ರಿಯಃ ‖ 63 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅನಿವರ್ತೀ ನಿವೃತ್ತಾತ್ಮಾ ಸಂಕ್ಷೇಪ್ತಾ ಕ್ಷೇಮಕೃಚ್ಛಿವಃ |'}
              line2={'ಶ್ರೀವತ್ಸವಕ್ಷಾಃ ಶ್ರೀವಾಸಃ ಶ್ರೀಪತಿಃ ಶ್ರೀಮತಾಂವರಃ ‖ 64 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀದಃ ಶ್ರೀಶಃ ಶ್ರೀನಿವಾಸಃ ಶ್ರೀನಿಧಿಃ ಶ್ರೀವಿಭಾವನಃ |'}
              line2={'ಶ್ರೀಧರಃ ಶ್ರೀಕರಃ ಶ್ರೇಯಃ ಶ್ರೀಮಾಂಲ್ಲೋಕತ್ರಯಾಶ್ರಯಃ ‖ 65 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸ್ವಕ್ಷಃ ಸ್ವಂಗಃ ಶತಾನಂದೋ ನಂದಿರ್ಜ್ಯೋತಿರ್ಗಣೇಶ್ವರಃ |'}
              line2={'ವಿಜಿತಾತ್ಮಾಽವಿಧೇಯಾತ್ಮಾ ಸತ್ಕೀರ್ತಿಚ್ಛಿನ್ನಸಂಶಯಃ ‖ 66 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಉದೀರ್ಣಃ ಸರ್ವತಶ್ಚಕ್ಷುರನೀಶಃ ಶಾಶ್ವತಸ್ಥಿರಃ |'}
              line2={'ಭೂಶಯೋ ಭೂಷಣೋ ಭೂತಿರ್ವಿಶೋಕಃ ಶೋಕನಾಶನಃ ‖ 67 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅರ್ಚಿಷ್ಮಾನರ್ಚಿತಃ ಕುಂಭೋ ವಿಶುದ್ಧಾತ್ಮಾ ವಿಶೋಧನಃ |'}
              line2={'ಅನಿರುದ್ಧೋಽಪ್ರತಿರಥಃ ಪ್ರದ್ಯುಮ್ನೋಽಮಿತವಿಕ್ರಮಃ ‖ 68 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕಾಲನೇಮಿನಿಹಾ ವೀರಃ ಶೌರಿಃ ಶೂರಜನೇಶ್ವರಃ |'}
              line2={'ತ್ರಿಲೋಕಾತ್ಮಾ ತ್ರಿಲೋಕೇಶಃ ಕೇಶವಃ ಕೇಶಿಹಾ ಹರಿಃ ‖ 69 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕಾಮದೇವಃ ಕಾಮಪಾಲಃ ಕಾಮೀ ಕಾಂತಃ ಕೃತಾಗಮಃ |'}
              line2={'ಅನಿರ್ದೇಶ್ಯವಪುರ್ವಿಷ್ಣುರ್ವೀರೋಽನಂತೋ ಧನಂಜಯಃ ‖ 70 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಬ್ರಹ್ಮಣ್ಯೋ ಬ್ರಹ್ಮಕೃದ್ ಬ್ರಹ್ಮಾ ಬ್ರಹ್ಮ ಬ್ರಹ್ಮವಿವರ್ಧನಃ |'}
              line2={'ಬ್ರಹ್ಮವಿದ್ ಬ್ರಾಹ್ಮಣೋ ಬ್ರಹ್ಮೀ ಬ್ರಹ್ಮಜ್ಞೋ ಬ್ರಾಹ್ಮಣಪ್ರಿಯಃ ‖ 71 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಹಾಕ್ರಮೋ ಮಹಾಕರ್ಮಾ ಮಹಾತೇಜಾ ಮಹೋರಗಃ |'}
              line2={'ಮಹಾಕ್ರತುರ್ಮಹಾಯಜ್ವಾ ಮಹಾಯಜ್ಞೋ ಮಹಾಹವಿಃ ‖ 72 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸ್ತವ್ಯಃ ಸ್ತವಪ್ರಿಯಃ ಸ್ತೋತ್ರಂ ಸ್ತುತಿಃ ಸ್ತೋತಾ ರಣಪ್ರಿಯಃ |'}
              line2={'ಪೂರ್ಣಃ ಪೂರಯಿತಾ ಪುಣ್ಯಃ ಪುಣ್ಯಕೀರ್ತಿರನಾಮಯಃ ‖ 73 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮನೋಜವಸ್ತೀರ್ಥಕರೋ ವಸುರೇತಾ ವಸುಪ್ರದಃ |'}
              line2={'ವಸುಪ್ರದೋ ವಾಸುದೇವೋ ವಸುರ್ವಸುಮನಾ ಹವಿಃ ‖ 74 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸದ್ಗತಿಃ ಸತ್ಕೃತಿಃ ಸತ್ತಾ ಸದ್ಭೂತಿಃ ಸತ್ಪರಾಯಣಃ |'}
              line2={'ಶೂರಸೇನೋ ಯದುಶ್ರೇಷ್ಠಃ ಸನ್ನಿವಾಸಃ ಸುಯಾಮುನಃ ‖ 75 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭೂತಾವಾಸೋ ವಾಸುದೇವಃ ಸರ್ವಾಸುನಿಲಯೋಽನಲಃ |'}
              line2={'ದರ್ಪಹಾ ದರ್ಪದೋ ದೃಪ್ತೋ ದುರ್ಧರೋಽಥಾಪರಾಜಿತಃ ‖ 76 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಿಶ್ವಮೂರ್ತಿರ್ಮಹಾಮೂರ್ತಿರ್ದೀಪ್ತಮೂರ್ತಿರಮೂರ್ತಿಮಾನ್ |'}
              line2={'ಅನೇಕಮೂರ್ತಿರವ್ಯಕ್ತಃ ಶತಮೂರ್ತಿಃ ಶತಾನನಃ ‖ 77 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಏಕೋ ನೈಕಃ ಸವಃ ಕಃ ಕಿಂ ಯತ್ತತ್ ಪದಮನುತ್ತಮಂ |'}
              line2={'ಲೋಕಬಂಧುರ್ಲೋಕನಾಥೋ ಮಾಧವೋ ಭಕ್ತವತ್ಸಲಃ ‖ 78 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುವರ್ಣವರ್ಣೋ ಹೇಮಾಂಗೋ ವರಾಂಗಶ್ಚಂದನಾಂಗದೀ |'}
              line2={'ವೀರಹಾ ವಿಷಮಃ ಶೂನ್ಯೋ ಘೃತಾಶೀರಚಲಶ್ಚಲಃ ‖ 79 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಮಾನೀ ಮಾನದೋ ಮಾನ್ಯೋ ಲೋಕಸ್ವಾಮೀ ತ್ರಿಲೋಕಧೃಕ್ |'}
              line2={'ಸುಮೇಧಾ ಮೇಧಜೋ ಧನ್ಯಃ ಸತ್ಯಮೇಧಾ ಧರಾಧರಃ ‖ 80 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ತೇಜೋಽವೃಷೋ ದ್ಯುತಿಧರಃ ಸರ್ವಶಸ್ತ್ರಭೃತಾಂವರಃ |'}
              line2={'ಪ್ರಗ್ರಹೋ ನಿಗ್ರಹೋ ವ್ಯಗ್ರೋ ನೈಕಶೃಂಗೋ ಗದಾಗ್ರಜಃ ‖ 81 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಚತುರ್ಮೂರ್ತಿ ಶ್ಚತುರ್ಬಾಹು ಶ್ಚತುರ್ವ್ಯೂಹ ಶ್ಚತುರ್ಗತಿಃ '}
              line2={'ಚತುರಾತ್ಮಾ ಚತುರ್ಭಾವಶ್ಚತುರ್ವೇದವಿದೇಕಪಾತ್ ‖ 82 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸಮಾವರ್ತೋಽನಿವೃತ್ತಾತ್ಮಾ ದುರ್ಜಯೋ ದುರತಿಕ್ರಮಃ |'}
              line2={'ದುರ್ಲಭೋ ದುರ್ಗಮೋ ದುರ್ಗೋ ದುರಾವಾಸೋ ದುರಾರಿಹಾ ‖ 83 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶುಭಾಂಗೋ ಲೋಕಸಾರಂಗಃ ಸುತಂತುಸ್ತಂತುವರ್ಧನಃ |'}
              line2={'ಇಂದ್ರಕರ್ಮಾ ಮಹಾಕರ್ಮಾ ಕೃತಕರ್ಮಾ ಕೃತಾಗಮಃ ‖ 84 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಉದ್ಭವಃ ಸುಂದರಃ ಸುಂದೋ ರತ್ನನಾಭಃ ಸುಲೋಚನಃ |'}
              line2={'ಅರ್ಕೋ ವಾಜಸನಃ ಶೃಂಗೀ ಜಯಂತಃ ಸರ್ವವಿಜ್ಜಯೀ ‖ 85 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುವರ್ಣಬಿಂದುರಕ್ಷೋಭ್ಯಃ ಸರ್ವವಾಗೀಶ್ವರೇಶ್ವರಃ |'}
              line2={'ಮಹಾಹೃದೋ ಮಹಾಗರ್ತೋ ಮಹಾಭೂತೋ ಮಹಾನಿಧಿಃ ‖ 86 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕುಮುದಃ ಕುಂದರಃ ಕುಂದಃ ಪರ್ಜನ್ಯಃ ಪಾವನೋಽನಿಲಃ |'}
              line2={'ಅಮೃತಾಶೋಽಮೃತವಪುಃ ಸರ್ವಜ್ಞಃ ಸರ್ವತೋಮುಖಃ ‖ 87 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುಲಭಃ ಸುವ್ರತಃ ಸಿದ್ಧಃ ಶತ್ರುಜಿಚ್ಛತ್ರುತಾಪನಃ |'}
              line2={'ನ್ಯಗ್ರೋಧೋಽದುಂಬರೋಽಶ್ವತ್ಥಶ್ಚಾಣೂರಾಂಧ್ರ ನಿಷೂದನಃ ‖ 88‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸಹಸ್ರಾರ್ಚಿಃ ಸಪ್ತಜಿಹ್ವಃ ಸಪ್ತೈಧಾಃ ಸಪ್ತವಾಹನಃ |'}
              line2={'ಅಮೂರ್ತಿರನಘೋಽಚಿಂತ್ಯೋ ಭಯಕೃದ್ಭಯನಾಶನಃ ‖ 89 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಣುರ್ಬೃಹತ್ಕೃಶಃ ಸ್ಥೂಲೋ ಗುಣಭೃನ್ನಿರ್ಗುಣೋ ಮಹಾನ್ |'}
              line2={'ಅಧೃತಃ ಸ್ವಧೃತಃ ಸ್ವಾಸ್ಯಃ ಪ್ರಾಗ್ವಂಶೋ ವಂಶವರ್ಧನಃ ‖ 90‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭಾರಭೃತ್ ಕಥಿತೋ ಯೋಗೀ ಯೋಗೀಶಃ ಸರ್ವಕಾಮದಃ |'}
              line2={'ಆಶ್ರಮಃ ಶ್ರಮಣಃ, ಕ್ಷಾಮಃ ಸುಪರ್ಣೋ ವಾಯುವಾಹನಃ ‖ 91 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಧನುರ್ಧರೋ ಧನುರ್ವೇದೋ ದಂಡೋ ದಮಯಿತಾ ದಮಃ |'}
              line2={'ಅಪರಾಜಿತಃ ಸರ್ವಸಹೋ ನಿಯಂತಾಽನಿಯಮೋಽಯಮಃ ‖ 92 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸತ್ತ್ವವಾನ್ ಸಾತ್ತ್ವಿಕಃ ಸತ್ಯಃ ಸತ್ಯಧರ್ಮಪರಾಯಣಃ |'}
              line2={'ಅಭಿಪ್ರಾಯಃ ಪ್ರಿಯಾರ್ಹೋಽರ್ಹಃ ಪ್ರಿಯಕೃತ್ ಪ್ರೀತಿವರ್ಧನಃ ‖ 93 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಿಹಾಯಸಗತಿರ್ಜ್ಯೋತಿಃ ಸುರುಚಿರ್ಹುತಭುಗ್ವಿಭುಃ |'}
              line2={'ರವಿರ್ವಿರೋಚನಃ ಸೂರ್ಯಃ ಸವಿತಾ ರವಿಲೋಚನಃ ‖ 94 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅನಂತೋ ಹುತಭುಗ್ಭೋಕ್ತಾ ಸುಖದೋ ನೈಕಜೋಽಗ್ರಜಃ |'}
              line2={'ಅನಿರ್ವಿಣ್ಣಃ ಸದಾಮರ್ಷೀ ಲೋಕಧಿಷ್ಠಾನಮದ್ಭುತಃ ‖ 95 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸನಾತ್ಸನಾತನತಮಃ ಕಪಿಲಃ ಕಪಿರವ್ಯಯಃ |'}
              line2={'ಸ್ವಸ್ತಿದಃ ಸ್ವಸ್ತಿಕೃತ್ಸ್ವಸ್ತಿಃ ಸ್ವಸ್ತಿಭುಕ್ ಸ್ವಸ್ತಿದಕ್ಷಿಣಃ ‖ 96 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅರೌದ್ರಃ ಕುಂಡಲೀ ಚಕ್ರೀ ವಿಕ್ರಮ್ಯೂರ್ಜಿತಶಾಸನಃ |'}
              line2={'ಶಬ್ದಾತಿಗಃ ಶಬ್ದಸಹಃ ಶಿಶಿರಃ ಶರ್ವರೀಕರಃ ‖ 97 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅಕ್ರೂರಃ ಪೇಶಲೋ ದಕ್ಷೋ ದಕ್ಷಿಣಃ, ಕ್ಷಮಿಣಾಂವರಃ |'}
              line2={'ವಿದ್ವತ್ತಮೋ ವೀತಭಯಃ ಪುಣ್ಯಶ್ರವಣಕೀರ್ತನಃ ‖ 98 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಉತ್ತಾರಣೋ ದುಷ್ಕೃತಿಹಾ ಪುಣ್ಯೋ ದುಃಸ್ವಪ್ನನಾಶನಃ |'}
              line2={'ವೀರಹಾ ರಕ್ಷಣಃ ಸಂತೋ ಜೀವನಃ ಪರ್ಯವಸ್ಥಿತಃ ‖ 99 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅನಂತರೂಪೋಽನಂತ ಶ್ರೀರ್ಜಿತಮನ್ಯುರ್ಭಯಾಪಹಃ |'}
              line2={'ಚತುರಶ್ರೋ ಗಭೀರಾತ್ಮಾ ವಿದಿಶೋ ವ್ಯಾದಿಶೋ ದಿಶಃ ‖ 100 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅನಾದಿರ್ಭೂರ್ಭುವೋ ಲಕ್ಷ್ಮೀಃ ಸುವೀರೋ ರುಚಿರಾಂಗದಃ |'}
              line2={'ಜನನೋ ಜನಜನ್ಮಾದಿರ್ಭೀಮೋ ಭೀಮಪರಾಕ್ರಮಃ ‖ 101 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಆಧಾರನಿಲಯೋಽಧಾತಾ ಪುಷ್ಪಹಾಸಃ ಪ್ರಜಾಗರಃ |'}
              line2={'ಊರ್ಧ್ವಗಃ ಸತ್ಪಥಾಚಾರಃ ಪ್ರಾಣದಃ ಪ್ರಣವಃ ಪಣಃ ‖ 102 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪ್ರಮಾಣಂ ಪ್ರಾಣನಿಲಯಃ ಪ್ರಾಣಭೃತ್ ಪ್ರಾಣಜೀವನಃ |'}
              line2={'ತತ್ತ್ವಂ ತತ್ತ್ವವಿದೇಕಾತ್ಮಾ ಜನ್ಮಮೃತ್ಯುಜರಾತಿಗಃ ‖ 103 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭೂರ್ಭುವಃ ಸ್ವಸ್ತರುಸ್ತಾರಃ ಸವಿತಾ ಪ್ರಪಿತಾಮಹಃ |'}
              line2={'ಯಜ್ಞೋ ಯಜ್ಞಪತಿರ್ಯಜ್ವಾ ಯಜ್ಞಾಂಗೋ ಯಜ್ಞವಾಹನಃ ‖ 104 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯಜ್ಞಭೃದ್ ಯಜ್ಞಕೃದ್ ಯಜ್ಞೀ ಯಜ್ಞಭುಕ್ ಯಜ್ಞಸಾಧನಃ |'}
              line2={'ಯಜ್ಞಾಂತಕೃದ್ ಯಜ್ಞಗುಹ್ಯಮನ್ನಮನ್ನಾದ ಏವ ಚ ‖ 105 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಆತ್ಮಯೋನಿಃ ಸ್ವಯಂಜಾತೋ ವೈಖಾನಃ ಸಾಮಗಾಯನಃ |'}
              line2={'ದೇವಕೀನಂದನಃ ಸ್ರಷ್ಟಾ ಕ್ಷಿತೀಶಃ ಪಾಪನಾಶನಃ ‖ 106 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶಂಖಭೃನ್ನಂದಕೀ ಚಕ್ರೀ ಶಾರಂಗಧನ್ವಾ ಗದಾಧರಃ |'}
              line2={'ರಥಾಂಗಪಾಣಿರಕ್ಷೋಭ್ಯಃ ಸರ್ವಪ್ರಹರಣಾಯುಧಃ ‖ 107 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀ ಸರ್ವಪ್ರಹರಣಾಯುಧ ಓಂ ನಮ ಇತಿ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವನಮಾಲೀ ಗದೀ ಶಾರಂಗೀ ಶಂಖೀ ಚಕ್ರೀ ಚ ನಂದಕೀ |'}
              line2={'ಶ್ರೀಮಾನ್ನಾರಾಯಣೋ ವಿಷ್ಣುರ್ವಾಸುದೇವೋಽಭಿರಕ್ಷತು ‖ 108 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀ ವಾಸುದೇವೋಽಭಿರಕ್ಷತು ಓಂ ನಮ ಇತಿ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಉತ್ತರ ಪೀಠಿಕಾ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಫಲಶ್ರುತಿಃ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಇತೀದಂ ಕೀರ್ತನೀಯಸ್ಯ ಕೇಶವಸ್ಯ ಮಹಾತ್ಮನಃ |'}
              line2={'ನಾಮ್ನಾಂ ಸಹಸ್ರಂ ದಿವ್ಯಾನಾಮಶೇಷೇಣ ಪ್ರಕೀರ್ತಿತಮ್| ‖ 1 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯ ಇದಂ ಶೃಣುಯಾನ್ನಿತ್ಯಂ ಯಶ್ಚಾಪಿ ಪರಿಕೀರ್ತಯೇತ್‖'}
              line2={'ನಾಶುಭಂ ಪ್ರಾಪ್ನುಯಾತ್ ಕಿಂಚಿತ್ಸೋಽಮುತ್ರೇಹ ಚ ಮಾನವಃ ‖ 2 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವೇದಾಂತಗೋ ಬ್ರಾಹ್ಮಣಃ ಸ್ಯಾತ್ ಕ್ಷತ್ರಿಯೋ ವಿಜಯೀ ಭವೇತ್ |'}
              line2={'ವೈಶ್ಯೋ ಧನಸಮೃದ್ಧಃ ಸ್ಯಾತ್ ಶೂದ್ರಃ ಸುಖಮವಾಪ್ನುಯಾತ್ ‖ 3 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಧರ್ಮಾರ್ಥೀ ಪ್ರಾಪ್ನುಯಾದ್ಧರ್ಮಮರ್ಥಾರ್ಥೀ ಚಾರ್ಥಮಾಪ್ನುಯಾತ್ |'}
              line2={'ಕಾಮಾನವಾಪ್ನುಯಾತ್ ಕಾಮೀ ಪ್ರಜಾರ್ಥೀ ಪ್ರಾಪ್ನುಯಾತ್ಪ್ರಜಾಮ್| ‖ 4 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭಕ್ತಿಮಾನ್ ಯಃ ಸದೋತ್ಥಾಯ ಶುಚಿಸ್ತದ್ಗತಮಾನಸಃ |'}
              line2={'ಸಹಸ್ರಂ ವಾಸುದೇವಸ್ಯ ನಾಮ್ನಾಮೇತತ್ ಪ್ರಕೀರ್ತಯೇತ್ ‖ 5 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯಶಃ ಪ್ರಾಪ್ನೋತಿ ವಿಪುಲಂ ಯಾತಿಪ್ರಾಧಾನ್ಯಮೇವ ಚ |'}
              line2={'ಅಚಲಾಂ ಶ್ರಿಯಮಾಪ್ನೋತಿ ಶ್ರೇಯಃ ಪ್ರಾಪ್ನೋತ್ಯನುತ್ತಮಮ್| ‖ 6 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನ ಭಯಂ ಕ್ವಚಿದಾಪ್ನೋತಿ ವೀರ್ಯಂ ತೇಜಶ್ಚ ವಿಂದತಿ |'}
              line2={'ಭವತ್ಯರೋಗೋ ದ್ಯುತಿಮಾನ್ ಬಲರೂಪ ಗುಣಾನ್ವಿತಃ ‖ 7 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ರೋಗಾರ್ತೋ ಮುಚ್ಯತೇ ರೋಗಾದ್ಬದ್ಧೋ ಮುಚ್ಯೇತ ಬಂಧನಾತ್ |'}
              line2={'ಭಯಾನ್ಮುಚ್ಯೇತ ಭೀತಸ್ತು ಮುಚ್ಯೇತಾಪನ್ನ ಆಪದಃ ‖ 8 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ದುರ್ಗಾಣ್ಯತಿತರತ್ಯಾಶು ಪುರುಷಃ ಪುರುಷೋತ್ತಮಮ್ |'}
              line2={'ಸ್ತುವನ್ನಾಮಸಹಸ್ರೇಣ ನಿತ್ಯಂ ಭಕ್ತಿಸಮನ್ವಿತಃ ‖ 9 ‖'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ವಾಸುದೇವಾಶ್ರಯೋ ಮರ್ತ್ಯೋ ವಾಸುದೇವಪರಾಯಣಃ |'}
              line2={'ಸರ್ವಪಾಪವಿಶುದ್ಧಾತ್ಮಾ ಯಾತಿ ಬ್ರಹ್ಮ ಸನಾತನಮ್| ‖ 10 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನ ವಾಸುದೇವ ಭಕ್ತಾನಾಮಶುಭಂ ವಿದ್ಯತೇ ಕ್ವಚಿತ್ |'}
              line2={'ಜನ್ಮಮೃತ್ಯುಜರಾವ್ಯಾಧಿಭಯಂ ನೈವೋಪಜಾಯತೇ ‖ 11 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಇಮಂ ಸ್ತವಮಧೀಯಾನಃ ಶ್ರದ್ಧಾಭಕ್ತಿಸಮನ್ವಿತಃ |'}
              line2={'ಯುಜ್ಯೇತಾತ್ಮ ಸುಖಕ್ಷಾಂತಿ ಶ್ರೀಧೃತಿ ಸ್ಮೃತಿ ಕೀರ್ತಿಭಿಃ ‖ 12 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನ ಕ್ರೋಧೋ ನ ಚ ಮಾತ್ಸರ್ಯಂ ನ ಲೋಭೋ ನಾಶುಭಾಮತಿಃ |'}
              line2={'ಭವಂತಿ ಕೃತಪುಣ್ಯಾನಾಂ ಭಕ್ತಾನಾಂ ಪುರುಷೋತ್ತಮೇ ‖ 13 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ದ್ಯೌಃ ಸಚಂದ್ರಾರ್ಕನಕ್ಷತ್ರಾ ಖಂ ದಿಶೋ ಭೂರ್ಮಹೋದಧಿಃ |'}
              line2={'ವಾಸುದೇವಸ್ಯ ವೀರ್ಯೇಣ ವಿಧೃತಾನಿ ಮಹಾತ್ಮನಃ ‖ 14 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸಸುರಾಸುರಗಂಧರ್ವಂ ಸಯಕ್ಷೋರಗರಾಕ್ಷಸಂ |'}
              line2={'ಜಗದ್ವಶೇ ವರ್ತತೇದಂ ಕೃಷ್ಣಸ್ಯ ಸ ಚರಾಚರಮ್| ‖ 15 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಇಂದ್ರಿಯಾಣಿ ಮನೋಬುದ್ಧಿಃ ಸತ್ತ್ವಂ ತೇಜೋ ಬಲಂ ಧೃತಿಃ |'}
              line2={'ವಾಸುದೇವಾತ್ಮಕಾನ್ಯಾಹುಃ, ಕ್ಷೇತ್ರಂ ಕ್ಷೇತ್ರಜ್ಞ ಏವ ಚ ‖ 16 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸರ್ವಾಗಮಾನಾಮಾಚಾರಃ ಪ್ರಥಮಂ ಪರಿಕಲ್ಪತೇ |'}
              line2={'ಆಚಾರಪ್ರಭವೋ ಧರ್ಮೋ ಧರ್ಮಸ್ಯ ಪ್ರಭುರಚ್ಯುತಃ ‖ 17 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಋಷಯಃ ಪಿತರೋ ದೇವಾ ಮಹಾಭೂತಾನಿ ಧಾತವಃ |'}
              line2={'ಜಂಗಮಾಜಂಗಮಂ ಚೇದಂ ಜಗನ್ನಾರಾಯಣೋದ್ಭವಂ ‖ 18 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯೋಗೋಜ್ಞಾನಂ ತಥಾ ಸಾಂಖ್ಯಂ ವಿದ್ಯಾಃ ಶಿಲ್ಪಾದಿಕರ್ಮ ಚ |'}
              line2={'ವೇದಾಃ ಶಾಸ್ತ್ರಾಣಿ ವಿಜ್ಞಾನಮೇತತ್ಸರ್ವಂ ಜನಾರ್ದನಾತ್ ‖ 19 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಏಕೋ ವಿಷ್ಣುರ್ಮಹದ್ಭೂತಂ ಪೃಥಗ್ಭೂತಾನ್ಯನೇಕಶಃ |'}
              line2={'ತ್ರೀಂಲೋಕಾನ್ವ್ಯಾಪ್ಯ ಭೂತಾತ್ಮಾ ಭುಂಕ್ತೇ ವಿಶ್ವಭುಗವ್ಯಯಃ ‖ 20 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಇಮಂ ಸ್ತವಂ ಭಗವತೋ ವಿಷ್ಣೋರ್ವ್ಯಾಸೇನ ಕೀರ್ತಿತಂ |'}
              line2={'ಪಠೇದ್ಯ ಇಚ್ಚೇತ್ಪುರುಷಃ ಶ್ರೇಯಃ ಪ್ರಾಪ್ತುಂ ಸುಖಾನಿ ಚ ‖ 21 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಿಶ್ವೇಶ್ವರಮಜಂ ದೇವಂ ಜಗತಃ ಪ್ರಭುಮವ್ಯಯಮ್|'}
              line2={'ಭಜಂತಿ ಯೇ ಪುಷ್ಕರಾಕ್ಷಂ ನ ತೇ ಯಾಂತಿ ಪರಾಭವಂ ‖ 22 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನ ತೇ ಯಾಂತಿ ಪರಾಭವಂ ಓಂ ನಮ ಇತಿ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅರ್ಜುನ ಉವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪದ್ಮಪತ್ರ ವಿಶಾಲಾಕ್ಷ ಪದ್ಮನಾಭ ಸುರೋತ್ತಮ |'}
              line2={'ಭಕ್ತಾನಾ ಮನುರಕ್ತಾನಾಂ ತ್ರಾತಾ ಭವ ಜನಾರ್ದನ ‖ 23 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀಭಗವಾನುವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯೋ ಮಾಂ ನಾಮಸಹಸ್ರೇಣ ಸ್ತೋತುಮಿಚ್ಛತಿ ಪಾಂಡವ |'}
              line2={'ಸೋಽಹಮೇಕೇನ ಶ್ಲೋಕೇನ ಸ್ತುತ ಏವ ನ ಸಂಶಯಃ ‖ 24 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸ್ತುತ ಏವ ನ ಸಂಶಯ ಓಂ ನಮ ಇತಿ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವ್ಯಾಸ ಉವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ವಾಸನಾದ್ವಾಸುದೇವಸ್ಯ ವಾಸಿತಂ ಭುವನತ್ರಯಮ್ |'}
              line2={'ಸರ್ವಭೂತನಿವಾಸೋಽಸಿ ವಾಸುದೇವ ನಮೋಽಸ್ತು ತೇ ‖ 25 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀವಾಸುದೇವ ನಮೋಸ್ತುತ ಓಂ ನಮ ಇತಿ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪಾರ್ವತ್ಯುವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕೇನೋಪಾಯೇನ ಲಘುನಾ ವಿಷ್ಣೋರ್ನಾಮಸಹಸ್ರಕಂ |'}
              line2={'ಪಠ್ಯತೇ ಪಂಡಿತೈರ್ನಿತ್ಯಂ ಶ್ರೋತುಮಿಚ್ಛಾಮ್ಯಹಂ ಪ್ರಭೋ ‖ 26 ‖'}
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'ಈಶ್ವರ ಉವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀರಾಮ ರಾಮ ರಾಮೇತಿ ರಮೇ ರಾಮೇ ಮನೋರಮೇ |'}
              line2={'ಸಹಸ್ರನಾಮ ತತ್ತುಲ್ಯಂ ರಾಮನಾಮ ವರಾನನೇ ‖ 27 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀರಾಮ ನಾಮ ವರಾನನ ಓಂ ನಮ ಇತಿ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಬ್ರಹ್ಮೋವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನಮೋಽಸ್ತ್ವನಂತಾಯ ಸಹಸ್ರಮೂರ್ತಯೇ '}
              line2={'ಸಹಸ್ರಪಾದಾಕ್ಷಿಶಿರೋರುಬಾಹವೇ |'}
              line3={'ಸಹಸ್ರನಾಮ್ನೇ ಪುರುಷಾಯ ಶಾಶ್ವತೇ ಸಹಸ್ರಕೋಟೀ ಯುಗಧಾರಿಣೇ ನಮಃ ‖ 28 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀ ಸಹಸ್ರಕೋಟೀ ಯುಗಧಾರಿಣೇ ನಮ ಓಂ ನಮ ಇತಿ |'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸಂಜಯ ಉವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಯತ್ರ ಯೋಗೇಶ್ವರಃ ಕೃಷ್ಣೋ ಯತ್ರ ಪಾರ್ಥೋ ಧನುರ್ಧರಃ |'}
              line2={'ತತ್ರ ಶ್ರೀರ್ವಿಜಯೋ ಭೂತಿರ್ಧ್ರುವಾ ನೀತಿರ್ಮತಿರ್ಮಮ ‖ 29 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀ ಭಗವಾನ್ ಉವಾಚ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಅನನ್ಯಾಶ್ಚಿಂತಯಂತೋ ಮಾಂ ಯೇ ಜನಾಃ ಪರ್ಯುಪಾಸತೇ |'}
              line2={'ತೇಷಾಂ ನಿತ್ಯಾಭಿಯುಕ್ತಾನಾಂ ಯೋಗಕ್ಷೇಮಂ ವಹಾಮ್ಯಹಮ್| ‖ 30 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಪರಿತ್ರಾಣಾಯ ಸಾಧೂನಾಂ ವಿನಾಶಾಯ ಚ ದುಷ್ಕೃತಾಮ್| |'}
              line2={'ಧರ್ಮಸಂಸ್ಥಾಪನಾರ್ಥಾಯ ಸಂಭವಾಮಿ ಯುಗೇ ಯುಗೇ ‖ 31 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಆರ್ತಾಃ ವಿಷಣ್ಣಾಃ ಶಿಥಿಲಾಶ್ಚ ಭೀತಾಃ ಘೋರೇಷು ಚ ವ್ಯಾಧಿಷು ವರ್ತಮಾನಾಃ |'}
              line2={'ಸಂಕೀರ್ತ್ಯ ನಾರಾಯಣಶಬ್ದಮಾತ್ರಂ ವಿಮುಕ್ತದುಃಖಾಃ ಸುಖಿನೋ ಭವಂತಿ ‖ 32 ‖'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕಾಯೇನ ವಾಚಾ ಮನಸೇಂದ್ರಿಯೈರ್ವಾ ಬುದ್ಧ್ಯಾತ್ಮನಾ ವಾ ಪ್ರಕೃತೇಃ ಸ್ವಭಾವಾತ್ |'}
              line2={'ಕರೋಮಿ ಯದ್ಯತ್ಸಕಲಂ ಪರಸ್ಮೈ ನಾರಾಯಣಾಯೇತಿ ಸಮರ್ಪಯಾಮಿ ‖ 33 ‖'}
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

export default VishnuSahasranamam;
