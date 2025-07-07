import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { API_IP } from '@env';

const ForgotPasswordPage = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // First, check if the email format is valid
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(data.email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Check if the email exists in the database
      const emailCheckResponse = await axios.post(`${API_IP}/check-email`, { email: data.email });

      if (emailCheckResponse.status === 200 && emailCheckResponse.data.exists) {
        // If the email exists, proceed to send OTP
        const otpResponse = await axios.post(`${API_IP}/send-otp`, { email: data.email });
        if (otpResponse.status === 200) {
          navigation.navigate('Testing', { email: data.email });
        } else {
          Alert.alert('Error', 'Failed to send OTP');
        }
      } else {
        // If the email doesn't exist, show an error message
        Alert.alert('Error', 'Email not registered');
      }
    } catch (error) {
      console.error('Error handling email check or OTP request:', error);
      Alert.alert('Error', error.response?.data || 'An error occurred');
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
          <Appbar.BackAction color="white" onPress={() => navigation.navigate('LoginPage')} />
          <Appbar.Content titleStyle={styles.appbarText} title="Forgot Password" />
        </Appbar.Header>

        <View style={styles.otpContainer}>
          <Text style={styles.title}>Enter Email Address</Text>

          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#CCCCCC"
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
            name="email"
            defaultValue=""
          />

          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>

          <Text onPress={() => navigation.navigate('LoginPage')} style={styles.signinText}>
            Back to Sign In
          </Text>
        </View>

        <View style={styles.signupView}>
          <Text onPress={() => navigation.navigate('RegisterPage')} style={styles.signupText}>
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
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
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
  otpContainer: {
    justifyContent: 'top',
    alignItems: 'center',
    padding: wp(4),
    marginTop: hp(10),
    marginBottom: hp(10),
  },
  title: {
    fontSize: hp(3),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: hp(3),
    textAlign: 'center',
  },
  input: {
    height: hp(6),
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: wp(3),
    color: '#FFFFFF',
    marginBottom: hp(2),
    fontSize: hp(2.5),
  },
  error: {
    color: '#FF6666',
    marginBottom: hp(2),
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: hp(6),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  buttonText: {
    color: '#0C2D48',
    fontSize: hp(2.5),
    fontWeight: 'bold',
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
  signinText: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signupButton: {
    width: '100%',
    height: hp(6),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
});

export default ForgotPasswordPage;
