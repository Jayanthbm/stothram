import NetInfo from "@react-native-community/netinfo";
import Slider from "@react-native-community/slider";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Admob from "../components/admob";
import CustomHeaderLeft from "../components/headerLeft";
import CustomHeaderRight from "../components/headerRight";
import { SCREEN_NAMES } from "../constants";
import { ThemeContext } from "../contexts/themeContext";
import { commonNavigationOptions } from "../navigationOptions";
import { commonStyles } from "../styles/styles";
import { dataHelper } from "../utils/dataUtils";

const generateStyles = (
  backgroundColor = "#FFF",
  textColor = "#000",
  darkmode = false,
  headerBackground,
  fontSize = 18
) => {
  return StyleSheet.create({
    container: {
      ...commonStyles.container,
      backgroundColor: backgroundColor,
    },
    paragraphStyle: {
      marginLeft: 7,
      marginRight: 2,
      marginBottom: 18,
      borderBottomColor: darkmode ? "#b8b6ab" : "#8f8f8f",
    },
    lineStyle: {
      fontWeight: "500",
      marginBottom: 4,
      fontSize: fontSize,
      color: textColor,
    },
    subHeadingContainer: {
      marginBottom: 5,
      padding: 5,
      backgroundColor: headerBackground,
    },
    subHeadingText: {
      color: "#fff",
      fontSize: 20,
      textAlign: "center",
      fontWeight: "500",
    },
  });
};

// Main ReaderScreen component
const ReaderScreen = ({ navigation, route }) => {
  // Extract theme-related context
  const {
    backgroundColor,
    headerBackground,
    textColor,
    font,
    updateFont,
    darkmode,
  } = useContext(ThemeContext);

  // Navigation State
  const { item } = route.params;

  // State variables for managing data and UI
  const [title, setTitle] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");
  const [readerData, setReaderData] = useState(null);
  const sliderColor = darkmode ? "#ab8b2c" : "#6200EE";

  // useEffect to set navigation options
  useEffect(() => {
    navigation.setOptions({
      title: displayTitle ? displayTitle : title,
      ...commonNavigationOptions(headerBackground),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
      headerRight: () => <CustomHeaderRight navigation={navigation} />,
    });
  }, [navigation, title, displayTitle, headerBackground]);

  // useEffect to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await dataHelper(
          item?.title,
          item?.dataUrl,
          SCREEN_NAMES.READER_SCREEN
        );
        if (fetchedData) {
          setReaderData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setDisplayTitle(item.displayTitle);
    setTitle(item?.title);
    if (item?.dataUrl) {
      fetchData();
    }
  }, [item]);

  // Generate styles based on current context values
  const styles = generateStyles(
    backgroundColor,
    textColor,
    darkmode,
    headerBackground,
    font
  );

  const MemoizedParagraph = React.memo(({ data, styles }) => {
    return (
      <View style={styles.paragraphStyle}>
        {data.lines.map((line, index) => (
          <Text style={styles.lineStyle} key={index}>
            {line}
          </Text>
        ))}
      </View>
    );
  });

  const MemoizedSubheading = React.memo(({ data, styles }) => {
    return (
      <View style={styles.subHeadingContainer}>
        <Text style={styles.subHeadingText}>{data.title}</Text>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      {readerData && (
        <Slider
          value={font}
          onValueChange={(value) => updateFont(value)}
          minimumValue={15}
          maximumValue={40}
          step={3}
          style={{
            height: 40,
          }}
          thumbTintColor={sliderColor}
          minimumTrackTintColor={sliderColor}
          tapToSeek={true}
        />
      )}

      {/* FlatList for displaying reader content */}
      <FlatList
        data={readerData?.content}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (item?.type === "paragraph") {
            // Render paragraphs using MemoizedParagraph
            return <MemoizedParagraph data={item} styles={styles} />;
          }
          if (item.type === "subheading") {
            // Render subheadings using MemoizedSubheading
            return <MemoizedSubheading data={item} styles={styles} />;
          }
        }}
      />
      {/* Display Admob component */}
      <Admob />
    </View>
  );
};

export default ReaderScreen;
