/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, BackHandler, ScrollView} from 'react-native';
import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const SriramChandirane = ({navigation}) => {
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
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <HeaderComponent
        backAction={() => {
          navigation.navigate('BhajaneScreen');
        }}
        title={'ಶ್ರೀ ರಾಮಚಂದಿರನೆ ಶ್ರೀ ಲೋಲ ಸುಂದರನೆ'}
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
            line1={'ಶ್ರೀ ರಾಮಚಂದಿರನೆ ಶ್ರೀ ಲೋಲ ಸುಂದರನೆ'}
            line2={'ಶ್ರೀಮನ್ನಾರಾಯಣ ರಾಮ್ ರಾಮ್ ರಾಮ್'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'1.ದಶರಥ ಪುತ್ತಿರನೆ ದಶಾರಮಿತ್ತಿರನೆ'}
            line2={'ಕಾಟಕ ಸಂಹಾರನೆ ರಾಮ್ ರಾಮ್ ರಾಮ್'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'2. ವೈಕುಂಠವಾಸನೆ ವನವಿಹಾರನೆ'}
            line2={'ಶೇಷಾದ್ರಿಶಯನನೆ ರಾಮ್ ರಾಮ್ ರಾಮ್'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'3. ಪಾಲನೆ ಪರಿಪಾಲನೆ ಗೋಕುಲ ಸುಂದರನೆ ಗೋಪೀಕುಮಾರನೆ'}
            line2={'ಗೋವಿಂದ ರಮಣನೆ ರಾಮ್ ರಾಮ್ ರಾಮ್'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'4. ಸಾರ ಸುಗುಣ ಶರೀರನೆ, ರಾಮಾಭಿರಾಮನೆ ರಘುಕುಲ ಸೋಮನೆ,'}
            line2={'ಜಾನಕೀಯ ವಲ್ಲಭನೆ ರಾಮ್ ರಾಮ್ ರಾಮ್'}
          />
        </View>
      </ScrollView>

      <Admob />
    </View>
  );
};

export default SriramChandirane;
