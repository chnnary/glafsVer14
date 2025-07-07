import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_IP } from '@env';

const {
  ImageBackground,
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} = require('react-native');

function HomePage() {
  const [userData, setUserData] = useState('');
  const [isServoOn, setIsServoOn] = useState(false);
  const [pressure, setPressure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get the current time of day
  const getGreetingTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
      return 'evening';
    } else {
      return 'morning';
    }
  };

  const [timeOfDay, setTimeOfDay] = useState(getGreetingTime());

  async function getData() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .post(`${API_IP}/userdata`, { token: token })
      .then(res => {
        console.log(res.data);
        setUserData(res.data.data);
      });
  }

  const handleToggle = async (value) => {
    setIsServoOn(value);

    try {
      const response = await axios.post(`${API_IP}/servo`, {
        isOn: value,
      });

      console.log('Servo response:', response.data);
      console.log(`Servo turned ${value ? 'on' : 'off'}`);
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      console.error('Error', 'Failed to control the servo');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Fetch the latest pressure data
    const fetchPressure = async () => {
      try {
        const response = await axios.get(`${API_IP}/latest-pressure`); // Replace with your backend IP
        if (response.data) {
          setPressure(response.data.pressure_kpa);
        } else {
          setError('No pressure data found');
        }
      } catch (err) {
        setError('Error fetching pressure data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data initially and set interval for updates
    fetchPressure();
    const intervalId = setInterval(fetchPressure, 1000); // Update every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageBackground source={require('../images/backgroundHome.png')} style={styles.backgroundContainer}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoHeader}>
            <Image style={styles.logo} source={require('../images/logo.png')} />
            <View>
              <Text style={styles.headerText}>GLAFS</Text>
              <Text style={styles.headerText2}>Gas Leak and Fire Detection System</Text>
            </View>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.body}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText1}>Good {timeOfDay}, </Text>
            <Text style={styles.greetingText2}>{userData.username}</Text>
          </View>
          <View style={styles.weatherView}>
            <Image style={styles.weatherLogo} source={require('../images/Weather_Sunny.png')} />
          </View>
          <View style={styles.menuBar}>
            <View style={styles.section1}>
              <View style={styles.gasPercentage}>
                <Image style={styles.gasIcon} source={require('../images/GasIcon.png')} />
                <Text style={styles.gasPercentageText1}>Gas Pressure</Text>
                <Text style={styles.gasPercentageText1}>KPA</Text>
                <Text style={styles.gasPercentageText2}>{pressure}</Text>
              </View>
              <View style={styles.valveOptions}>
                <View style={styles.valveStatus}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isServoOn ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleToggle}
                    style={styles.valveStatusSwitch}
                    value={isServoOn}
                  />
                  <Text style={styles.valveStatusText}>Valve</Text>
                  <Text style={styles.valveStatusText}>Status</Text>
                </View>
                {/* <TouchableOpacity onPress={() => {}}>
                  <View style={styles.valveTimer}>
                    <Ionicons name="time-outline" style={styles.valveTimerIcon} color="black" />
                    <Text style={styles.valveTimerText}>Valve</Text>
                    <Text style={styles.valveTimerText}>Timer</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  header: {
    height: hp('23%'),
    width: wp('100%'),
  },
  body: {
    height: hp('77%'),
    width: wp('100%'),
    backgroundColor: '#F8F8FF',
    borderTopRightRadius: 60,
  },
  logo: {
    height: wp('15%'),
    width: wp('15%'),
    marginTop: hp('5%'),
    marginLeft: wp('4%'),
    borderRadius: wp('7.5%'),
    resizeMode: 'cover',
  },
  logoHeader: {
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    marginTop: hp('6%'),
    marginLeft: wp('4%'),
    fontWeight: 'bold',
    fontSize: wp('5%'),
  },
  headerText2: {
    color: 'white',
    marginLeft: wp('4%'),
    fontWeight: '600',
    fontSize: wp('4%'),
  },
  greeting: {
    flexDirection: 'column',
  },
  greetingText1: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#0c2d48',
    marginLeft: wp('5%'),
    marginTop: hp('5%'),
  },
  greetingText2: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: '#0c2d48',
    marginLeft: wp('5%'),
  },
  weatherView: {
    flexDirection: 'row-reverse',
  },
  weatherLogo: {
    marginTop: hp('-8%'),
    marginRight: wp('5%'),
  },
  menuBar: {
    flexDirection: 'row',
    height: hp('50%'),
    display: 'flex',
  },
  section1: {
    width: wp('100%'),
    height: hp('60%'),
    flexDirection: 'row',
    backgroundColor: '#F8F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gasPercentage: {
    width: wp('40%'),
    height: hp('45%'),
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('10%'),
  },
  gasIcon: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  gasPercentageText1: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#0c2d48',
  },
  gasPercentageText2: {
    fontSize: wp('10%'),
    fontWeight: '700',
    color: '#146da0',
  },
  valveOptions: {
    width: wp('40%'),
    height: hp('32%'),
    display: 'flex',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('10%'),
  },
  valveStatus: {
    width: wp('35%'),
    height: hp('21.5%'),
    backgroundColor: 'white',
    marginLeft: wp('4%'),
    marginBottom: hp('3%'),
    borderRadius: 10,
  },
  valveTimer: {
    width: wp('35%'),
    height: hp('20%'),
    backgroundColor: 'white',
    marginLeft: wp('4%'),
    borderRadius: 10,
  },
  valveStatusText: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#0c2d48',
    marginLeft: wp('3%'),
  },
  valveStatusSwitch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginTop: wp('5%'),
    marginEnd: wp('5%'),
    marginBottom: wp('5%'),
  },
  valveTimerIcon: {
    fontSize: wp('8%'),
    textAlign: 'right',
    marginEnd: wp('3%'),
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  valveTimerText: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#0c2d48',
    marginLeft: wp('3%'),
    textAlign: 'left',
  },
});

export default HomePage;
