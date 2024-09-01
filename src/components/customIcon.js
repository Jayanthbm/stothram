import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@react-native-vector-icons/ant-design';
import Feather from '@react-native-vector-icons/feather';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const CustomIcon = ({ onPress, name, size, library, color, style }) => {
  const iconLibraries = {
    AntDesign: AntDesign,
    Feather: Feather,
    FontAwesome: FontAwesome,
  };

  const IconComponent = iconLibraries[library];

  if (!IconComponent) {
    console.error(`Unsupported icon library: ${library}`);
    return null;
  }

  const renderIcon = (
    <IconComponent name={name} size={size} color={color} style={style} />
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{renderIcon}</TouchableOpacity>;
  }

  return renderIcon;
};

CustomIcon.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  library: PropTypes.oneOf(['AntDesign', 'Feather', 'FontAwesome']).isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

export default CustomIcon;
