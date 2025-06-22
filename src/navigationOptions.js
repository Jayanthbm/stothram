import { TransitionPresets } from '@react-navigation/stack';

export const commonNavigationOptions = (
  headerBackground,
  headertext,
  headerFont = 'NotoSans',
) => {
  return {
    headerStyle: {
      backgroundColor: headerBackground,
    },
    headerTintColor: headertext,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: headerFont,
    },
    headerTitleAlign: 'left',
    ...TransitionPresets.SlideFromRightIOS,
  };
};
