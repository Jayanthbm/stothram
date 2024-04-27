import { StyleSheet } from 'react-native';

export const COLOR_SCHEME = {
  DARK: {
    backgroundColor: '#171717',
    textColor: '#f9f9f9',
    headerBackground: '#878683',
    headertext: '#cdcdcd',
    borderColor: '#b8b6ab',
  },
  LIGHT: {
    backgroundColor: '#fefefe',
    textColor: '#0d0d0d',
    headerBackground: '#f0ead6',
    headertext: '#676767',
    borderColor: '#cdcdcd',
  },
};
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  textButton: {
    color: '#5098E6',
    fontSize: 16,
    fontFamily: 'NotoSans',
  },
});
