/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import St from '../Components/St';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import SliderComponent from '../Components/SliderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const HareKrishnaMantram = ({navigation}) => {
  const {backgroundColor, textColor, font} = useContext(ThemeContext);

  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <HeaderComponent
        navigation={navigation}
        back={'BhajaneScreen'}
        title={'ಹರೇ ಕೃಷ್ಣ ಮಂತ್ರಂ'}
      />
      <SliderComponent />
      <ScrollView>
        <View
          style={{
            marginLeft: 7,
            marginRight: 1,
          }}>
          <St color={textColor} fontSize={font} line1={'ಹರೇ ಕೃಷ್ಣ ಹರೇ ಕೃಷ್ಣ'} />
          <St
            color={textColor}
            fontSize={font}
            line1={'ಕೃಷ್ಣ ಕೃಷ್ಣ ಹರೇ ಹರೇ |'}
          />
          <St color={textColor} fontSize={font} line1={'ಹರೇ ರಾಮ ಹರೇ ರಾಮ'} />

          <St color={textColor} fontSize={font} line1={'ರಾಮ ರಾಮ ಹರೇ ಹರೇ ||'} />
        </View>
      </ScrollView>

      <Admob />
    </View>
  );
};

export default HareKrishnaMantram;
