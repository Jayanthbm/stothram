import React from 'react';
import {Button, Text, View} from 'react-native';

const ReaderScreen = ({navigation}) => {
  return (
    <View>
      <Text>Reader Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

export default ReaderScreen;
