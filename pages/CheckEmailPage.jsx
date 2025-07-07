import React, { useState } from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_IP } from '@env';

const CheckEmailPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
    return emailRegex.test(email);
  };

  const checkEmailExists = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${API_IP}/check-email2`, { email });

      if (response.status === 200) {
        setError(''); // Clear any previous errors
        navigation.navigate('ChangePasswordPage', { email });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Show error message from server
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Check Email"
          titleStyle={styles.appbarTitle} // Custom styling for title
        />
      </Appbar.Header>

      {/* Background and Content */}
      <ImageBackground
        source={require('../images/background.png')} // Replace with the path to your image
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>
            {/* Input with Icon */}
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={24} color="#ffffff" style={styles.icon} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#dddddd"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError(''); // Clear error when typing
                }}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Error Message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={checkEmailExists}>
              <Text style={styles.buttonText}>Check Email</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    paddingBottom: 100,
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
    height: hp('10%'),
  },
  input: {
    flex: 1,
    fontSize: wp('4.5%'),
    color: 'white',
    paddingVertical: hp('1%'),
    paddingLeft: wp('2%'),
  },
  icon: {
    marginRight: wp('2%'),
  },
  appbar: {
    backgroundColor: '#0c2d48',
  },
  appbarTitle: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: wp('5%'),
    paddingEnd: wp('10%'),
    textAlign: 'center',
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
  errorText: {
    color: '#FF4C4C',
    fontSize: wp('4%'),
    marginTop: hp('1%'),
    textAlign: 'center',
  },
});

export default CheckEmailPage;
