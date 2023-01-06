/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import HeaderComponent from './HeaderComponent';
import SliderComponent from './SliderComponent';
import Admob from './Admob';

import {ThemeContext} from '../providers/ThemeProvider';

const StWrapper = props => {
  const {backgroundColor} = useContext(ThemeContext);
  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <React.Fragment>
        <HeaderComponent
          navigation={props.navigation}
          back={props.back}
          title={props.title}
        />
        <SliderComponent />
        <ScrollView>
          <View
            style={{
              marginLeft: 7,
              marginRight: 1,
            }}>
            {props.children}
          </View>
        </ScrollView>
        <Admob />
      </React.Fragment>
    </View>
  );
};

export default React.memo(StWrapper);
