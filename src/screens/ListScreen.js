import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Admob from "../components/admob";
import CustomIcon from '../components/customIcon';
import CustomHeaderLeft from "../components/headerLeft";
import CustomHeaderRight from "../components/headerRight";
import { SCREEN_NAMES } from "../constants";
import { ThemeContext } from "../contexts/themeContext";
import { commonNavigationOptions } from "../navigationOptions";
import { commonStyles } from "../styles/styles";
import { dataHelper, preFetcher } from "../utils/dataUtils";
// Function to generate styles dynamically based on context values
const generateStyles = (
  backgroundColor = "#FFF",
  textColor,
  darkmode = false
) => {
  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: backgroundColor,
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
      backgroundColor: backgroundColor,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      paddingVertical: 10,
      fontSize: 20,
      marginLeft: 10,
      backgroundColor: backgroundColor,
      color: textColor,
    },
    listItem: {
      marginLeft: 10,
      paddingTop: 10,
      paddingBottom: 5,
      paddingLeft: 5,
      borderBottomWidth: 2,
      borderBottomColor: darkmode ? "#b8b6ab" : "#8f8f8f",
    },
    listTextStyle: {
      fontSize: 16,
      fontWeight: "700",
      color: textColor,
    },
    cardContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginLeft: 2,
      justifyContent: "space-between",
    },
    card: {
      width: "48%",
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      overflow: "hidden",
      borderColor: darkmode ? "#b8b6ab" : "#8f8f8f",
    },
    cardImage: {
      width: 180,
      height: 80,
      resizeMode: "cover",
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "700",
      textAlign: "center",
      padding: 5,
      color: textColor,
    },
    noDataContainer: {
      marginTop: 20,
      marginLeft: 5,
      marginRight: 5,
    },
    noDataText: {
      fontSize: 20,
      textAlign: "center",
      color: textColor,
    },
    noDataTextButton: {
      fontSize: 20,
      textAlign: "center",
      color: "#ADD8E6",
    },
  });
};
// ListScreen Component
const ListScreen = ({ navigation, route }) => {
  // Context and State
  const { backgroundColor, headerBackground, textColor, darkmode, viewType } =
    useContext(ThemeContext);
  const { type } = route.params;
  const [title, setTitle] = useState('');
  const [dataUrl, setDataUrl] = useState(null);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(list);
  const [rendered, setRendered] = useState(false);

  // Set Navigation Options
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

  // Set Title and Data URL
  useEffect(() => {
    setTitle(type?.title);
    setDataUrl(type?.dataUrl);
  }, [type]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await dataHelper(
        title,
        dataUrl,
        SCREEN_NAMES.LIST_SCREEN,
      );
      if (fetchedData) {
        setList(fetchedData?.data);
        // Prefetch data for the Reader screen
        preFetcher(fetchedData?.data, SCREEN_NAMES.READER_SCREEN);
      }
    };

    if (dataUrl) {
      fetchData();
    }
  }, [dataUrl]);

  // Update Filtered Data when List Changes
  useEffect(() => {
    setFilteredData(list);
  }, [list]);

  // Filter Data based on Search Text
  const filterData = (data, searchText) => {
    return data.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  // Handle Search Input
  const handleSearch = text => {
    setSearchValue(text);
    const newData = filterData(list, text);
    setRendered(true);
    setFilteredData(newData);
  };

  // Handle Item Click
  const handleItemClick = useCallback(
    item => {
      navigation.navigate('Reader', { item });
    },
    [navigation],
  );

  // Generate styles based on current context values
  const styles = generateStyles(backgroundColor, textColor, darkmode);

  // Define a key extractor function
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  // Define renderItem functions for list and card views
  // Memoized ListItem Component
  const MemoizedListItem = React.memo(({ item }) => {
    const { displayTitle } = item;
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleItemClick(item)}>
        <Text style={styles.listTextStyle}>{displayTitle}</Text>
      </TouchableOpacity>
    );
  });
  // Memoized CardItem Component
  const MemoizedCardItem = React.memo(({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          marginLeft: index % 2 === 0 ? 4 : 0,
          marginRight: index % 2 === 0 ? 0 : 4,
        },
      ]}
      onPress={() => handleItemClick(item)}>
      <Image
        source={require('../assets/images/god.webp')}
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle}>
        {item.displayTitle ? item.displayTitle : item.title}
      </Text>
    </TouchableOpacity>
  ));

  // Render Component
  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <CustomIcon
          name="search"
          size={26}
          color={textColor}
          style={styles.searchIcon}
          library="Feather"
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
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) =>
          viewType === 'list' ? (
            <MemoizedListItem item={item} />
          ) : (
            <MemoizedCardItem item={item} index={index} />
          )
        }
        numColumns={viewType === 'list' ? 1 : 2}
        extraData={viewType} // Add extraData to trigger a re-render when viewType changes
        ListEmptyComponent={() => (
          <View style={styles.noDataContainer}>
            {rendered && (
              <>
                <Text style={styles.noDataText}>No data found</Text>
                <Text
                  style={styles.noDataTextButton}
                  onPress={() => {
                    setSearchValue('');
                    handleSearch('');
                  }}>
                  Clear
                </Text>
              </>
            )}
          </View>
        )}
        key={viewType}
      />

      {/* Display Admob component */}
      <Admob />
    </View>
  );
};

export default ListScreen;