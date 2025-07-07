import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_IP } from '@env';

const ChangePasswordPage = ({ route }) => {
  const navigation = useNavigation();
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const { email } = route.params;

  const password = watch('password', '');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Go Back?',
        'You will be redirected to Forgot Password.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => navigation.navigate('ForgotPassword') },
        ]
      );
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove(); // Cleanup listener
  }, [navigation]);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasUpperCase) {
      return 'Password must include at least one uppercase letter.';
    }

    return true;
  };

  const onSubmit = async (data) => {
    try {
      // Send the new password to the backend
      const response = await axios.post(`${API_IP}/change-password`, {
        email,
        password: data.password, // The new password entered by the user
      });

      // Check for success response
      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully!');
        navigation.navigate('LoginPage');
      }

    } catch (error) {
      // Handle error from backend (e.g., "password is the same as current")
      if (error.response && error.response.data.message) {
        // Show the error message from the backend
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <ImageBackground source={require('../images/background.png')} style={styles.backgroundContainer}>
      <View style={styles.centerContainer}>
        <Text style={styles.headerText}>Change Password</Text>

        {/* Password Input */}
        <Controller
          control={control}
          rules={{
            required: 'Password is required.',
            validate: validatePassword,
          }}
          render={({ field: { onChange, value } }) => (
            <View style={[styles.textBox, errors.password && styles.errorInput]}>
              <TextInput
                style={styles.userText}
                placeholder="New Password"
                placeholderTextColor="#dddddd"
                onChangeText={onChange}
                value={value}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon
                  name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                  style={styles.userIcon}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        {/* Confirm Password Input */}
        <Controller
          control={control}
          rules={{
            required: 'Please confirm your password.',
            validate: (confirmPassword) =>
              confirmPassword === password || 'Passwords do not match.',
          }}
          render={({ field: { onChange, value } }) => (
            <View style={[styles.textBox, errors.confirmPassword && styles.errorInput]}>
              <TextInput
                style={styles.userText}
                placeholder="Confirm Password"
                placeholderTextColor="#dddddd"
                onChangeText={onChange}
                value={value}
                secureTextEntry={!confirmPasswordVisible}
              />
              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                <Icon
                  name={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  style={styles.userIcon}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
          name="confirmPassword"
          defaultValue=""
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <View style={styles.inBut}>
            <Text style={styles.loginText}>Change Password</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  headerText: {
    fontSize: wp('10%'),
    color: 'white',
    fontWeight: 'bold',
    marginBottom: hp('3%'),
    textAlign: 'center',
  },
  textBox: {
    flexDirection: 'row',
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    marginTop: hp('2%'),
    paddingHorizontal: wp('4%'),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: wp('2%'),
    width: wp('90%'),
    alignItems: 'center',
  },
  userText: {
    flex: 1,
    fontSize: wp('4%'),
    margin: wp('1%'),
    color: 'white',
  },
  button: {
    width: wp('83%'),
    height: hp('7.5%'),
    backgroundColor: '#FFFFFF',
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('2%'),
  },
  inBut: {
    width: wp('85%'),
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  loginText: {
    color: '#0c2d48',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  errorText: {
    width: wp('85%'),
    color: 'red',
    fontSize: wp('3.5%'),
    marginBottom: hp('1%'),
  },
  errorInput: {
    borderColor: 'red',
  },
  userIcon: {
    fontSize: wp('7%'),
    marginHorizontal: wp('2%'),
  },
});

export default ChangePasswordPage;
