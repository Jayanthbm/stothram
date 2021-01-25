/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, BackHandler, ScrollView} from 'react-native';
import {Container} from 'native-base';

import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const KodandaRama = ({navigation}) => {
  const {backgroundColor, textColor, font} = useContext(ThemeContext);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('BhajaneScreen');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <Container>
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        <HeaderComponent
          backAction={() => {
            navigation.navigate('BhajaneScreen');
          }}
          title={'ಕೋದಂಡರಾಮ ಕೋದಂಡರಾಮ'}
        />
        <SliderComponent />
        <ScrollView>
          <View
            style={{
              marginLeft: 7,
              marginRight: 1,
            }}>
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕೋದಂಡರಾಮ ಕೋದಂಡರಾಮ ಕೋದಂಡ ರಾಮಪಾಹಿ ಕೋದಂಡರಾಮ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರಿಕರತ್ರಾಹಿ ಭಾಸ್ಕರದೇಹಿ ಲೋಕೇಶತ್ರಾಹಿ ಸದ್ಗುಣ ಪಾಹಿ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನೀರೊಳುತೋರಿ ಪಾತಳಸೇರಿ ವೇಧವತೋರಿದ ಮತ್ಸ್ಯವತಾರಿ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನೀರೊಳುತೋರಿ ಪಾತಳಸೇರಿ ವೇಧವತೋರಿದ ಮತ್ಸ್ಯವತಾರಿ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನಾಗೇಶ ಭ್ರಮ್ಹಾ ಪ್ರಾರ್ಥಿಪೆ ನಿಮ್ಮ ಆದಿ ನೀ ಕೂರ್ಮ ಪಾಲಿಸುನಮ್ಮ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕಲಿರುಪ ತಾಳಿ ಧನುಜನ ಸೀಳಿ ಧರೆಯ ಮಹಾಳಿಪರಮ ಕೃಪಾಳಿ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ನರಹರಿ ರೂಪ ತಾಳಿ ಪ್ರತಾಪ ತೋರಿದ ಭೂಪ ಪ್ರೌಡಕಲಾಪ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಬಲಿಯನುಮೆಟ್ಟಿ ಹೃದ ಯವ ಕುಟ್ಟಿ ಪಾತಾಳ ಕಟ್ಟಿದ ವಾಮನ ಜೆಟ್ಟಿ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ದಶರಥ ಭಾಲ ದಶಶಿರ ಲೋಲ ದಶಮುಖಕಾಲ ದಶಾನು ಕೂಲ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ದಾತ್ರಿಜ ವಂಶ ಮಾಡಿದ ದ್ವಂಸ ಮುನಿಕೂಲ ಹಂಸ ಸತ್ಯ ಪ್ರಶಂಸಾ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಗೋಕುಲ ರಕ್ಷಾ ಸುಜನ ಸಂರಕ್ಷಾ ಪೂತನಿ ಶಿಕ್ಷಾ ಕಂಜಾದಲಾಕ್ಷಾ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಬೆತ್ತಲೆ ನಿಂದು ಭೌದ್ದನೆ ಎಂದು ಭಕ್ತಿಯೊಳಿಂದು ಪ್ರಾರ್ತಿಪೇವಿಂದು'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕಲ್ಕ್ಯವತಾರ ಕಲಿಮನ ದೂರ ಧುರಿತಪ್ರಹಾರ ಸುಜನ್ನೋದ್ದರಾ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸಾಗರ ವಾಸ ನಾಗಮುಕೇಶ ನುಡಿಸಿದ ಭಾಷಾ ಭಜನಾ ವಿಶೇಷ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಸುಜನರು ಕೂಡಿ ಭಜನೆಯ ಮಾಡಿ ಭಜಿಸುತಲಾಡಿ ಜಗವಕೊಂಡಾಡಿ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಮಂಗಳಾರಾಮ ಮಂಗಳಭೀಮ  ಮಂಗಳಧಾಮ ಜಗದನೀಸ್ಸೀಮ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಜಯರಘುವೀರ ಜಗಧದಿ ಶೂರ ಭಯನಿವಹಾರ ಭಕ್ತಮಂದಾರ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ದಶರಥ ಪುತ್ರ ಧನ್ಯಚೇರಿತ್ರ ಪಶುಮತಿ ಮಿತ್ರ ಪುಣ್ಯ ಸುಗಾಕ್ರಾ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ರಾಜೀವ ನೇತ್ರ ರಮಣೀಯ ಘಾತ್ರ ಸೀತಾ ಕಲಾತ್ರ ಸಿಂಧೂಪವಿತ್ರ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಭವ್ಯ ವಿಲಾಸ ಭಕ್ತ ಶಂಕಾಶ  ಭವ ಭಯ ಶೂರ ಭಕ್ತಾದಿ ವಾಸ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಚಿನ್ಮಯ ರಾಮ ಚಿದ್ರುಪದಾನ ಅಖಂಡ ರಾಮ ಆನಂದರಾಮ '}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಶ್ರೀ ರಾಮ ರಾಮ ಗೋಪಾಲ ರಾಮ ಶ್ರೀಲೋಲಾ ರಾಮ ಜಾನಕಿ ರಾಮ'}
            />
          </View>
        </ScrollView>

        <Admob />
      </View>
    </Container>
  );
};

export default KodandaRama;
