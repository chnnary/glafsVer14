import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Appbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { API_IP } from '@env';


const ChangeEmailPage = () => {
  const navigation = useNavigation();
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [retypeEmail, setRetypeEmail] = useState('');

  const handleChangeEmail = async () => {
    if (newEmail !== retypeEmail) {
      Alert.alert('Error', 'New email and retype email do not match');
      return;
    }

    try {
      const response = await axios.put(`${API_IP}/change-email`, {
        currentEmail,
        newEmail,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Email changed successfully');
        navigation.navigate('HomeScreen2')
        setCurrentEmail('');
        setNewEmail('');
        setRetypeEmail('');
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
      <ImageBackground source={require('../images/background.png')} style={styles.backgroundContainer}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction color="white" onPress={() => navigation.navigate('HomeScreen2')} />
          <Appbar.Content titleStyle={styles.appbarText} title="Change Email" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" style={styles.icon} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Current Email"
              placeholderTextColor="#dddddd"
              value={currentEmail}
              onChangeText={setCurrentEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" style={styles.icon} color="white" />
            <TextInput
              style={styles.input}
              placeholder="New Email"
              placeholderTextColor="#dddddd"
              value={newEmail}
              onChangeText={setNewEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" style={styles.icon} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Retype New Email"
              placeholderTextColor="#dddddd"
              value={retypeEmail}
              onChangeText={setRetypeEmail}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
            <Text style={styles.buttonText}>Change Email</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#0c2d48',
  },
  appBar: {
    backgroundColor: 'rgba(12, 45, 72, 0.7)',
  },
  appbarText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    paddingEnd: wp('10%'),
    fontSize: wp('5%'),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('1.5%'),
    width: wp('85%'),
    height: hp('7%'),
  },
  icon: {
    fontSize: wp('6%'),
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    fontSize: wp('4%'),
    color: 'white',
    paddingVertical: hp('1%'),
  },
  button: {
    width: wp('85%'),
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  buttonText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#0c2d48',
  },
});

export default ChangeEmailPage;
