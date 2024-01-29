import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Admob from '../components/Admob';
import {ThemeContext} from '../contexts/themeContext';
const ListScreen = ({navigation, route}) => {
  const {type} = route.params;
  const {backgroundColor, headerBackground} = useContext(ThemeContext);
  const [title, setTitle] = useState('');

  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: headerBackground,
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesignIcon name="left" size={24} style={styles.headerIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesomeIcon name="rupee" size={24} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <AntDesignIcon name="setting" size={24} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title]);

  useEffect(() => {
    setTitle(type?.title);
    setDataUrl(type?.dataUrl);
  }, [type]);

  useEffect(() => {
    if (dataUrl) {
      console.log('Fetching data from', dataUrl);
    }
  }, [dataUrl]);
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ScrollView>
        <Text>List Screen</Text>
      </ScrollView>

      <Admob />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
  headerRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerIcon: {
    marginRight: 20,
    color: '#fff',
  },
});

export default ListScreen;
