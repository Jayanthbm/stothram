import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
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
      name="chevron-left"
      size={24}
      library="Feather"
      style={styles.headerIcon}
    />
  );

  return renderButton;
};

CustomHeaderLeft.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CustomHeaderLeft;
