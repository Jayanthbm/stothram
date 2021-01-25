/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, BackHandler, ScrollView} from 'react-native';
import {Container} from 'native-base';

import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import SubHeader from '../Components/SubHeader';
import {ThemeContext} from '../providers/ThemeProvider';

const RaghuveeraGadya = ({navigation}) => {
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
    <Container>
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        <HeaderComponent
          backAction={() => {
            navigation.navigate('ShotramScreen');
          }}
          title={'ಶ್ರೀ ರಘುವೀರ ಗದ್ಯಂ'}
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
              line1={
                '1.ಜಯತ್ಯಾಶ್ರಿತಸಂತ್ರಾಸವಿಧ್ವಸನೋದಯಃ |ಪ್ರಭಾವಾನ್  ಸೀತಯಾ ದೇವ್ಯಾ ಪರಮವ್ಯೋಮಭಾಸ್ಕರಃ ||'
              }
            />
            <SubHeader title="ಬಾಲಕಾಂಡಂ" />
            <St color={textColor} fontSize={font} line1={'2.ಜಯ ಜಯ ಮಹಾವೀರ !'} />
            <St color={textColor} fontSize={font} line1={'3.ಮಹಾಧೀರ ಧೌರೇಯ !'} />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '4.ದೇವಾಸುರ ಸಮರ ಸಮಯ ಸಮುದಿತ, ನಿಖಿಲ ನಿರ್ಜರ ನಿರ್ಧಾರಿತ, ನಿರವಧಿಕ ಮಾಹಾತ್ಮ್ಯ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'5.ದಶವದನ ದಮಿತ ದೈವತ, ಪರಿಷದಭ್ಯರ್ಥಿತ ದಾಶರಥಿ-ಭಾವ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'6.ದಿನಕರ ಕುಲ ಕಮಲ ದಿವಾಕರ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'7.ದಿವಿಷದಧಿಪತಿ ರಣ ಸಹಚರಣ, ಚತುರ ದಶರಥ, ಚರಮಋಣ ವಿಮೋಚನ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'8.ಕೋಸಲಸುತ ಕುಮಾರ ಭಾವ, ಕಂಚುಕಿತ ಕಾರಣಾಕಾರ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'9.ಕೌಮಾರ ಕೇಳಿ ಗೋಪಾಯಿತ ಕೌಶಿಕಾಧ್ವರ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'10.ರಣಾಧ್ವರ ಧುರ್ಯ ಭವ್ಯ, ದಿವ್ಯಾಸ್ತ್ರ ಬೃನ್ದ ವನ್ದಿತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'11.ಪ್ರಣತ ಜನ ವಿಮತ ವಿಮಥನ, ದುರ್ಲಲಿತದೋರ್ಲಲಿತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '12.ತನುತರ ವಿಶಿಖವಿತಾಡನ ವಿಘಟಿತ, ವಿಶರಾರು ಶರಾರು ತಾಟಕಾ ತಾಟಕೇಯ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '13.ಜಡಕಿರಣ ಶಕಲಧರ, ಜಟಿಲ ನಟ ಪತಿ ಮಕುಟತಟ ನಟನಪಟು ವಿಬುಧ ಸರಿದತಿಬಹುಳ, ಮಧುಗಳನ ಲಲಿತ ಪದ ನಳಿನರಜ ಉಪಮೃದಿತ ನಿಜವೃಜಿನ, ಜಹದುಪಲ‌‌ ತನುರುಚಿರ, ಪರಮಮುನಿವರ ಯುವತಿ ನುತ!'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'14.ಕುಶಿಕಸುತ ಕಥಿತ ವಿದಿತ, ನವ ವಿವಿಧ ಕಥ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'15.ಮೈಥಿಲ ನಗರ ಸುಲೋಚನಾ ಲೋಚನ ಚಕೋರ ಚನ್ದ್ರ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'16.ಖಂಡಪರಶು ಕೋದಣ್ಡ ಪ್ರಕಾಣ್ಡ, ಖಣ್ಡನ ಶೌಣ್ಡ ಭುಜ-ದಣ್ಡ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '17.ಚಣ್ಡ-ಕರ ಕಿರಣ-ಮಣ್ಡಲ ಬೋಧಿತ, ಪುಣ್ಡರೀಕ ವನರುಚಿ ಲುಣ್ಟಾಕ ಲೋಚನ!'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'18.ಮೋಚಿತ ಜನಕ ಹೃದಯ ಶಂಕಾತಂಕ!'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '19.ಪರಿಹೃತ ನಿಖಿಲ ನರಪತಿ ವರಣ, ಜನಕ-ದುಹಿತ ಕುಚತಟ ವಿಹರಣ,ಸಮುಚಿತ ಕರತಲ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '20.ಶತಕೋಟಿ ಶತಗುಣ ಕಠಿನ ಪರಶುಧರ, ಮುನಿವರ ಕರಧೃತ ದುರವನಮತಮನಿಜ, ಧನುರಾಕರ್ಷಣ ಪ್ರಕಾಶಿತ ಪಾರಮೇಷ್ಠ್ಯ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '21.ಕ್ರತುಹರಶಿಖರ ಕಂತುಕ ವಿಹೃತ್ಯುನ್ಮುಖ, ಜಗದರುಂತುದ ಜಿತಹರಿ ದಂತಿ ದಂತ ದಂತುರ, ದಶವದನ ದಮನ ಕುಶಲ, ದಶಶತಭುಜ ಮುಖ ನೃಪತಿಕುಲ, ರುಧಿರ ಝರ ಝರ ಭರಿತ ಪೃತುತರ ತುಂಟಾಟ ತೀರ್ಪಿನಂತೆ, ಪಿತೃಕ ಭೃಗಪತಿ ಸುಗತಿ, ವಿಹತಿಕರ ನತ ಪರುಡಿಷು ಪರಿಘ !'
              }
            />
            <SubHeader title="ಅಯೋಧ್ಯಾಕಾಂಡಂ" />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '22.ಅನೃತ ಭಯ ಮುಷಿತ ಹೃದಯ, ಪಿತೃ ವಚನ ಪಾಲನ, ಪ್ರತಿಜ್ಞಾವಜ್ಞಾತ ಯೌವರಾಜ್ಯ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'23.ನಿಷಾದ ರಾಜ ಸೌಹೃದ ಸೂಚಿತ, ಸೌಶೀಲ್ಯ ಸಾಗರ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '24.ಭರದ್ವಾಜಶಾಸನಪರಿಗೃಹೀತ, ವಿಚಿತ್ರ ಚಿತ್ರಕೂಟ, ಗಿರಿ ಕಟಕ ತಟ ರಮ್ಯಾವಸಥ !'
              }
            />
            <St color={textColor} fontSize={font} line1={'25.ಅನನ್ಯ ಶಾಸನೀಯ !'} />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '26.ಪ್ರಣತ ಭರತ ಮಕುಟತಟ ಸುಘಟಿತ, ಪಾದುಕಾಗ್ರ್ಯಾಭಿಷೇಕ ನಿರ್ವರ್ತಿತ ,ಸರ್ವಲೋಕ ಯೋಗಕ್ಷೇಮ!'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '27.ಪಿಶಿತ ರುಚಿ ವಿಹಿತ ದುರಿತ, ವಲಮಥನ ತನಯ, ಬಲಿಭುಗನುಗತಿ ಸರಭಸಶಯನ, ತೃಣ ಶಕಲ ಪರಿಪತನ, ಭಯ ಚಕಿತ ಸಕಲ ಸುರ ಮುನಿವರ,ಬಹುಮತ ಮಹಾಸ್ತ್ರ ಸಾಮರ್ಥ್ಯ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'28.ದ್ರುಹಿಣ ಹರ ವಲಮಥನ, ದುರಾಲಕ್ಷ್ಯ ಶರ ಲಕ್ಷ್ಯ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'29.ದಂಡಕಾ ತಪೋವನ ಜಙ್ಗಮ ಪಾರಿಜಾತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'30.ವಿರಾಧ ಹರಿಣ ಶಾರ್ದೂಲ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '31.ವಿಲುಲಿತ ಬಹುಫಲ ಮಖ ಕಲಮ, ರಜನಿಚರ ಮೃಗ ಮೃಗಯಾನಮ್ಭ, ಸಂಭೃತಚೀರಭೃದನುರೋಧ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'32.ತ್ರಿಶಿರಃ ಶಿರಸ್ತ್ರಿತಯ ತಿಮಿರ ನಿರಾಸ ವಾಸರಕರ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'33.ದೂಷಣ ಜಲನಿಧಿ ಶೋಶಾಣ ತೋಷಿತ, ಋಷಿ-ಗಣ ಘೋಷಿತ ವಿಜಯ ಘೋಷಣ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'34.ಖರತರ ಖರ ತರು ಖಣ್ಡನ ಚಣ್ಡ ಪವನ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'35.ದ್ವಿಸಪ್ತ ರಕ್ಷಃ-ಸಹಸ್ರ ನಲ-ವನ ವಿಲೋಲನ ಮಹಾ-ಕಲಭ !'}
            />
            <St color={textColor} fontSize={font} line1={'36.ಅಸಹಾಯ ಶೂರ !'} />
            <St color={textColor} fontSize={font} line1={'37.ಅನಪಾಯ ಸಾಹಸ !'} />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '38.ಮಹಿತ ಮಹಾ-ಮೃಥ ದರ್ಶನ ಮುದಿತ, ಮೈಥಿಲೀ ದೃಢ-ತರ ಪರಿರಮ್ಭಣ, ವಿಭವವಿರೋಪಿತ ವಿಕಟ ವೀರವ್ರಣ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'39.ಮಾರೀಚ ಮಾಯಾ ಮೃಗ ಚರ್ಮ ಪರಿಕರ್ಮಿತ ನಿರ್ಭರ ದರ್ಭಾಸ್ತರಣ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '40.ವಿಕ್ರಮ ಯಶೋ ಲಾಭ ವಿಕ್ರೀತ ಜೀವಿತ ಗೃಘ್ರರಾಜ ದೇಹ ದಿಧಕ್ಷಾ ಲಕ್ಷಿತ,ಭಕ್ತಜನ ದಾಕ್ಷಿಣ್ಯ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'41.ಕಲ್ಪಿತ ವಿಬುಧ-ಭಾವ ಕಬನ್ಧಾಭಿನನ್ದಿತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '42.ಅವಂದ್ಯ ಮಹಿಮ ಮುನಿಜನ ಭಜನ ಮುಷಿತ, ಹೃದಯ ಕಲುಷ ಶಬರೀ ಮೋಕ್ಷ ಸಾಕ್ಷಿಭೂತ !'
              }
            />
            <SubHeader title="ಕಿಷ್ಕಿಂಧಾಕಾಂಡಂ" />
            <St
              color={textColor}
              fontSize={font}
              line1={'43.ಪ್ರಭಂಜನ ತನಯ ಭಾವುಕ ಭಾಷಿತ ರಞ್ಜಿತ ಹೃದಯ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'44.ತರಣಿಸುತ ಶರಣಾಗತಿಪರತನ್ತ್ರೀಕೃತ ಸ್ವಾತನ್ತ್ರ್ಯ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '45.ದೃಢ ಘಟಿತ ಕೈಲಾಸ ಕೋಟಿ ವಿಕಟ ದುನ್ದುಭಿ ಕಙ್ಕಾಲ ಕೂಟ ದೂರ ವಿಕ್ಷೇಪ ದಕ್ಷ-ದಕ್ಷಿಣೇತರ ಪಾದಾಙ್ಗುಷ್ಠ ದರ ಚಲನ ವಿಶ್ವಸ್ತ ಸುಹೃದಾಶಯ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '46.ಅತಿಪೃಥುಲ ಬಹು ವಿಟಪಿ ಗಿರಿ ಧರಣಿ ವಿವರ ಯುಗಪದುದಯ ವಿವೃತ ಚಿತ್ರಪುಙ್ಗ ವೈಚಿತ್ರ್ಯ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '47.ವಿಪುಲ ಭುಜ ಶೈಲ ಮೂಲ ನಿಬಿಡ ನಿಪೀಡಿತ ರಾವಣ ರಣರಣಕ ಜನಕ ಚತುರುದಧಿ ವಿಹರಣ ಚತುರ ಕಪಿ-ಕುಲ ಪತಿ ಹೃದಯ ವಿಶಾಲ ಶಿಲಾತಲ-ದಾರಣ ದಾರುಣ ಶಿಲೀಮುಖ !'
              }
            />
            <SubHeader title="ಸುಂದರಕಾಂಡಂ" />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '48.ಅಪಾರ ಪಾರಾವಾರ ಪರಿಖಾ ಪರಿವೃತ ಪರಪುರ ಪರಿಸೃತ ದವ ದಹನ ಜವನ-ಪವನ-ಭವ ಕಪಿವರ ಪರಿಷ್ವಙ್ಗ ಭಾವಿತ ಸರ್ವಸ್ವ ದಾನ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '49.ಅಹಿತ ಸಹೋದರ ರಕ್ಷಃ ಪರಿಗ್ರಹ ವಿಸಂವಾದಿವಿವಿಧ ಸಚಿವ ವಿಪ್ರಲಮ್ಭ ಸಮಯ ಸಂರಮ್ಭ ಸಮುಜ್ಜೃಮ್ಭಿತ ಸರ್ವೇಶ್ವರ ಭಾವ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'50.ಸಕೃತ್ಪ್ರಪನ್ನ ಜನ ಸಂರಕ್ಷಣ ದೀಕ್ಷಿತ !'}
            />
            <St color={textColor} fontSize={font} line1={'51.ವೀರ !'} />
            <St color={textColor} fontSize={font} line1={'52.ಸತ್ಯವ್ರತ !'} />
            <St
              color={textColor}
              fontSize={font}
              line1={'53.ಪ್ರತಿಶಯನ ಭೂಮಿಕಾ ಭೂಷಿತ ಪಯೋಧಿ ಪುಲಿನ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'54.ಪ್ರಳಯ ಶಿಖಿ ಪರುಷ ವಿಶಿಖ ಶಿಖಾ ಶೋಷಿತಾಕೂಪಾರ ವಾರಿ ಪೂರ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '55.ಪ್ರಬಲ ರಿಪು ಕಲಹ ಕುತುಕ ಚಟುಲ ಕಪಿ-ಕುಲ ಕರ-ತಲತುಲಿತ ಹೃತ ಗಿರಿನಿಕರ ಸಾಧಿತ ಸೇತು-ಪಧ ಸೀಮಾ ಸೀಮನ್ತಿತ ಸಮುದ್ರ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '56.ದ್ರುತಗತಿ ತರು ಮೃಗ ವರೂಥಿನೀ ನಿರುದ್ಧ ಲಙ್ಕಾವರೋಧ ವೇಪಥು ಲಾಸ್ಯ ಲೀಲೋಪದೇಶ ದೇಶಿಕ ಧನುರ್ಜ್ಯಾಘೋಷ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '57.ಗಗನ-ಚರ ಕನಕ-ಗಿರಿ ಗರಿಮ-ಧರ ನಿಗಮ-ಮಯ ನಿಜ-ಗರುಡ ಗರುದನಿಲ ಲವ ಗಲಿತ ವಿಷ-ವದನ ಶರ ಕದನ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '58.ಅಕೃತಚರ ವನಚರ ರಣ ಕರಣ ವೈಲಕ್ಷ್ಯ ಕೂಣಿತಾಕ್ಷ ಬಹುವಿಧ ರಕ್ಷೋ ಬಲಾಧ್ಯಕ್ಷ ವಕ್ಷಃ ಕವಾಟ ಪಾಟನ ಪಟಿಮ ಸಾಟೋಪ ಕೋಪಾವಲೇಪ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '59.ಕಟುರಟದಟನಿ ಟಙ್ಕೃತಿ ಚಟುಲ ಕಠೋರ ಕಾರ್ಮುಕ ! ವಿಶಙ್ಕಟ ವಿಶಿಖ ವಿತಾಡನ ವಿಘಟಿತ ಮಕುಟ ವಿಹ್ವಲ ವಿಶ್ರವಸ್ತನಯವಿಶ್ರಮ ಸಮಯ ವಿಶ್ರಾಣನ ವಿಖ್ಯಾತ ವಿಕ್ರಮ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '60.ಕುಂಭಕರ್ಣ ಕುಲ ಗಿರಿ ವಿದಲನ ದಮ್ಭೋಲಿ ಭೂತ ನಿಃಶಙ್ಕ ಕಙ್ಕಪತ್ರ !'
              }
            />

            <St
              color={textColor}
              fontSize={font}
              line1={
                '61.ಅಭಿಚರಣ ಹುತವಹ ಪರಿಚರಣ ವಿಘಟನ ಸರಭಸ ಪರಿಪತದ್ ಅಪರಿಮಿತಕಪಿಬಲ ಜಲಧಿಲಹರಿ ಕಲಕಲ-ರವ ಕುಪಿತ ಮಘವ-ಜಿದಭಿಹನನ-ಕೃದನುಜ ಸಾಕ್ಷಿಕ ರಾಕ್ಷಸ ದ್ವನ್ದ್ವ-ಯುದ್ಧ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'62.ಅಪ್ರತಿದ್ವಂದ್ವ ಪೌರುಷ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'63.ತ್ರ್ಯಂಬಕ ಸಮಧಿಕ ಘೋರಾಸ್ತ್ರಾಡಮ್ಬರ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'64.ಸಾರಥಿ ಹೃತ ರಥ ಸತ್ರಪ ಶಾತ್ರವ ಸತ್ಯಾಪಿತ ಪ್ರತಾಪ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '65.ಶಿತಶರಕೃತಲವನದಶಮುಖ ಮುಖ ದಶಕ ನಿಪತನ ಪುನರುದಯ ದರಗಲಿತ ಜನಿತ ದರ ತರಲ ಹರಿ-ಹಯ ನಯನ ನಲಿನ-ವನ ರುಚಿ-ಖಚಿತ ನಿಪತಿತ ಸುರ-ತರು ಕುಸುಮ ವಿತತಿ ಸುರಭಿತ ರಥ ಪಥ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '66.ಅಖಿಲ ಜಗದಧಿಕ ಭುಜ ಬಲ ವರ ಬಲ ದಶ-ಲಪನ ಲಪನ ದಶಕ ಲವನ-ಜನಿತ ಕದನ ಪರವಶ ರಜನಿ-ಚರ ಯುವತಿ ವಿಲಪನ ವಚನ ಸಮವಿಷಯ ನಿಗಮ ಶಿಖರ ನಿಕರ ಮುಖರ ಮುಖ ಮುನಿ-ವರ ಪರಿಪಣಿತ!'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '67.ಅಭಿಗತ ಶತಮಖ ಹುತವಹ ಪಿತೃಪತಿ ನಿರೃತಿ ವರುಣ ಪವನ ಧ ನದಗಿರಿಶಪ್ರಮುಖ ಸುರಪತಿ ನುತಿ ಮುದಿತ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'68.ಅಮಿತ ಮತಿ ವಿಧಿ ವಿದಿತ ಕಥಿತ ನಿಜ ವಿಭವ ಜಲಧಿ ಪೃಷತ ಲವ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'69.ವಿಗತ ಭಯ ವಿಬುಧ ವಿಬೋಧಿತ ವೀರ ಶಯನ ಶಾಯಿತ ವಾನರ ಪೃತನೌಘ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'70.ಸ್ವ ಸಮಯ ವಿಘಟಿತ ಸುಘಟಿತ ಸಹೃದಯ ಸಹಧರ್ಮಚಾರಿಣೀಕ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'71.ವಿಭೀಷಣ ವಶಂವದೀ-ಕೃತ ಲಙ್ಕೈಶ್ವರ್ಯ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'72.ನಿಷ್ಪನ್ನ ಕೃತ್ಯ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'73.ಖ ಪುಷ್ಪಿತ ರಿಪು ಪಕ್ಷ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'74.ಪುಷ್ಪಕ ರಭಸ ಗತಿ ಗೋಷ್ಪದೀ-ಕೃತ ಗಗನಾರ್ಣವ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '75.ಪ್ರತಿಜ್ಞಾರ್ಣವ ತರಣ ಕೃತ ಕ್ಷಣ ಭರತ ಮನೋರಥ ಸಂಹಿತ ಸಿಂಹಾಸನಾಧಿರೂಢ !'
              }
            />
            <St color={textColor} fontSize={font} line1={'76.ಸ್ವಾಮಿನ್ !'} />
            <St color={textColor} fontSize={font} line1={'77.ರಾಘವ ಸಿಂಹ !'} />
            <SubHeader title={'ಉತ್ತರಕಾಂಡಂ'} />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '78.ಹಾಟಕ ಗಿರಿ ಕಟಕ ಲಡಹ ಪಾದ ಪೀಠ ನಿಕಟ ತಟ ಪರಿಲುಠಿತ ನಿಖಿಲನೃಪತಿ ಕಿರೀಟ ಕೋಟಿ ವಿವಿಧ ಮಣಿ ಗಣ ಕಿರಣ ನಿಕರ ನೀರಾಜಿತಚರಣ ರಾಜೀವ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'79.ದಿವ್ಯ ಭೌಮಾಯೋಧ್ಯಾಧಿದೈವತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '80.ಪಿತೃ ವಧ ಕುಪಿತ ಪರಶು-ಧರ ಮುನಿ ವಿಹಿತ ನೃಪ ಹನನ ಕದನ ಪೂರ್ವಕಾಲಪ್ರಭವ ಶತ ಗುಣ ಪ್ರತಿಷ್ಠಾಪಿತ ಧಾರ್ಮಿಕ ರಾಜ ವಂಶ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '81.ಶುಭಚರಿತ ರತ ಭರತ ಖರ್ವಿತ ಗರ್ವ ಗನ್ಧರ್ವ ಯೂಥ ಗೀತ ವಿಜಯ ಗಾಥಾಶತ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'82.ಶಾಸಿತ ಮಧು-ಸುತ ಶತ್ರುಘ್ನ ಸೇವಿತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'83.ಕುಶ ಲವ ಪರಿಗೃಹೀತ ಕುಲ ಗಾಥಾ ವಿಶೇಷ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '84.ವಿಧಿ ವಶ ಪರಿಣಮದಮರ ಭಣಿತಿ ಕವಿವರ ರಚಿತ ನಿಜ ಚರಿತನಿಬನ್ಧನ ನಿಶಮನ ನಿರ್ವೃತ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'85.ಸರ್ವ ಜನ ಸಮ್ಮಾನಿತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '86.ಪುನರುಪಸ್ಥಾಪಿತ ವಿಮಾನ ವರ ವಿಶ್ರಾಣನ ಪ್ರೀಣಿತ ವೈಶ್ರವಣ ವಿಶ್ರಾವಿತ ಯಶಃ ಪ್ರಪಞ್ಚ !'
              }
            />

            <St
              color={textColor}
              fontSize={font}
              line1={'87.ಪಞ್ಚತಾಪನ್ನ ಮುನಿಕುಮಾರ ಸಞ್ಜೀವನಾಮೃತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'88.ತ್ರೇತಾಯುಗ ಪ್ರವರ್ತಿತ ಕಾರ್ತಯುಗ ವೃತ್ತಾನ್ತ !'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '89.ಅವಿಕಲ ಬಹುಸುವರ್ಣ ಹಯ-ಮಖ ಸಹಸ್ರ ನಿರ್ವಹಣ ನಿರ್ವರ್ತಿತ ನಿಜವರ್ಣಾಶ್ರಮ ಧರ್ಮ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'90.ಸರ್ವ ಕರ್ಮ ಸಮಾರಾಧ್ಯ !'}
            />
            <St color={textColor} fontSize={font} line1={'91.ಸನಾತನ ಧರ್ಮ !'} />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '92.ಸಾಕೇತ ಜನಪದ ಜನಿ ಧನಿಕ ಜಙ್ಗಮ ತದಿತರ ಜನ್ತು ಜಾತ ದಿವ್ಯ ಗತಿ ದಾನ ದರ್ಶಿತ ನಿತ್ಯ ನಿಸ್ಸೀಮ ವೈಭವ !'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'93.ಭವ ತಪನ ತಾಪಿತ ಭಕ್ತಜನ ಭದ್ರಾರಾಮ !'}
            />
            <St color={textColor} fontSize={font} line1={'94.ಶ್ರೀ ರಾಮಭದ್ರ !'} />
            <St
              color={textColor}
              fontSize={font}
              line1={'95.ನಮಸ್ತೇ ಪುನಸ್ತೇ ನಮಃ ॥'}
            />
            <St color={textColor} fontSize={font} line1={'96.ಅಸಹಾಯ ಶೂರ !'} />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '97.ಚತುರ್ಮುಖೇಶ್ವರಮುಖೈಃ ಪುತ್ರ ಪೌತ್ರಾದಿ ಶಾಲಿನೇ । ನಮಃ ಸೀತಾ ಸಮೇತಾಯ ರಾಮಾಯ ಗೃಹಮೇಧಿನೇ ॥'
              }
            />
            <St
              color={textColor}
              fontSize={font}
              line1={
                '98.ಕವಿಕಥಕ ಸಿಂಹಕಥಿತಂ ಕಠೋತ ಸುಕುಮಾರ ಗುಮ್ಭ ಗಮ್ಭೀರಮ್ । ಭವ ಭಯ ಭೇಷಜಮೇತತ್ ಪಠತ ಮಹಾವೀರ ವೈಭವಂ ಸುಧಿಯಃ ॥'
              }
            />
          </View>
        </ScrollView>

        <Admob />
      </View>
    </Container>
  );
};

export default RaghuveeraGadya;
