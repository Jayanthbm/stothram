import PropTypes from "prop-types";
import React, { useContext } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../contexts/themeContext";

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listItemContent: {
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  listItemTitle: {
    fontSize: 14,
  },
  listItemSubtitle: {
    fontSize: 12,
  },
});

const ListItem = ({ title, subtitle, toggle, state }) => {
  const { textColor, darkmode } = useContext(ThemeContext);

  // Provide default values for optional props
  const renderSubtitle = subtitle && (
    <Text style={[styles.listItemSubtitle, { color: textColor }]}>
      {subtitle}
    </Text>
  );

  return (
    <TouchableOpacity
      onPress={toggle}
      style={styles.listItemContainer}
      underlayColor={darkmode ? "#9e9b92" : "#b8b6ab"}
    >
      <View
        style={[
          styles.listItemContent,
          { borderBottomColor: darkmode ? "#b8b6ab" : "#8f8f8f" },
        ]}
      >
        <Text style={[styles.listItemTitle, { color: textColor }]}>
          {title}
        </Text>
        {renderSubtitle}
      </View>
      {toggle && (
        <Switch
          value={state}
          onValueChange={toggle}
          trackColor={{ false: "#ccc", true: "#81b0ff" }}
          thumbColor={state ? "#5098E6" : "#f4f3f4"}
        />
      )}
    </TouchableOpacity>
  );
};

// PropTypes for better documentation
ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  toggle: PropTypes.func,
  state: PropTypes.bool,
};

export default ListItem;
