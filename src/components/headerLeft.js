import React from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
const CustomHeaderLeft = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesignIcon name="left" size={24} style={styles.headerIcon} />
    </TouchableOpacity>
  );
};

const styles = {
  headerIcon: {
    marginRight: 20,
    color: '#fff',
  },
};

export default CustomHeaderLeft;
