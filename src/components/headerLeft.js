import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import CustomIcon from "./customIcon";
const styles = StyleSheet.create({
  headerIcon: {
    marginLeft: 15,
    color: "#fff",
  },
});
const CustomHeaderLeft = ({ navigation }) => {
  const renderButton = navigation.goBack && (
    <CustomIcon
      onPress={() => navigation.goBack()}
      name="rupee"
      size={24}
      library="AntDesign"
      style={styles.headerIcon}
    />
  );

  return renderButton;
};

CustomHeaderLeft.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CustomHeaderLeft;
