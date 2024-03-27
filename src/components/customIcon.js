import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const CustomIcon = ({ onPress, name, size, library, color, style }) => {
  const iconLibraries = {
    AntDesign: AntDesignIcon,
    Feather: FeatherIcon,
    FontAwesome: FontAwesomeIcon
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
  library: PropTypes.oneOf([
    "AntDesign",
    "Feather",
    "FontAwesome"
  ]).isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

export default CustomIcon;
