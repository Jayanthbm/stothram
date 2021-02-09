/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, BackHandler, ScrollView} from 'react-native';
import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const AdithyaHrudayam = ({navigation}) => {
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
        title={'ಆದಿತ್ಯ ಹೃದಯಮ್'}
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
            line1={'ಧ್ಯಾನಂ'}
            line2={'ನಮಸ್ಸವಿತ್ರೇ ಜಗದೇಕ ಚಕ್ಷುಸೇ'}
            line3={'ಜಗತ್ಪ್ರಸೂತಿ ಸ್ಥಿತಿ ನಾಶಹೇತವೇ'}
            line4={'ತ್ರಯೀಮಯಾಯ ತ್ರಿಗುಣಾತ್ಮ ಧಾರಿಣೇ'}
            line5={'ವಿರಿಂಚಿ ನಾರಾಯಣ ಶಂಕರಾತ್ಮನೇ'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ತತೋ ಯುದ್ಧ ಪರಿಶ್ರಾಂತಂ ಸಮರೇ ಚಿಂತಯಾ ಸ್ಥಿತಂ|'}
            line2={'ರಾವಣಂ ಚಾಗ್ರತೋ ದೃಷ್ಟ್ವಾ ಯುದ್ಧಾಯ ಸಮುಪಸ್ಥಿತಂ ‖ 1 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ದೈವತೈಶ್ಚ ಸಮಾಗಮ್ಯ ದ್ರಷ್ಟುಮಭ್ಯಾಗತೋ ರಣಂ|'}
            line2={'ಉಪಾಗಮ್ಯಾ-ಬ್ರವೀದ್ರಾಮಂ ಅಗಸ್ತ್ಯೋ ಭಗವಾನ್ ಋಷಿಃ ‖ 2 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ರಾಮ ರಾಮ ಮಹಾಬಾಹೋ ಶೃಣು ಗುಹ್ಯಂ ಸನಾತನಂ|'}
            line2={'ಯೇನ ಸರ್ವಾನರೀನ್ ವತ್ಸ ಸಮರೇ ವಿಜಯಿಷ್ಯಸಿ ‖ 3 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಆದಿತ್ಯ ಹೃದಯಂ ಪುಣ್ಯಂ ಸರ್ವಶತ್ರು ವಿನಾಶನಂ|'}
            line2={'ಜಯಾವಹಂ ಜಪೇನ್ನಿತ್ಯಂ ಅಕ್ಷಯ್ಯಂ ಪರಮಂ ಶಿವಂ‖ 4 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಸರ್ವಮಂಗಳ ಮಾಂಗಳ್ಯಂ ಸರ್ವ ಪಾಪ ಪ್ರಣಾಶನಂ|'}
            line2={'ಚಿಂತಾಶೋಕ ಪ್ರಶಮನಂ ಆಯುರ್ವರ್ಧನ ಮುತ್ತಮಂ‖ 5 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ರಶ್ಮಿಮಂತಂ ಸಮುದ್ಯಂತಂ ದೇವಾಸುರ ನಮಸ್ಕೃತಂ|'}
            line2={'ಪೂಜಯಸ್ವ ವಿವಸ್ವಂತಂ ಭಾಸ್ಕರಂ ಭುವನೇಶ್ವರಂ‖ 6 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಸರ್ವದೇವಾತ್ಮಕೋ ಹ್ಯೇಷ ತೇಜಸ್ವೀ ರಶ್ಮಿಭಾವನಃ |'}
            line2={'ಏಷ ದೇವಾಸುರ ಗಣಾನ್ ಲೋಕಾನ್ ಪಾತಿ ಗಭಸ್ತಿಭಿಃ ‖ 7 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಏಷ ಬ್ರಹ್ಮಾ ಚ ವಿಷ್ಣುಶ್ಚ ಶಿವಃ ಸ್ಕಂದಃ ಪ್ರಜಾಪತಿಃ |'}
            line2={'ಮಹೇಂದ್ರೋ ಧನದಃ ಕಾಲೋ ಯಮಃ ಸೋಮೋ ಹ್ಯಪಾಂ ಪತಿಃ ‖ 8 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಪಿತರೋ ವಸವಃ ಸಾಧ್ಯಾ ಹ್ಯಶ್ವಿನೌ ಮರುತೋ ಮನುಃ |'}
            line2={'ವಾಯುರ್ವಹ್ನಿಃ ಪ್ರಜಾಪ್ರಾಣಃ ಋತುಕರ್ತಾ ಪ್ರಭಾಕರಃ ‖ 9 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಆದಿತ್ಯಃ ಸವಿತಾ ಸೂರ್ಯಃ ಖಗಃ ಪೂಷಾ ಗಭಸ್ತಿಮಾನ್ |'}
            line2={'ಸುವರ್ಣಸದೃಶೋ ಭಾನುಃ ಹಿರಣ್ಯರೇತಾ ದಿವಾಕರಃ ‖ 10 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಹರಿದಶ್ವಃ ಸಹಸ್ರಾರ್ಚಿಃ ಸಪ್ತಸಪ್ತಿ-ರ್ಮರೀಚಿಮಾನ್ |'}
            line2={'ತಿಮಿರೋನ್ಮಥನಃ ಶಂಭುಃ ತ್ವಷ್ಟಾ ಮಾರ್ತಾಂಡಕೋಂಽಶುಮಾನ್ ‖ 11 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಹಿರಣ್ಯಗರ್ಭಃ ಶಿಶಿರಃ ತಪನೋ ಭಾಸ್ಕರೋ ರವಿಃ |'}
            line2={'ಅಗ್ನಿಗರ್ಭೋಽದಿತೇಃ ಪುತ್ರಃ ಶಂಖಃ ಶಿಶಿರನಾಶನಃ ‖ 12 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ವ್ಯೋಮನಾಥ ಸ್ತಮೋಭೇದೀ ಋಗ್ಯಜುಃಸಾಮ-ಪಾರಗಃ |'}
            line2={'ಘನವೃಷ್ಟಿ ರಪಾಂ ಮಿತ್ರೋ ವಿಂಧ್ಯವೀಥೀ ಪ್ಲವಂಗಮಃ ‖ 13 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಆತಪೀ ಮಂಡಲೀ ಮೃತ್ಯುಃ ಪಿಂಗಳಃ ಸರ್ವತಾಪನಃ |'}
            line2={'ಕವಿರ್ವಿಶ್ವೋ ಮಹಾತೇಜಾ ರಕ್ತಃ ಸರ್ವಭವೋದ್ಭವಃ ‖ 14 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ನಕ್ಷತ್ರ ಗ್ರಹ ತಾರಾಣಾಂ ಅಧಿಪೋ ವಿಶ್ವಭಾವನಃ |'}
            line2={'ತೇಜಸಾಮಪಿ ತೇಜಸ್ವೀ ದ್ವಾದಶಾತ್ಮನ್-ನಮೋಽಸ್ತು ತೇ ‖ 15 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ನಮಃ ಪೂರ್ವಾಯ ಗಿರಯೇ ಪಶ್ಚಿಮಾಯಾದ್ರಯೇ ನಮಃ |'}
            line2={'ಜ್ಯೋತಿರ್ಗಣಾನಾಂ ಪತಯೇ ದಿನಾಧಿಪತಯೇ ನಮಃ ‖ 16 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಜಯಾಯ ಜಯಭದ್ರಾಯ ಹರ್ಯಶ್ವಾಯ ನಮೋ ನಮಃ |'}
            line2={'ನಮೋ ನಮಃ ಸಹಸ್ರಾಂಶೋ ಆದಿತ್ಯಾಯ ನಮೋ ನಮಃ ‖ 17 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ನಮ ಉಗ್ರಾಯ ವೀರಾಯ ಸಾರಂಗಾಯ ನಮೋ ನಮಃ |'}
            line2={'ನಮಃ ಪದ್ಮಪ್ರಬೋಧಾಯ ಮಾರ್ತಾಂಡಾಯ ನಮೋ ನಮಃ ‖ 18 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಬ್ರಹ್ಮೇಶಾನಾಚ್ಯುತೇಶಾಯ ಸೂರ್ಯಾಯಾದಿತ್ಯ-ವರ್ಚಸೇ |'}
            line2={'ಭಾಸ್ವತೇ ಸರ್ವಭಕ್ಷಾಯ ರೌದ್ರಾಯ ವಪುಷೇ ನಮಃ ‖ 19 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ತಮೋಘ್ನಾಯ ಹಿಮಘ್ನಾಯ ಶತ್ರುಘ್ನಾಯಾ ಮಿತಾತ್ಮನೇ |'}
            line2={'ಕೃತಘ್ನಘ್ನಾಯ ದೇವಾಯ ಜ್ಯೋತಿಷಾಂ ಪತಯೇ ನಮಃ ‖ 20 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ತಪ್ತ ಚಾಮೀಕರಾಭಾಯ ವಹ್ನಯೇ ವಿಶ್ವಕರ್ಮಣೇ |'}
            line2={'ನಮಸ್ತಮೋಽಭಿ ನಿಘ್ನಾಯ ರುಚಯೇ ಲೋಕಸಾಕ್ಷಿಣೇ ‖ 21 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ನಾಶಯತ್ಯೇಷ ವೈ ಭೂತಂ ತದೇವ ಸೃಜತಿ ಪ್ರಭುಃ |'}
            line2={'ಪಾಯತ್ಯೇಷ ತಪತ್ಯೇಷ ವರ್ಷತ್ಯೇಷ ಗಭಸ್ತಿಭಿಃ ‖ 22 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಏಷ ಸುಪ್ತೇಷು ಜಾಗರ್ತಿ ಭೂತೇಷು ಪರಿನಿಷ್ಠಿತಃ |'}
            line2={'ಏಷ ಏವಾಗ್ನಿಹೋತ್ರಂ ಚ ಫಲಂ ಚೈವಾಗ್ನಿ ಹೋತ್ರಿಣಾಂ‖ 23 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ವೇದಾಶ್ಚ ಕ್ರತವಶ್ಚೈವ ಕ್ರತೂನಾಂ ಫಲಮೇವ ಚ |'}
            line2={'ಯಾನಿ ಕೃತ್ಯಾನಿ ಲೋಕೇಷು ಸರ್ವ ಏಷ ರವಿಃ ಪ್ರಭುಃ ‖ 24 ‖'}
          />
          <St color={textColor} fontSize={font} line1={'ಫಲಶ್ರುತಿಃ'} />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಏನ ಮಾಪತ್ಸು ಕೃಚ್ಛ್ರೇಷು ಕಾಂತಾರೇಷು ಭಯೇಷು ಚ |'}
            line2={'ಕೀರ್ತಯನ್ ಪುರುಷಃ ಕಶ್ಚಿನ್-ನಾವಶೀದತಿ ರಾಘವ ‖ 25 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಪೂಜಯಸ್ವೈನ ಮೇಕಾಗ್ರೋ ದೇವದೇವಂ ಜಗತ್ಪತಿಂ|'}
            line2={'ಏತತ್ ತ್ರಿಗುಣಿತಂ ಜಪ್ತ್ವಾ ಯುದ್ಧೇಷು ವಿಜಯಿಷ್ಯಸಿ ‖ 26 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಅಸ್ಮಿನ್ ಕ್ಷಣೇ ಮಹಾಬಾಹೋ ರಾವಣಂ ತ್ವಂ ವಧಿಷ್ಯಸಿ |'}
            line2={'ಏವಮುಕ್ತ್ವಾ ತದಾಗಸ್ತ್ಯೋ ಜಗಾಮ ಚ ಯಥಾಗತಂ‖ 27 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಏತಚ್ಛ್ರುತ್ವಾ ಮಹಾತೇಜಾಃ ನಷ್ಟಶೋಕೋಽಭವತ್-ತದಾ |'}
            line2={'ಧಾರಯಾಮಾಸ ಸುಪ್ರೀತೋ ರಾಘವಃ ಪ್ರಯತಾತ್ಮವಾನ್ ‖ 28 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಆದಿತ್ಯಂ ಪ್ರೇಕ್ಷ್ಯ ಜಪ್ತ್ವಾ ತು ಪರಂ ಹರ್ಷಮವಾಪ್ತವಾನ್ |'}
            line2={'ತ್ರಿರಾಚಮ್ಯ ಶುಚಿರ್ಭೂತ್ವಾ ಧನುರಾದಾಯ ವೀರ್ಯವಾನ್ ‖ 29 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ರಾವಣಂ ಪ್ರೇಕ್ಷ್ಯ ಹೃಷ್ಟಾತ್ಮಾ ಯುದ್ಧಾಯ ಸಮುಪಾಗಮತ್ |'}
            line2={'ಸರ್ವಯತ್ನೇನ ಮಹತಾ ವಧೇ ತಸ್ಯ ಧೃತೋಽಭವತ್ ‖ 30 ‖'}
          />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಅಧ ರವಿರವದನ್-ನಿರೀಕ್ಷ್ಯ ರಾಮಂ ಮುದಿತಮನಾಃ ಪರಮಂ ಪ್ರಹೃಷ್ಯಮಾಣಃ |'}
            line2={
              'ನಿಶಿಚರಪತಿ ಸಂಕ್ಷಯಂ ವಿದಿತ್ವಾ ಸುರಗಣ ಮಧ್ಯಗತೋ ವಚಸ್ತ್ವರೇತಿ ‖ 31 ‖'
            }
          />
          <St
            color={textColor}
            fontSize={font}
            line1={
              'ಇತ್ಯಾರ್ಷೇ ಶ್ರೀಮದ್ರಾಮಾಯಣೇ ವಾಲ್ಮಿಕೀಯೇ ಆದಿಕಾವ್ಯೇ ಯುದ್ದಕಾಂಡೇ ಸಪ್ತೋತ್ತರ ಶತತಮಃ ಸರ್ಗಃ ‖'
            }
          />
        </View>
      </ScrollView>

      <Admob />
    </View>
  );
};

export default AdithyaHrudayam;
