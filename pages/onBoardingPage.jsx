import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const slides = [
    {
        id: '1',
        image: require('../images/onBoarding1.png'),
    },
    {
        id: '2',
        image: require('../images/onBoarding2.png'),
    },
    {
        id: '3',
        image: require('../images/onBoarding3.png'),
    }
];

const Slide = ({ item }) => {
    return (
        <View style={styles.slide}>
            <Image
                source={item.image}
                style={styles.image}
            />
        </View>
    );
};

function OnBoardingPage({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const flatListRef = useRef(null);

    useEffect(() => {
        console.log('Checking AsyncStorage');
        AsyncStorage.getItem('onboarding_completed')
            .then((value) => {
                console.log('Value:', value);
                if (value !== null && value === 'true') {
                    console.log('Onboarding completed');
                    navigation.navigate('LoginPage');
                }
            })
            .catch((error) => console.error('AsyncStorage error:', error));
    }, []);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            AsyncStorage.setItem('onboarding_completed', 'true')
                .then(() => {
                    console.log('Onboarding completed flag set');
                    navigation.navigate('LoginPage');
                })
                .catch((error) => console.error('AsyncStorage error:', error));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Slide item={item} />}
                contentContainerStyle={styles.flatListContent}
                pagingEnabled={true} // Ensures each slide occupies the entire screen
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(event) => {
                    setCurrentIndex(Math.floor(event.nativeEvent.contentOffset.x / wp('100%')));
                }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>{currentIndex === slides.length - 1 ? 'Finish' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'center', // Center images vertically
        width: wp('300%'), // Ensure each slide fills the entire screen horizontally
    },
    slide: {
        width: wp('100%'),
        alignItems: 'center', // Center images horizontally
    },
    image: {
        width: wp('100%'), // Set image width to match screen width
        height: '110%', // Maintain aspect ratio
        resizeMode: 'contain', // Ensure entire image is visible
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center', // Center button horizontally
    },
    nextButton: {
        backgroundColor: '#0c2d48',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OnBoardingPage;
