import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const OTPPage = ({ navigation, route }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { email } = route.params;
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle OTP submission
  const onSubmit = async (data) => {
    if (!data.otp) {
      setErrorMessage('Please enter the OTP.');
      return;
    }

    setLoading(true); // Show loading state
    try {
      const response = await axios.post('http://192.168.111.245:5003/verify-otp', { email, otp: data.otp });
      
      if (response.data.message === 'OTP verified successfully' || response.data.success === true) {
        navigation.navigate('ChangePassword', { email });
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setErrorMessage('An error occurred. Please check your network and try again later.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Function to handle OTP resend
  const resendOTP = async () => {
    setLoading(true);
    try {
      await axios.post('http://192.168.111.245:5003/resend-otp', { email });
      Alert.alert('Success', 'A new OTP has been sent to your email.');
    } catch (error) {
      console.error('Error during OTP resend:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('../images/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
          <Appbar.Content titleStyle={styles.appbarText} title="Verify OTP" />
        </Appbar.Header>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Enter Verification Code</Text>

          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

          <Controller
            control={control}
            rules={{
              required: 'OTP is required.',
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'OTP should be a 6-digit number.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.otp && styles.inputError]}
                placeholder="OTP"
                placeholderTextColor="#CCCCCC"
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                maxLength={6}
              />
            )}
            name="otp"
            defaultValue=""
          />
          {errors.otp && <Text style={styles.errorMessage}>{errors.otp.message}</Text>}

          <TouchableOpacity style={styles.otpButton} onPress={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={resendOTP} style={styles.resendButton} disabled={loading}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.signupView}>
          <Text style={styles.signupText}>
            Do you have an Account?
          </Text>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  appBar: {
    backgroundColor: 'rgba(12, 45, 72, 0.7)',
  },
  appbarText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    paddingEnd: '10%',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
    paddingBottom: hp(2),
  },
  title: {
    fontSize: hp(3),
    color: '#FFFFFF',
    marginBottom: hp(2),
  },
  errorMessage: {
    color: 'red',
    marginBottom: hp(2),
  },
  input: {
    width: '100%',
    height: hp(6),
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: hp(2),
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: 'red',
  },
  otpButton: {
    width: '100%',
    height: hp(6),
    backgroundColor: '#0C2D48',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: hp(2.5),
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: hp(2),
  },
  resendText: {
    color: '#FFFFFF',
    fontSize: hp(2),
    textDecorationLine: 'underline',
  },
  signupView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
    padding: wp(4),
  },
  signupText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  signupButton: {
    width: '100%',
    height: hp(6),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(20),
  },
});

export default OTPPage;
