import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types"; // Import PropTypes
import { ThemeContext } from "../contexts/themeContext";

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
  const { textColor } = useContext(ThemeContext);

  // Provide a default icon if not passed
  const iconName = icon || "info";

  return (
    <View style={styles.listHeaderContainer}>
      <FontAwesomeIcon
        name={iconName}
        style={styles.listHeaderIcon}
        color={textColor}
      />
      <Text style={[styles.listHeaderText, { color: textColor }]}>{title}</Text>
    </View>
  );
};

// Add PropTypes for title and icon
ListHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default ListHeader;
