import React, {useContext, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {ThemeContext} from '../contexts/themeContext';

import Admob from '../components/Admob';
const SettingsScreen = ({navigation}) => {
  const {
    backgroundColor,
    textColor,
    headerBackground,
  } = useContext(ThemeContext);
  useEffect(() => {
    navigation.setOptions({
      title: 'Settings',
      headerStyle: {
        backgroundColor: headerBackground,
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesignIcon name="left" size={24} style={styles.headerIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ScrollView>
        <Text>General Settings</Text>
      </ScrollView>

      <React.Fragment>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 5,
          }}>
          <Text style={{color: textColor, fontSize: 20}}>Made With {''}</Text>
          <AntDesignIcon
            name={'heart'}
            style={{
              color: 'red',
              fontSize: 25,
              marginTop: 1,
            }}
          />
          <Text style={{color: textColor, fontSize: 20}}> In India</Text>
        </View>
        <Admob />
      </React.Fragment>
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
    marginRight: 10,
    marginLeft: 10,
    color: '#fff',
  },
});
export default SettingsScreen;
