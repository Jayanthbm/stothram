/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const SreenivasaNeenePaliso = ({navigation}) => {
  const {backgroundColor, textColor, font} = useContext(ThemeContext);

  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <HeaderComponent
        navigation={navigation}
        back={'BhajaneScreen'}
        title={'ಶ್ರೀನಿವಾಸ ನೀನೇ ಪಾಲಿಸೋ'}
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
            line1={'ಶ್ರೀನಿವಾಸ ನೀನೇ ಪಾಲಿಸೋ ಶ್ರಿತಜನ ಪಾಲ'}
            line2={'ಗಾನಲೋಲ ಶ್ರೀ ಮುಕುಂದನೇ || ಪ ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಧ್ಯಾನಮಾಳ್ಪ ಸಜ್ಜನರ ಮಾನದಿಂ ಪರಿಪಾಲಿಪ'}
            line2={'ವೇಣುಗೋಪಾಲಾ ಮುಕುಂದ ವೇದವೇದ್ಯ ನಿತ್ಯಾನಂದ ||ಅಪ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಎಂದಿಗೆ ನಿನ್ನ ಪಾದಾಬ್ಜವ ಪೊಂದುವ ಸುಖ'}
            line2={'ಎಂದಿಗೆ ಲಭಯವೋ ಮಾಧವ'}
            line3={'ಅಂಧಕಾರಣ್ಯದಲ್ಲಿ ನಿಂದು ತತ್ತರಿಸುತಿಹೆನೊ'}
            line4={'ಬಂದು ಬಂದು ಈ ಭವದಿ ಬೆಂದು ನೊಂದೇನೊ ಮುಕುಂದ||೧||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಎಷ್ಟು ದಿನ ಕಷ್ಟ ಪಡುವುದೊ'}
            line2={'ಯಶೋದೆ ಕಂದ ದೃಷ್ಟಿಯಿಂದ ನೋಡಲಾಗದೆ'}
            line3={'ಮುಟ್ಟಿ ನಿನ್ನ ಭಜಿಸಲಾರೆ ಕೆಟ್ಟ ನರಜನ್ಮದೊಳು'}
            line4={'ದುಷ್ಟ ಕಾರ್ಯ ಮಾಡಿದಾಗ್ಯು ಇಷ್ಟನಾಗಿ ಕೈಯಪಿಡಿದು ||೨||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಅನಿದಿನ ಅನೇಕ ರೋಗಂಗಳಾ ಅನುಭವಿಸುವೆನು'}
            line2={'ಘನ ಮಹಿಮ ನೀನೆ ಬಲ್ಲೆಯಾ'}
            line3={'ತನುವಿನಲ್ಲಿ ಬಲವಿಲ್ಲ ನೆನೆದ ಮಾತ್ರ ಸಲಹುವ'}
            line4={'ಹನುಮದೀಶ ಪುರನ್ದರ ವಿಠಲನೇ ಬೇಗ ಬಲಿದು ||೩||'}
          />
        </View>
      </ScrollView>

      <Admob />
    </View>
  );
};

export default SreenivasaNeenePaliso;
