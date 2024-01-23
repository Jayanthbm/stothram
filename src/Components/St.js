/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {ThemeContext} from '../providers/ThemeProvider';

const St = props => {
  const {textColor, font} = useContext(ThemeContext);
  return (
    <React.Fragment>
      <View
        style={{
          marginEnd: 5,
          marginStart: 3,
        }}>
        <Text
          style={{
            color: textColor,
            fontSize: font,
            fontWeight: '700',
          }}>
          {props.line1 ? props.line1 + '\n' : ''}
          {props.line2 ? props.line2 + '\n' : ''}
          {props.line3 ? props.line3 + '\n' : ''}
          {props.line4 ? props.line4 + '\n' : ''}
          {props.line5 ? props.line5 + '\n' : ''}
          {props.line6 ? props.line6 + '\n' : ''}
          {props.line7 ? props.line7 + '\n' : ''}
          {props.line8 ? props.line8 + '\n' : ''}
          {props.line9 ? props.line9 + '\n' : ''}
          {props.line10 ? props.line10 + '\n' : ''}
          {props.line11 ? props.line11 + '\n' : ''}
          {props.line12 ? props.line12 + '\n' : ''}
          {props.line13 ? props.line13 + '\n' : ''}
          {props.line14 ? props.line14 + '\n' : ''}
          {props.line15 ? props.line15 + '\n' : ''}
        </Text>
      </View>
    </React.Fragment>
  );
};

export default React.memo(St);
