import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Admob from '../components/admob';
import CustomHeaderLeft from '../components/headerLeft';
import CustomHeaderRight from '../components/headerRight';
import {SCREEN_NAMES} from '../constants';
import {ThemeContext} from '../contexts/themeContext';
import {commonNavigationOptions} from '../navigationOptions';
import {dataHelper, preFetcher} from '../utils/dataUtils';
import {commonStyles} from '../styles/styles';

// ListScreen Component
const ListScreen = ({ navigation, route }) => {
  // Context and State
  const {backgroundColor, headerBackground, textColor, darkmode, viewType} =
    useContext(ThemeContext);
  const {type} = route.params;
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
  const handleItemClick = item => {
    navigation.navigate('Reader', {item});
  };

  // Render Component
  return (
    <View style={[commonStyles.container, {backgroundColor: backgroundColor}]}>
      {/* Search Input */}
      <View
        style={[styles.searchContainer, {backgroundColor: backgroundColor}]}>
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
      <ScrollView>
        {/* Render List or Cards based on View Type */}
        <>
          {viewType == 'list' ? (
            <>
              {filteredData?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.listItem,
                    {borderBottomColor: darkmode ? '#b8b6ab' : '#8f8f8f'},
                  ]}
                  onPress={() => handleItemClick(item)}>
                  <Text style={[styles.listTextStyle, {color: textColor}]}>
                    {item.displayTitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              <View style={styles.cardContainer}>
                {filteredData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.card,
                      {
                        borderColor: darkmode ? '#b8b6ab' : '#8f8f8f',
                        marginLeft: index % 2 == 0 ? 4 : 0,
                        marginRight: index % 2 == 0 ? 0 : 4,
                      },
                    ]}
                    onPress={() => handleItemClick(item)}>
                    <Image
                      source={require('../assets/images/god.webp')}
                      style={styles.cardImage}
                    />
                    <Text style={[styles.cardTitle, {color: textColor}]}>
                      {item.displayTitle ? item.displayTitle : item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </>
        {/* Render No Data Message if filtered data is empty */}
        {rendered && filteredData.length == 0 && (
          <View style={styles.noDataContainer}>
            <Text style={[styles.noDataText, {color: textColor}]}>
              No data found
            </Text>
            <Text
              style={styles.noDataTextButton}
              onPress={() => {
                setSearchValue('');
                handleSearch('');
              }}>
              Clear
            </Text>
          </View>
        )}
      </ScrollView>
      {/* Display Admob component */}
      <Admob />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    paddingVertical: 10,
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
    fontSize: 16,
    fontWeight: '700',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 2,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 180,
    height: 80,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    padding: 5,
  },
  noDataContainer: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  noDataText: {
    fontSize: 20,
    textAlign: 'center',
  },
  noDataTextButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ADD8E6',
  },
});

export default ListScreen;
