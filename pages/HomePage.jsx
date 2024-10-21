import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import * as React from 'react';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const BASE_URL = 'http://127.0.0.1:3000/servo/toggle'; // Replace with your Raspberry Pi's IP address
  const [isEnabled, setIsEnabled] = useState(false);
  
  async function getData(){
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
    .post('http://192.168.19.245:5003/userdata', {token: token})
    .then (res => {
      console.log(res.data);
      setUserData(res.data.data);
    });
  }
  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    try {
        const response = await axios.post(`${BASE_URL}/${newState ? 'on' : 'off'}`);
        Alert.alert(response.data);
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Could not set servo angle.');
    }
  };

  useEffect(() =>{
    getData();
  }, []);

  return (
    <ImageBackground
    source={
      require('../images/backgroundHome.png')}
      style ={styles.backgroundContainer}>
        <SafeAreaView>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoHeader}>
              <Image 
              style = {styles.logo}
              source={
                require('../images/logo.png')}>
              </Image>
              <View>
                <Text 
                style = {styles.headerText}>
                  GLAFS
                </Text>
                <Text 
                style = {styles.headerText2}>
                  Gas Leak and Fire Detection System
                </Text>
              </View>
            </View>
          </View>
          {/* Greeting */}
          <View style = {styles.body}>
            <View style = {styles.greeting}>
              <Text 
              style = {styles.greetingText1}>
                Good morning, 
              </Text>
              <Text 
              style = {styles.greetingText2}>
                user!
              </Text>
            </View>
            <View style = {styles.weatherView}>
              <Image
              style = {styles.weatherLogo}
              source = {require('../images/Weather_Sunny.png')}/>
            </View>
            <View style = {styles.menuBar}> 
              <View style = {styles.section1}>
                <View style = {styles.gasPercentage}>
                  <Image
                  style = {styles.gasIcon}
                  source={
                    require('../images/GasIcon.png')}/>
                  <Text style = {styles.gasPercentageText1}>Gas Level</Text>
                  <Text style = {styles.gasPercentageText1}>Percentage</Text>
                  <Text style = {styles.gasPercentageText2}>80%</Text>
                </View>
                <View style = {styles.valveOptions}>
                    <View style = {styles.valveStatus}>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      style={styles.valveStatusSwitch}
                      value={isEnabled}/>
                      <Text style = {styles.valveStatusText}>Valve</Text>
                      <Text style = {styles.valveStatusText}>Status</Text>
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                      <View style = {styles.valveTimer}>
                        <Ionicons 
                          name="time-outline" 
                          style = {styles.valveTimerIcon} 
                          color="black" />
                        <Text style = {styles.valveTimerText}>Valve</Text>
                        <Text style = {styles.valveTimerText}>Timer</Text>
                      
                      </View>
                    </TouchableOpacity>
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
  logo:{
    height: 65,
    width: 65,
    marginTop: 45,
    marginLeft: 15,
    borderRadius: 60,
    resizeMode: "cover",
  },
  logoHeader:{
    flexDirection: 'row',
  },
  headerText:{
    color: 'white',
    marginTop: 55,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerText2:{
    color: 'white',
    marginLeft: 15,
    fontWeight: '600',
    fontSize: 15,
  },
  greeting:{
    flexDirection: 'column',
  },
  weatherView:{
    flexDirection: 'row-reverse',
  },
  greetingText1:{
    fontSize: 20,
    fontWeight: '700',
    color: '#0c2d48',
    marginLeft: 20,
    marginTop: 50,
  },
  greetingText2:{
    fontSize: 20,
    fontWeight: '900',
    color: '#0c2d48',
    marginLeft: 20,
  },
  weatherLogo:{
    marginTop: -80,
    marginRight: 15,
  },
  menuBar:{
    flexDirection: 'row',
    height: 500,
    display: 'flex',
  },
  section1:{
    width: wp('100%'),
    height: hp('60%'),
    flexDirection: 'row',
    backgroundColor: '#F8F8FF',
    justifyContent:'center',
    alignItems:'center'
  },
  gasPercentage:{
    width: 175,
    height: 300,
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  gasIcon:{
    marginTop: 30,
    marginBottom: 10,
  },
  gasPercentageText1:{
    fontSize: 25,
    fontWeight: '600',
    color: '#0c2d48',
  },
  gasPercentageText2:{
    fontSize: 50,
    fontWeight: '700',
    color: '#146da0',
  },
  valveOptions:{
    width: 175,
    height: 300,
    display: 'flex',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  valveStatus:{
    width: 150,
    height: 140,
    display: 'flex',
    backgroundColor: 'white',
    marginLeft: 15,
    marginBottom: 15,
    borderRadius: 10,
  
  },
  valveTimer:{
    width: 150,
    height: 140,
    display: 'flex',
    backgroundColor: 'white',
    marginLeft: 15,
    borderRadius: 10,
  },
  valveStatusText:{
    fontSize: 20,
    fontWeight: '700',
    color: '#0c2d48',
    marginLeft: 10,
  },
  valveStatusSwitch:{
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginEnd: 30,
    marginBottom: 35,
  },
  valveTimerIcon:{
    fontSize: 30,
    textAlign: 'right',
    marginEnd: 10,
    marginTop: 10,
    marginBottom: 35,
  },
  valveTimerText:{
    fontSize: 20,
    fontWeight: '700',
    color: '#0c2d48',
    marginLeft: 10,
    textAlign: 'left',
  }
});
  
  



export default HomePage;