/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, BackHandler, ScrollView} from 'react-native';
import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const ThugireRangana = ({navigation}) => {
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
        title={'ತೂಗಿರೆ ರಂಗನ ತೂಗಿರೆ ಕೃಷ್ಣನ'}
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
            line1={'ತೂಗಿರೆ ರಂಗನ ತೂಗಿರೆ ಕೃಷ್ಣನ'}
            line2={'ತೂಗಿರೆ ಅಚ್ಯುತಾನಂತನ'}
            line3={'ತೂಗಿರೆ ವರಗಿರಿಯಪ್ಪ ತಿಮ್ಮಪ್ಪನ'}
            line4={'ತೂಗಿರೆ ಕಾವೇರಿ ರಂಗಯ್ಯನ'}
            line5={'ನಾಗಲೋಕದಲ್ಲಿ ನಾರಾಯಣ ಮಲಗ್ಯಾನೆ'}
            line6={'ನಾಗ ಕನ್ನಿಕೆಯರು ತೂಗಿರೆ'}
            line7={'ನಾಗವೇಣಿಯರು ನೇಣ ಪಿಡಿದುಕೊಂಡು'}
            line8={'ಬೇಗನೆ ತೊಟ್ಟಿಲ ತೂಗಿರೆ || ೧ ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಇಂದ್ರಲೋಕದಲ್ಲುಪೇಂದ್ರ ಮಲಗ್ಯಾನೆ'}
            line2={'ಇಂದುಮುಖಿಯರೆಲ್ಲ ತೂಗಿರೆ'}
            line3={'ಇಂದ್ರ ಕನ್ನಿಕೆಯರು ಚಂದದಿ ಬಂದು'}
            line4={'ಮುಕುಂದನ ತೊಟ್ಟಿಲ ತೂಗಿರೆ || ೨ ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಆಲದೆಲೆಯ ಮೇಲೆ ಶ್ರೀಲೋಲ ಮಲಗ್ಯಾನೆ'}
            line2={'ನೀಲಕುಂತಳೆಯರು ತೂಗಿರೆ'}
            line3={'ವ್ಯಾಳಶಯನ ಹರಿ ಮಲಗು ಮಲಗೆಂದು'}
            line4={'ಬಾಲ ಕೃಷ್ಣಯ್ಯನ ತೂಗಿರೆ || ೩ ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಸಾಸಿರ ನಾಮನೆ ಸರ್ವೋತ್ತಮನೆಂದು'}
            line2={'ಸೂಸುತ್ತ ತೊಟ್ಟಿಲ ತೂಗಿರೆ'}
            line3={'ವಲೇಸಾಗಿ ಮಡುವಿನೊಳ್ ಶೇಷನ ತುಳಿದಿಟ್ಟ'}
            line4={'ದೋಷ ವಿದೂರನ ತೂಗಿರೆ || ೪ ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಅರಳೆಲೆ ಮಾಗಾಯಿ ಕೊರಳ ಮುತ್ತಿನ ಹಾರ'}
            line2={'ತರಳನ ತೊಟ್ಟಿಲ ತೂಗಿರೆ'}
            line3={'ಸಿರಿದೇವಿ ರಮಣನೆ ಪುರಂದರ ವಿಠಲನೆ'}
            line4={'ಕರುಣದಿ ಮಲಗೆಂದು ತೂಗಿರೆ || ೫ ||'}
          />
        </View>
      </ScrollView>

      <Admob />
    </View>
  );
};

export default ThugireRangana;
