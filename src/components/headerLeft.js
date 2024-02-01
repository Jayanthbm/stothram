import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
const CustomHeaderLeft = ({ navigation }) => {
  // Conditionally render TouchableOpacity based on navigation.goBack() existence
  const renderButton = navigation.goBack && (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesignIcon name="left" size={24} style={styles.headerIcon} />
    </TouchableOpacity>
  );

  return renderButton;
};

CustomHeaderLeft.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = {
  headerIcon: {
    marginLeft: 15,
    color: "#fff",
  },
};

export default CustomHeaderLeft;
