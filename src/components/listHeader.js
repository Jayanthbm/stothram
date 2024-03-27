import PropTypes from "prop-types"; // Import PropTypes
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../contexts/themeContext";
import { COLOR_SCHEME } from "../styles/styles";
import CustomIcon from './customIcon';

const styles = StyleSheet.create({
  listHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  listHeaderIcon: {
    fontSize: 25,
    marginRight: 10,
  },
  listHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ListHeader = ({ title, icon }) => {
  const { darkmode } = useContext(ThemeContext);

  // Provide a default icon if not passed
  const iconName = icon || "info";

  return (
    <View style={styles.listHeaderContainer}>
      <CustomIcon
        library="Feather"
        name={iconName}
        style={styles.listHeaderIcon}
        color={COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor}
      />
      <Text style={[styles.listHeaderText, {color: COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor}]}>{title}</Text>
    </View>
  );
};

// Add PropTypes for title and icon
ListHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default ListHeader;
