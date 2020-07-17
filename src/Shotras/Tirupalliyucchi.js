/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Switch, Dimensions, BackHandler, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';
import Header from '../Components/Header';
import St from '../Components/St';
import Admob from '../Components/Admob';
import * as Adhelper from '../Constants/AdUnits';

const Tirupalliyucchi = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(null);
    const [darkmode, setDarkMode] = useState(null);
    const [showToggle, setShowToggle] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [orientation, setOrientation] = useState('portrait');
    const backgroundColor = darkmode ? '#000' : '#fff';
    const textColor = darkmode ? '#fff' : '#000';

    const [font, setFont] = useState(24);
    const storeData = async (value) => {
        try {
            let v = value ? 'true' : 'false';
            await AsyncStorage.setItem('@darkmode', v);
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@darkmode');
            if (value !== null) {
                if (value === 'true') {
                    setDarkMode(true);
                    setIsEnabled(true);
                }
                if (value === 'false') {
                    setDarkMode(false);
                    setIsEnabled(false);
                }
            }
            const dmt = await AsyncStorage.getItem('@darkmodetoggle');
            if (dmt !== null) {
                if (dmt === 'true') {
                    setShowToggle(true);
                }
                if (dmt === 'false') {
                    setShowToggle(false);
                }
            } else {
                setShowToggle(true);
            }
        } catch (e) {
            // error reading value
        }
    };


    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    Dimensions.addEventListener('change', () => {
        let orr = isPortrait() ? 'portrait' : 'landscape';
        if (orr === 'portrait') {
            setFont(24);
        }
        if (orr === 'landscape') {
            setFont(38);
        }
        setOrientation(orr);
    });

    useEffect(() => {
        getData();
        let or = isPortrait() ? 'portrait' : 'landscape';
        setOrientation(or);
        const backAction = () => {
            navigation.navigate('ShotramScreen');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();

    }, []);
    return (
        <View style={{ backgroundColor: backgroundColor, flex: 1 }} >
            <React.Fragment>
                {showToggle && showToggle === true && (
                    <Switch
                        style={{
                            marginTop: '3%',
                        }}
                        value={isEnabled}
                        onValueChange={() => {
                            setIsEnabled(!isEnabled);
                            storeData(!darkmode);
                            setDarkMode(!darkmode);
                        }}
                    />
                )}
                <Header
                    title="ತಿರುಪ್ಪಳ್ಳಿಯೆಳುಚ್ಚಿ"
                    darkmode={darkmode}
                />
                <Slider
                    value={font}
                    onValueChange={value => setFont(value)}
                    minimumValue={15}
                    maximumValue={50}
                    style={{
                        marginStart: 15,
                        marginEnd: 15,
                    }}
                />
                <ScrollView>
                    <View
                        style={{
                            marginLeft: 7,
                            marginRight: 1,
                        }}
                    >

                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ತಮೇವಮತ್ವಾ ಪರವಾಸುದೇವಂ'}
                            line2={'ರಂಗೇಶಯಂ ರಾಜ ವದರ್ಹಣೀಯಂ |'}
                            line3={'ಫ್ರಾಭೋದಕೀಂ ಯೋಕೃತ ಸೂಕ್ತಿಮಾಲಾಂ'}
                            line4={'ಭಕ್ತಾಂಘ್ರಿರೇಣುಂ ಭಗವನ್ತಮೀಡೇ ||'}
                            line5={'ಮಂಡಂಗುಡಿಯೆನ್ಬರ್ ಮಾಮರೈಯೋರ್ ಮನ್ನಿಯಶೀರ್'}
                            line6={'ತ್ತೊಂಡರಡಿಪ್ಪೊಡಿ ತ್ತೊನ್ನಗರಂ'}
                            line7={'ವಂಡು ತಿಣರ್ತ ವಯಲ್ ತೆನ್ನರಂಗತ್ತಮ್ಮಾನೈ'}
                            line8={'ಪ್ಪಳ್ಳಿಉಣರ್ತುಂ ಪಿರಾನುದಿತ್ತವೂರ್||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಕದಿರವನ್ ಕುಣದಿಶೈ ಚ್ಚಿಗರಂ ವಂದಣೈಂದಾನ್'}
                            line2={'ಕನೈಇರುಳ್ ಅಗನ್ರದು ಕಾಲೈಯಂ ಪೊಳುದಾಯ್'}
                            line3={'ಮದುವಿರಿಂದೊಳುಗಿನ ಮಾಮಲರ್ ಎಲ್ಲಾಂ'}
                            line4={'ವಾನವರ್ ಅರಶರ್ಗಳ್ ವಂದು ವಂದೀಂಡಿ'}
                            line5={'ಎದಿರ್ದಿಶೈ ನಿರೈಂದನರ್ ಇವರೊಡುಂ ಪುಗುಂದ'}
                            line6={'ಇರುಂಗಳಿತ್ತೀಟ್ಟಮುಂ ಪಿಡಿಯೊಡು ಮುರಶುಂ'}
                            line7={'ಅದಿರ್ದಲಿಲ್ ಅಲೈಕಡಲ್ ಪೋನ್ರುಳ ದೆಂಗುಂ'}
                            line8={'ಅರಂಗತ್ತಮ್ಮಾ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||1||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಕೊಳುಂಗೊಡಿ ಮುಲ್ಲೈಯಿನ್ ಕೊಳುಮಲರಣವಿ'}
                            line2={'ಕೂರ್ಂದದು ಕುಣತಿಶೈ ಮಾರುದಂ ಇದುವೋ'}
                            line3={'ಎಳುಂದನ ಮಲರಣೈ ಪ್ಪಳ್ಳಿಕೊಳ್ಳನ್ನಂ'}
                            line4={'ಈನ್ಬನಿ ನನೈಂದದಂ ಇರುಂ ಜಿರಗುದರಿ'}
                            line5={'ವಿಳುಂಗಿಯ ಮುದಲೈಯಿನ್ ಪಿಲಂಬುರೈ ಪೇಳ್ವಾಯ್'}
                            line6={'ವೆಳ್ಳೆಯಿರ್ ಉರಅದನ್ ವಿಡತ್ತಿನುಕ್ಕನುಂಗಿ'}
                            line7={'ಅಳುಂಗಿಯ ಆನೈಯಿನ್ ಅರುಂದುಯರ್ ಕೆಡುತ್ತ'}
                            line8={'ಅರಂಗತ್ತಮ್ಮಾ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||2||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಚುಡರೊಳಿ ಪರಂದನ ಚೂಳ್ತಿಶೈಎಲ್ಲಾಂ'}
                            line2={'ತುನ್ನಿಯ ತಾರಕೈ ಮಿನ್ನೊಳಿ ಚುರುಂಗಿ'}
                            line3={'ಪಡರೊಳಿ ಪಶುತ್ತನನ್ ಪನಿಮದಿ ಇವನೋ'}
                            line4={'ಪಾಯಿರುಳ್ ಅಗನ್ರದು ಪೈಂಪೊಳಿಲ್ ಕಮುಗಿನ್'}
                            line5={'ಮಡಲಿಡೈ ಕ್ಕೀರಿ ವಣ್ಪಾಳೈಗಳ್ ನಾರ'}
                            line6={'ವೈಕರೈ ಕೂರ್ಂದದು ಮಾರುದಂ ಇದುವೋ'}
                            line7={'ಅಡಲೊಳಿ ತಿಗಳ್ತರು ತಿಗಿರಿಯನ್ ತಡಕ್ಕೈ'}
                            line8={'ಅರಂಗತ್ತಮ್ಮಾ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||3||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಮೇಟ್ಟಿಳ ಮೇದಿಗಳ್ ತಳೈವಿಡುಂ ಆಯರ್ಗಳ್'}
                            line2={'ವೇಯ್ಂಗುಳಲ್ ಓಶೈಯುಂ ವಿಡೈ ಮಣಿಕ್ಕುರಲುಂ'}
                            line3={'ಈಟ್ಟಿಯ ಇಶೈತಿಶೈ ಪರಂದನ ವಯಲುಳ್'}
                            line4={'ಇರಿಂದನ ಶುರುಮ್ಬಿನಂ ಇಲಂಗೈಯರ್ ಕುಲತ್ತೈ'}
                            line5={'ವಾಟ್ಟಿಯವರಿಶಿಲೈ ವಾನವರೇರೇ'}
                            line6={'ಮಾಮುನಿ ವೇಳ್ವಿಯೈಕ್ಕಾತ್ತು* ಅವಬಿರದಂ ಆಟ್ಟಿಯ-'}
                            line7={'ಅಡುತಿರಲ್ ಅಯೋತ್ತಿ ಎಮ್ಅರಶೇ'}
                            line8={'ಅರಂಗತ್ತಮ್ಮಾ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||4||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಪುಲಂಬಿನ ಪುಟ್ಕಳುಂ ಪುಂ ಪೊಳಿಲ್ಗಳಿನ್ವಾಯ್'}
                            line2={'ಪೋಯಿಟ್ರು ಕ್ಕಂಗುಲ್ ಪುಗುಂದದು ಪುಲರಿ'}
                            line3={'ಕಲಂದದು ಕುಣದಿಶೈ ಕ್ಕನೈಕಡಲ್ ಅರವಂ'}
                            line4={'ಕಳಿವಂಡು ಮಿಳಟ್ರಿಯ ಕಲಮ್ಬಗಂ ಪುನೈಂದ'}
                            line5={'ಅಲಂಗಲನ್ತೊಡೈಯಲ್ಕೊಂಡುಅಡಿಯಿಣೈಪಣಿವಾನ್'}
                            line6={'ಅಮರರ್ಗಳ್ ಪುಗುಂದನರ್ ಆದಲಿಲ್ ಅಮ್ಮಾ'}
                            line7={'ಇಲಂಗೈಯರ್ ಕೋನ್ ವಳಿಪಾಡು ಚೆಯ್ಕೋಯಿಲ್'}
                            line8={'ಎಂಬೆರುಮಾನ್ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||5|'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಇರವಿಯರ್ ಮಣಿನೆಡುಮ್ ತೇರೊಡುಮ್ ಇವರೋ'}
                            line2={'ಇರೈಯವರ್ ಪದಿನೊರು ವಿಡೈಯರುಮ್ ಇವರೋ'}
                            line3={'ಮರುವಿಯ ಮಯಿಲಿನನ್ ಅರುಮುಗನ್ ಇವನೋ'}
                            line4={'ಮರುದರುಮ್ ವಶುಕ್ಕಳುಮ್ ವಂದು ವಂದೀಂಡಿ'}
                            line5={'ಪುರವಿಯೋಡಾಡಲುಮ್ ಪಾಡಲುಮ್ ತೇರುಮ್'}
                            line6={'ಕುಮರದಂಡಮ್ ಪುಗುಂದೀಂಡಿಯ ವೆಳ್ಳಮ್'}
                            line7={'ಅರುವರೈ ಅನೈಯ ನಿನ್ಕೋಯಿಲ್ಮುನ್ ಇವರೋ'}
                            line8={'ಅರಂಗತ್ತಮ್ಮಾ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||6||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಅಂದರತ್ತಮರರ್ಗಳ್ ಕೂಟ್ಟಂಗಳ್ ಇವೈಯೋ'}
                            line2={'ಅರುಂತರ ಮುನಿವರುಮ್ ಮರುದರುಮ್ ಇವರೋ'}
                            line3={'ಇಂದಿರನ್ ಆನೈಯುಮ್ ತಾನುಮ್ ವಂದಿವನೋ'}
                            line4={'ಎಂಬೆರುಮಾನ್ ಉನ್ ಕೋಯಿಲಿನ್ ವಾಶಲ್'}
                            line5={'ಚುಂದರರ್ ನೆರುಕ್ಕ ವಿಚ್ಚಾದರರ್ ನೂಕ್ಕ'}
                            line6={'ಇಯಕ್ಕರುಮ್ ಮಯಂಗಿನರ್ ತಿರುವಡಿ ತೊಳುವಾನ್'}
                            line7={'ಅಂದರಮ್ ಪಾರಿಡಮ್ ಇಲ್ಲೈ ಮಟ್ರಿದುವೋ'}
                            line8={'ಅರಂಗತ್ತಮ್ಮಾ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||7||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ವಂಬವಿಳ್ ವಾನವರ್ ವಾಯುರೈ ವಳಂಗ'}
                            line2={'ಮಾನಿದಿ ಕಪಿಲೈ ಒಣ್ಕನ್ನಾಡಿಮುದಲಾ'}
                            line3={'ಎಂಬೆರುಮಾನ್ ಪಡಿಮಕ್ಕಲಮ್ ಕಾಂಡರ್ಕು'}
                            line4={'ಏರ್ಪನ ವಾಯಿನ ಕೊಂಡು ನನ್ ಮುನಿವರ್ *'}
                            line5={'ತುಂಬುರು ನಾರದರ್ ಪುಗುಂದನರ್ ಇವರೋ'}
                            line6={'ತೋನ್ರಿನನ್ ಇರವಿಯುಮ್ ತುಲಂಗೊಳಿ ಪರಪ್ಪಿ'}
                            line7={'ಅಂಬರತಲತ್ತಿನಿನ್ರು ಅಗಲ್ಗಿನ್ರದಿರುಳ್ಪೋಯ್'}
                            line8={'ಅರಂಗತ್ತಮ್ಮಾ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||8||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಏದಮಿಲ್ ತಣ್ಣುಮೈ ಎಕ್ಕಂಮತ್ತಳಿ'}
                            line2={'ಯಾಳ್ಕುಳಲ್ ಮುಳವಮೋಡು ಇಶೈತಿಶೈ ಕೆಳುಮಿ'}
                            line3={'ಗೀದಂಗಳ್ ಪಾಡಿನರ್ ಕಿನ್ನರರ್ ಕೆರುಡರ್ಗಳ್'}
                            line4={'ಕಂದರುವರವರ್ ಕಂಗುಲುಳ್ ಎಲ್ಲಾಂ *'}
                            line5={'ಮಾದವರ್ ವಾನವರ್ ಚಾರಣರ್ ಇಯಕ್ಕರ್'}
                            line6={'ಚಿತ್ತರುಂ ಮಯಂಗಿನರ್ ತಿರುವಡಿ ತೊಳುವಾನ್'}
                            line7={'ಆದಲಿಲ್ ಅವರ್ಕು ನಾಳೋಲಕ್ಕಂ ಅರುಳ'}
                            line8={'ಅರಂಗತ್ತಮ್ಮಾ ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||9||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಕಡಿಮಲರ್ ಕ್ಕಮಲಂಗಳ್ ಮಲರ್ಂದನ ಇವೈಯೋ'}
                            line2={'ಕದಿರವನ್ ಕನೈಕಡಲ್ ಮುಳೈತ್ತನನ್ ಇವನೋ'}
                            line3={'ತುಡಿಯಿಡೈಯಾರ್ ಚುರಿಕುಳಲ್ ಪಿಳಿಂದುದರಿ'}
                            line4={'ತುಗಿಲ್ ಉಡುತ್ತೇರಿನರ್ ಚೂಳ್ ಪುನಲ್ಅರಂಗಾ'}
                            line5={'ತೊಡೈಯೊತ್ತ ತುಳವಮುಂ ಕೂಡೈಯುಂ ಪೊಲಿಂದು'}
                            line6={'ತೋನ್ರಿಯತೋಳ್ ತೊಂಡರಡಿಪ್ಪೊಡಿ ಎನ್ನುಂ ಅಡಿಯನೈ'}
                            line7={'ಅಳಿಯನ್ ಎನ್ರರುಳಿಉನ್ಅಡಿಯಾರ್ಕ್ಕು ಆಟ್ಪಡುತ್ತಾಯ್'}
                            line8={'ಪಳ್ಳಿ ಎಳುಂದರುಳಾಯೇ ||10||'}
                        />
                    </View>
                </ScrollView>
                <Admob
                    type={'banner'}
                    unitId={Adhelper.GenerateId()}
                />
            </React.Fragment>
        </View>

    );
};


export default Tirupalliyucchi;
