import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomIcon = ({ onPress, name, size, library, color, style }) => {
  const iconLibraries = {
    AntDesign: AntDesignIcon,
    Feather: FeatherIcon,
    FontAwesome: FontAwesomeIcon,
    MaterialCommunityIcons: MaterialCommunityIcon,
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
    "FontAwesome",
    "MaterialCommunityIcons",
  ]).isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

export default CustomIcon;
