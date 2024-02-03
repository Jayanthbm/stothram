import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Admob from "../components/admob";
import CustomIcon from '../components/customIcon';
import CustomHeaderRight from "../components/headerRight";
import { CACHED_DATA_KEYS, DATA_URLS, SCREEN_NAMES } from "../constants";
import { ThemeContext } from "../contexts/themeContext";
import { commonNavigationOptions } from "../navigationOptions";
import { commonStyles } from "../styles/styles";
import {
  dataHelper,
  preFetcher,
  storeItem,
  storeJSON,
} from "../utils/dataUtils";
// Function to generate styles dynamically based on context values
const generateStyles = (backgroundColor = "#FFF") => {
  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: backgroundColor,
    },
    typeContainer: {
      flex: 1,
      margin: 8,
      borderRadius: 10,
      borderWidth: 1,
    },
    typeItem: {
      padding: 20,
    },
    iconContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    typeIcon: {
      color: "#fff",
      marginBottom: 10,
    },
    typeTitle: {
      color: "#fff",
      fontSize: 18,
    },
  });
};

const HomeScreen = ({ navigation }) => {
  const { darkmode, backgroundColor, headerBackground } =
    useContext(ThemeContext);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await dataHelper(
          CACHED_DATA_KEYS.HOME_SCREEN,
          DATA_URLS.HOME_SCREEN,
          SCREEN_NAMES.HOME_SCREEN,
        );
        if (fetchedData) {
          setTypes(fetchedData?.data);
          storeItem(CACHED_DATA_KEYS.UPI_ID, fetchedData?.UPI_ID);
          storeJSON(CACHED_DATA_KEYS.UPI_DATA, fetchedData?.upi_data);
          preFetcher(fetchedData?.data, SCREEN_NAMES.LIST_SCREEN);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Set navigation options when the headerBackground changes
    navigation.setOptions({
      title: "Stothram",
      ...commonNavigationOptions(headerBackground),
      headerRight: () => (
        <CustomHeaderRight navigation={navigation} showSettings={true} />
      ),
    });
  }, [navigation, headerBackground]);

  const confirmExit = useCallback(() => {
    Alert.alert("Hold on!", "Do you want to Exit Stothram?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
  }, []);

  useEffect(() => {
    // Handle hardware back press event
    const backAction = () => {
      // Confirm exit when the hardware back button is pressed
      confirmExit();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // Generate styles based on current context values
  const styles = generateStyles(backgroundColor);

  const handleTypePress = useCallback(
    (type) => {
      navigation.navigate("List", { type });
    },
    [navigation]
  );

  // Render each type item in the FlatList
  const renderTypeItem = ({ item }) => {
    const typeContainerStyle = {
      borderColor: darkmode ? item.darkBackground : item.lightBackground,
    };

    const typeItemStyle = {
      backgroundColor: darkmode ? item.darkBackground : item.lightBackground,
    };
    return (
      <TouchableOpacity
        onPress={() => handleTypePress(item)}
        style={[styles.typeContainer, typeContainerStyle]}>
        <View style={[styles.typeItem, typeItemStyle]}>
          <View style={styles.iconContainer}>
            <CustomIcon
              name={item.icon}
              library="AntDesign"
              size={60}
              style={styles.typeIcon}
            />
            <Text style={styles.typeTitle}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Display types in a FlatList */}
      <FlatList
        data={types}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTypeItem}
        numColumns={2}
        style={{
          marginTop: 25,
        }}
      />
      {/* Display Admob component */}
      <Admob />
    </View>
  );
};

export default HomeScreen;