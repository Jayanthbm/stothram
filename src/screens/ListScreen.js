import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Admob from "../components/admob";
import CustomHeaderLeft from "../components/headerLeft";
import CustomHeaderRight from "../components/headerRight";
import { SCREEN_NAMES } from "../constants";
import { ThemeContext } from "../contexts/themeContext";
import { commonNavigationOptions } from "../navigationOptions";
import { dataHelper } from "../utils/dataUtils";
const ListScreen = ({ navigation, route }) => {
  const { type } = route.params;
  const { backgroundColor, headerBackground, textColor, darkmode, viewType } =
    useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [dataUrl, setDataUrl] = useState(null);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(list);
  useEffect(() => {
    navigation.setOptions({
      title: title,
      ...commonNavigationOptions(headerBackground),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      headerRight: () => (
        <CustomHeaderRight navigation={navigation} showSettings={true} />
      ),
    });
  }, [navigation, title, headerBackground]);

  useEffect(() => {
    setTitle(type?.title);
    setDataUrl(type?.dataUrl);
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await dataHelper(
        title,
        dataUrl,
        SCREEN_NAMES.LIST_SCREEN
      );
      if (fetchedData) {
        setList(fetchedData?.data);
      }
    };

    if (dataUrl) {
      fetchData();
    }
  }, [dataUrl]);

  useEffect(() => {
    setFilteredData(list);
  }, [list]);

  const handleSearch = (text) => {
    setSearchValue(text);
    const newData = list.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(newData);
  };
  const handleItemClick = (item) => {
    navigation.navigate("Reader", { item });
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View
        style={[styles.searchContainer, { backgroundColor: backgroundColor }]}
      >
        <FontAwesomeIcon
          name="search"
          size={26}
          color={textColor}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={textColor}
          onChangeText={handleSearch}
          value={searchValue}
          style={[
            styles.searchInput,
            {
              backgroundColor: backgroundColor,
              color: textColor,
            },
          ]}
        />
      </View>
      <>
        {viewType === "list" ? (
          <ScrollView>
            {filteredData?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.listItem,
                  { borderBottomColor: darkmode ? "#706f69" : "#eee" },
                ]}
                onPress={() => handleItemClick(item)}
              >
                <Text style={[styles.listTextStyle, { color: textColor }]}>
                  {item.displayTitle}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <></>
        )}
      </>

      <Admob />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    paddingVertical: 15,
    fontSize: 20,
    marginLeft: 10,
  },
  listItem: {
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    borderBottomWidth: 2,
  },
  listTextStyle: {
    fontSize: 18,
    fontWeight: "500",
  },
  noResultsContainer: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  noResults: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default ListScreen;
