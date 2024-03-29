import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemeContext } from "../contexts/themeContext";

import Admob from "../components/admob";
import CustomIcon from '../components/customIcon';
import CustomHeaderLeft from "../components/headerLeft";
import ListHeader from "../components/listHeader";
import ListItem from "../components/listItem";
import { CACHED_DATA_KEYS, DATA_URLS, SCREEN_NAMES } from "../constants";
import { commonNavigationOptions } from "../navigationOptions";
import { COLOR_SCHEME, commonStyles } from "../styles/styles";
import { dataHelper } from "../utils/dataUtils";

// Function to generate styles dynamically based on context values
const generateStyles = (backgroundColor, textColor) => {
  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: backgroundColor,
    },
    shareContainer: {
      marginTop: 10,
      marginBottom:10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    madeInIndiaContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginBottom: 5,
    },
    madeInIndiaContainerIcon: {
      color: "red",
      fontSize: 25,
      marginTop: 1,
    },
    madeInIndiaContainerText: {
      color: textColor,
      fontSize: 20,
    },
  });
};

const SettingsScreen = React.memo(({ navigation }) => {
  const {
    toggleDarkMode,
    darkmode,
    toggleDarkSwitch,
    darkSwitch,
  } = useContext(ThemeContext);

  const [contributions, setContributions] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await dataHelper(
        CACHED_DATA_KEYS.SETTINGS_SCREEN,
        DATA_URLS.SETTINGS_SCREEN,
        SCREEN_NAMES.SETTINGS_SCREEN
      );
      // Update state with fetched contributions
      if (fetchedData) {
        setContributions(fetchedData?.contributions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Set navigation options including the headerLeft component
    navigation.setOptions({
      title: 'Settings',
      ...commonNavigationOptions(
        COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headerBackground,
        COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext,
      ),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
    });
  }, [navigation, darkmode]);

  // Function to handle sharing the app
  const onShare = async () => {
    try {
      await Share.share({
        message:
          "https://play.google.com/store/apps/details?id=com.jayanth.shotram",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Generate styles based on current context values
  const styles = generateStyles(
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].backgroundColor,
    COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor,
  );

  // Memoized version of ListItem component
  const MemoizedListItem = React.memo(ListItem);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* General Settings */}
        <ListHeader title="General Settings" icon={'settings'} />

        {/* Memoized version of ListItem */}
        <MemoizedListItem
          title="Dark theme"
          subtitle="Reduce glare and improve night viewing"
          toggle={toggleDarkMode}
          state={darkmode}
        />
        <MemoizedListItem
          title="Toggle in Every Page"
          subtitle="Show option to toggle dark mode in every screen"
          toggle={toggleDarkSwitch}
          state={darkSwitch}
        />

        {/* Contributions */}
        <ListHeader title="Contributions" icon={'info'} />
        {contributions?.map(({name, role}) => (
          <MemoizedListItem title={name} subtitle={role} key={name} />
        ))}
        <View style={styles.shareContainer}>
          <CustomIcon
            name="share"
            library="Feather"
            size={24}
            color={COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor}
          />
          <Text style={commonStyles.textButton} onPress={onShare}>
            Share App with friends/family
          </Text>
        </View>
      </ScrollView>
      {/* Share and Made in India section */}
      <React.Fragment>
        <View style={styles.madeInIndiaContainer}>
          <Text style={styles.madeInIndiaContainerText}>Made With {''}</Text>
          {/* CustomIcon component for heart icon */}
          <CustomIcon
            name="heart"
            library="AntDesign"
            style={styles.madeInIndiaContainerIcon}
          />
          <Text style={styles.madeInIndiaContainerText}> In India</Text>
        </View>
        {/* Admob */}
        <Admob />
      </React.Fragment>
    </View>
  );
});

export default SettingsScreen;