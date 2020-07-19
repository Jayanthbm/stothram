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

const DheeraMaruthi = ({ navigation }) => {
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
            navigation.navigate('BhajaneScreen');
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
                    title="ಧೀರ ಮಾರುತಿ ಗಂಭೀರ ಮಾರುತಿ"
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
                            line1={'ಧೀರ ಮಾರುತಿ ಗಂಭೀರ ಮಾರುತಿ |'}
                            line2={'ಶೂರ ಮಾರುತಿ ರಾಮಶೂರ ಮಾರುತಿ||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಶಕ್ತ ಮಾರುತಿ ರಾಮ ಭಕ್ತ ಮಾರುತಿ|'}
                            line2={'ಅಂಜನಿ ಮಾರುತಿ ಹನುಮಂತ ಮಾರುತಿ ||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಹನುಮಂತ ಮಾರುತಿ  ಬಲವಂತ ಮಾರುತಿ |'}
                            line2={'ಬಲವಂತ ಮಾರುತ ಗುಣವಂತ ಮಾರುತಿ ||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಮಾರುತಿ ಮಾರುತಿ ಮಾರುತಿ ಮಾರುತಿ '}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಧೀರ ಮಾರುತಿ ಗಂಭೀರ ಮಾರುತಿ |'}
                            line2={'ಶೂರ ಮಾರುತಿ ರಾಮಶೂರ ಮಾರುತಿ||'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಗೀತಾ ಮಾರುತಿ ಸಂಗೀತ ಮಾರುತಿ '}
                            line2={'ಯೋಗಿ ಮಾರುತಿ ಪರಮತ್ಯಾಗಿ ಮಾರುತಿ'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ತ್ಯಾಗಿ ಮಾರುತಿ ವಿರಾಗಿ ಮಾರುತಿ'}
                            line2={'ಪವನ ಮಾರುತಿ ಲಂಕಾ ದಹನ ಮಾರುತಿ'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಮೌನಿ ಮಾರುತಿ ಮಹಾಜ್ಞಾನಿ ಮಾರುತಿ'}
                            line2={'ದಕ್ಷ ಮಾರುತಿ ಲಕ್ಷ್ಮಣ ರಕ್ಷಾ ಮಾರುತಿ'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಸದಯಾ ಮಾರುತಿ ರಾಮ ಹೃದಯ ಮಾರುತಿ'}
                            line2={'ರಾಮಧೂತ ಮಾರುತಿ ಭೀಮಕಾಯ ಮಾರುತಿ'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಎತ್ತಿ ನಿನಗೆ ಆರತಿ ಮಾಡುವೆ ನಿನ್ನ ಕೀರುತಿ'}
                            line2={'ಮಾರುತಿ ಮಾರುತಿ ಮಾರುತಿ'}
                        />
                        <St
                            color={textColor}
                            fontSize={font}
                            line1={'ಧೀರ ಮಾರುತಿ ಗಂಭೀರ ಮಾರುತಿ |'}
                            line2={'ಶೂರ ಮಾರುತಿ ರಾಮಶೂರ ಮಾರುತಿ||'}
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


export default DheeraMaruthi;