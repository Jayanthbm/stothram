/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, BackHandler, ScrollView} from 'react-native';
import {Container} from 'native-base';

import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const HareKrishnaMantram = ({navigation}) => {
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
          title={'ಹರೇ ಕೃಷ್ಣ ಮಂತ್ರಂ'}
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
              line1={'ಹರೇ ಕೃಷ್ಣ ಹರೇ ಕೃಷ್ಣ'}
            />
            <St
              color={textColor}
              fontSize={font}
              line1={'ಕೃಷ್ಣ ಕೃಷ್ಣ ಹರೇ ಹರೇ |'}
            />
            <St color={textColor} fontSize={font} line1={'ಹರೇ ರಾಮ ಹರೇ ರಾಮ'} />

            <St
              color={textColor}
              fontSize={font}
              line1={'ರಾಮ ರಾಮ ಹರೇ ಹರೇ ||'}
            />
          </View>
        </ScrollView>

        <Admob />
      </View>
    </Container>
  );
};

export default HareKrishnaMantram;
