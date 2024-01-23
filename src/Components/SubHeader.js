/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {ThemeContext} from '../providers/ThemeProvider';
const SubHeader = props => {
  const {headerBackground} = useContext(ThemeContext);
  return (
    <React.Fragment>
      <View
        style={{
          backgroundColor: headerBackground,
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
          }}>
          {props.title}
        </Text>
      </View>
    </React.Fragment>
  );
};

export default React.memo(SubHeader);
