import React from 'react';

import PropTypes from 'prop-types';

import { Image, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { GPAY_LOGO, PAYTM_LOGO, PHONEPE_LOGO, UPI_LOGO } from '../constants';

const nameImageMapper = {
  PAYTM: PAYTM_LOGO,
  GPAY: GPAY_LOGO,
  PHONEPE: PHONEPE_LOGO,
  BHIM: UPI_LOGO,
};
const ImageButton = ({url, name, disabled, onPress}) => {
  if (!url) {
    url = nameImageMapper[name];
  }


  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={{padding: 5}}>
        <Image source={{uri: url}} style={{width: 45, height: 45}} />
      </View>
    </TouchableOpacity>
  );
};

ImageButton.propTypes = {
  url: PropTypes.string,
  onPress: PropTypes.func,
  name: (props, propName, componentName) => {
    if (!props.url && !props[propName]) {
      return new Error(
        `One of props 'url' or 'name' is required in '${componentName}'.`,
      );
    }
    if (props[propName] && !nameImageMapper[props[propName]]) {
      return new Error(
        `Invalid '${propName}' value in '${componentName}'. Should be one of ${Object.keys(
          nameImageMapper,
        ).join(', ')}.`,
      );
    }
  },
  disabled: PropTypes.bool,
};
export default React.memo(ImageButton);