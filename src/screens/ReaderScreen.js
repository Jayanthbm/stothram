import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Admob from '../components/admob';
import CustomHeaderLeft from '../components/headerLeft';
import CustomHeaderRight from '../components/headerRight';
import {ThemeContext} from '../contexts/themeContext';
import {commonNavigationOptions} from '../navigationOptions';
const ReaderScreen = ({navigation}) => {
  const {backgroundColor, headerBackground} = useContext(ThemeContext);
  const [title, setTitle] = useState('');

  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      title: title,
      ...commonNavigationOptions(headerBackground),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      headerRight: () => <CustomHeaderRight navigation={navigation} />,
    });
  }, [navigation, title, headerBackground]);

  useEffect(() => {
    if (dataUrl) {
      console.log('Fetching data from', dataUrl);
    }
  }, [dataUrl]);
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ScrollView>
        <Text>Reader</Text>
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
});

export default ReaderScreen;
