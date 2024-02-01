import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Image,
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
import { dataHelper, preFetcher } from "../utils/dataUtils";
import { commonStyles } from "../styles/styles";

const ListScreen = ({ navigation, route }) => {
  const { backgroundColor, headerBackground, textColor, darkmode, viewType } =
    useContext(ThemeContext);
  const { type } = route.params;
  const [title, setTitle] = useState("");
  const [dataUrl, setDataUrl] = useState(null);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(list);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: title,
      ...commonNavigationOptions(headerBackground),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      headerRight: () => (
        <CustomHeaderRight navigation={navigation} showViewToggle={true} />
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
        preFetcher(fetchedData?.data, SCREEN_NAMES.READER_SCREEN);
      }
    };

    if (dataUrl) {
      fetchData();
    }
  }, [dataUrl]);

  useEffect(() => {
    setFilteredData(list);
  }, [list]);

  const filterData = (data, searchText) => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleSearch = (text) => {
    setSearchValue(text);
    const newData = filterData(list, text);
    setRendered(true);
    setFilteredData(newData);
  };

  const handleItemClick = useCallback(
    (item) => {
      navigation.navigate("Reader", { item });
    },
    [navigation]
  );

  const styles = StyleSheet.create({
    // ... your existing styles
  });

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleItemClick(item)}
    >
      <Text style={styles.listTextStyle}>{item.displayTitle}</Text>
    </TouchableOpacity>
  );

  const renderCardItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          marginLeft: index % 2 === 0 ? 4 : 0,
          marginRight: index % 2 === 0 ? 0 : 4,
        },
      ]}
      onPress={() => handleItemClick(item)}
    >
      <Image
        source={require("../assets/images/god.webp")}
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle}>
        {item.displayTitle ? item.displayTitle : item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
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
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={viewType === "list" ? renderListItem : renderCardItem}
        numColumns={viewType === "list" ? 1 : 2}
        ListEmptyComponent={() => (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data found</Text>
            <Text
              style={styles.noDataTextButton}
              onPress={() => {
                setSearchValue("");
                handleSearch("");
              }}
            >
              Clear
            </Text>
          </View>
        )}
      />
      <Admob />
    </View>
  );
};

export default ListScreen;
