/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, BackHandler, ScrollView} from 'react-native';
import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const ChaturShloki = ({navigation}) => {
  const {backgroundColor, textColor, font} = useContext(ThemeContext);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('ShotramScreen');
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
          navigation.navigate('ShotramScreen');
        }}
        title={'ಚತುಶ್ಲೋಕೀ'}
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
            line1={'ಶ್ರೀಮಾನ್ ವೇಂಕಟನಾಥಾರ್ಯಃ ಕವಿತಾರ್ಕಿಕಕೇಸರೀ |'}
            line2={'ವೇದಾಂತಾಚಾರ್ಯವರ್ಯೋಮೇ ಸನ್ನಿಧತ್ತಾಂ ಸದಾಹೃದಿ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ವಿಗಾಹೇ ಯಾಮುನಂ ತೀರ್ಥಂ ಸಾಧು ಬೃಂದಾವನೇ ಸ್ಥಿತಂ|'}
            line2={'ನಿರಸ್ತ ಜಿಹ್ಮಗ ಸ್ಪರ್ಷೇ ಯತ್ರ ಕೃಷ್ಣಃ ಕೃತಾಧರಃ ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ನಮೋನಮೋ ಯಾಮುನಾಯ ಯಾಮುನಾಯ ನಮೋನಮಃ|'}
            line2={'ನಮೋನಮೋ ಯಾಮುನಾಯ ಯಾಮುನಾಯ ನಮೋನಮಃ||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಕಾಂತಸ್ತೇ ಪುರುಷೋತ್ತಮಃ ಫಣಿಪತಿಃ ಶಯ್ಯಾ„ಸನಂ ವಾಹನಂ'}
            line2={'ವೇದಾತ್ಮಾವಿಹಗೇಶ್ವರೋ ಯವನಿಕಾ ಮಾಯಾ ಜಗನ್ಮೋಹಿನೀ|'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಬ್ರಹ್ಮೇಶಾದಿ ಸುರವ್ರಜಃ ಸದಯಿತಃ ತ್ವದ್ದಾಸ ದಾಸೀಗಣಃ '}
            line2={'ಶ್ರೀರಿತ್ಯೇವಚನಾಮ ತೇ ಭಗವತಿ ಬ್ರೂಮಃ ಕಥಂ ತ್ವಾಂವಯಂ ||1||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಯಸ್ಯಾಸ್ತೇ ಮಹಿಮಾನಮಾತ್ಮನ ಇವ ತ್ವದ್ವಲ್ಲಭೋ„ಪಿ ಪ್ರಭುಃ'}
            line2={'ನಾಲಂ ಮಾತುಮಿಯತ್ತಯಾ ನಿರವಧಿಂ ನಿತ್ಯಾನುಕೂಲಂಸ್ವತಃ|'}
            line3={'ತಾಂತ್ವಾಂ ದಾಸಇತಿ ಪ್ರಪನ್ನ ಇತಿ ಚ ಸ್ತೋಷ್ಯಾಮ್ಯಹಂನಿರ್ಭಯಃ'}
            line4={'ಲೋಕೈಕೇಶ್ವರಿ ಲೋಕನಾಥದಯಿತೇ ದಾಂತೇದಯಾಂತೇವಿದò||2||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಈಷತ್ ತ್ವತ್ಕರುಣಾ ನಿರೀಕ್ಷಣ ಸುಧಾ ಸಂಧುಕ್ಷಣಾದ್ರಕ್ಷ್ಯತೇ'}
            line2={'ನಷ್ಟಂ ಪ್ರಾಕ್ ತದಲಾಭತಸ್ತ್ರಿಭುವನಂ ಸಂಪ್ರತ್ಯನಂತೋದಯಂ|'}
            line3={'ಶ್ರೇಯೋ ನ ಹ್ಯರವಿಂದಲೋಚನ ಮನಃ ಕಾಂತಾ ಪ್ರಸಾದಾದೃತೇ'}
            line4={'ಸಂಸೃತ್ಯಕ್ಷರ ವೈಷ್ಣವಾಧ್ವಸು ನೃಣಾಂ ಸಂಭಾವ್ಯತೇ ಕರ್ಹಿಚಿತ್ ||3||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={' ಶಾಂತಾನಂತ ಮಹಾವಿಭೂತಿ ಪರಮಂ ಯದ್ಬ್ರಹ್ಮ ರೂಪಂಹರೇಃ'}
            line2={'ಮೂರ್ತಂಬ್ರಹ್ಮ ತತೋ„ಪಿ ತತ್ಪ್ರಿಯತರಂ ರೂಪಂಯದತ್ಯದ್ಭುತಂ|'}
            line3={'ಯಾನ್ಯನ್ಯಾನಿಯಥಾಸುಖಂವಿಹರತೋ ರೂಪಾಣಿ ಸರ್ವಾಣಿತಾನಿ'}
            line4={'ಆಹುಃ ಸ್ವೈರನುರೂಪ ರೂಪವಿಭವೈಃ ಗಾಢೋಪಗೂಢಾನಿ ತೇ ||4||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಆಕಾರ ತ್ರಯ ಸಂಪನ್ನಾಂ ಅರವಿಂದ ನಿವಾಸಿನೀಂ |'}
            line2={'ಅಶೇಷ ಜಗದೀಶಿತ್ರೀಂ ವಂದೇ ವರದ ವಲ್ಲಭಾಂ ||5||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಭಗವನ್ನಾರಾಯಣಾಭಿಮತಾನುರೂಪ ಸ್ವರೂಪರೂಪ'}
            line2={'ಗುಣವಿಭವೈಶ್ವರ್ಯ ಶೀಲಾದ್ಯನವದಿಕ '}
            line3={'ಅತಿಶಯಾ„ಸಂಖ್ಯೇಯ ಕಲ್ಯಾಣ ಗುಣಗಣಾಂ,'}
            line4={'ಪದ್ಮವನಾಲಯಾಂ ಭಗವತೀಂ ಶ್ರಿಯಂ ದೇವೀಂ'}
            line5={'ನಿತ್ಯಾನುಪಾಯಿನೀಂ ನಿರವದ್ಯಾಂ ದೇವದೇವ ದಿವ್ಯಮಹಿಷೀಂ,'}
            line6={'ಅಖಿಲ ಜಗನ್ಮಾತರಂ ಅಸ್ಮನ್ಮಾತರಂ'}
            line7={'ಅಶರಣ್ಯ ಶರಣ್ಯಾಂ ಅನನ್ಯಶರಣಃ ಶರಣಂ ಅಹಂ ಪ್ರಪದ್ಯೇ ||6||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಉಲ್ಲಾಸ ಪಲ್ಲವಿತ ಪಾಲಿತ ಸಪ್ತಲೊಕೀ'}
            line2={'ನಿರ್ವಾಹ ಕೋರಕಿತ ನೇಮ ಕಟಾಕ್ಷಲೀಲಾಂ |'}
            line3={'ಶ್ರೀರಂಗ ಹರ್ಮ್ಯತಲ ಮಙ್ಗಲ ದೀಪರೇಖಾಂ'}
            line4={'ಶ್ರೀರಂಗರಾಜ ಮಹಿಷೀಂ ಶ್ರಿಯಮಾಶ್ರಯಾಮಃ ||7||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಸಮಸ್ತ ಜನನೀಂ ವಂದೇ ಚೈತನ್ಯ ಸ್ತನ್ಯ ದಾಯಿನೀಂ |'}
            line2={'ಶ್ರೇಯಸೀಂ ಶ್ರೀನಿವಾಸಸ್ಯ ಕರುಣಾಮಿವ ರೂಪಿಣೀಂ ||8||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಕಲ್ಯಾಣಾನಾಂ ಅವಿಕಲ ನಿಧಿಃ ಕಾಪಿ ಕಾರುಣ್ಯ ಸೀಮಾ '}
            line2={'ನಿತ್ಯಾಮೋದಾ ನಿಗಮ ವಚಸಾ ಮೌಳಿಮಂದಾರ ಮಾಲಾ |'}
            line3={'ಸಂಪತ್ ದಿವ್ಯಾ ಮಧುವಿಜಯಿನಃ ಸನ್ನಿಧತ್ತಾಮ್ ಸದಾಮೇ'}
            line4={'ಸೈಷಾದೇವೀ ಸಕಲಭುವನಃ ಪ್ರಾರ್ಥನಾ ಕಾಮಧೇನುಃ ||9||'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಉಪಚಿತ ಗುರುಭಕ್ತೇರುತ್ಥಿತಂ ವೇಂಕಟೇಶಾತ್'}
            line2={'ಕಲಿಕಲುಷ ನಿವೃತ್ಯೈ ಕಲ್ಪಮಾನಂ ಪ್ರಜಾನಾಂ|'}
            line3={'ಸರಸಿಜ ನಿಲಯಾಯಾಃ ಸ್ತೋತ್ರಮೇತತ್ ಪಠಂತಃ'}
            line4={'ಸಕಲ ಕುಶಲ ಸೀಮಾಃ ಸಾರ್ವಭೌಮಾ ಭವಂತಿ||10||'}
          />
        </View>
      </ScrollView>

      <Admob />
    </View>
  );
};

export default ChaturShloki;
