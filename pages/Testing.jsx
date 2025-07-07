import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import axios from 'axios';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const OTPPage = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle OTP submission
  const onSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true); // Show loading state
    try {
      const response = await axios.post(`${API_IP}/verify-otp`, { email, otp });

      if (response.data.message === 'OTP verified successfully' || response.data.success === true) {
        navigation.navigate('ChangePassword', { email });
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setErrorMessage('An error occurred. The OTP you entered is incorrect.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Function to handle OTP resend
  const resendOTP = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_IP}/resend-otp`, { email });
      Alert.alert('Success', 'A new OTP has been sent to your email.');
    } catch (error) {
      console.error('Error during OTP resend:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
      <ImageBackground
        source={require('../images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <Appbar.Header style={styles.appBar}>
            <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
            <Appbar.Content titleStyle={styles.appbarText} title="Verify" />
          </Appbar.Header>


          <View style={styles.content}>
            <Text style={styles.title}>Enter Verification Code</Text>

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <OtpInputs
              handleChange={(code) => setOtp(code)}
              numberOfInputs={6}
              style={styles.otpContainer}
              inputStyles={styles.otpInput}
              keyboardType="number-pad"
              clearTextOnFocus
              autofillFromClipboard={false}
            />

            <TouchableOpacity style={styles.otpButton} onPress={onSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText2}>Verify</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.resendTextPrompt}>Didn't receive the code?</Text>

            <TouchableOpacity onPress={resendOTP} style={styles.resendButton} disabled={loading}>
              <Text style={styles.resendText}>Resend code</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupView}>
            <Text style={styles.signupText}>
              Do you have an Account?
            </Text>
            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('RegisterPage')}>
              <Text style={styles.buttonText2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingEnd: '15%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: wp(4),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: hp(2),
  },
  otpInput: {
    width: wp(12),
    height: wp(12),
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: hp(2.5),
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  otpButton: {
    width: '50%',
    height: hp(6),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  buttonText2: {
    color: '#0C2D48',
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
  resendTextPrompt: {
    color: '#FFFFFF',
    fontSize: hp(2),
    marginTop: hp(2),
  },
  signupView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
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
    marginBottom: hp(10),
  },
});

export default OTPPage;
