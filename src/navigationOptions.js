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
      fontSize: 20,
      fontFamily: headerFont,
    },
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      };
    },
  };
};
