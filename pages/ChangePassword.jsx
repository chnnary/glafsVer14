import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { API_IP } from '@env';

const ChangePassword = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  // Back handler to go back to HomeScreen2
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeScreen2');
      return true; // Prevent default behavior
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [navigation]);

  const handleChangePassword = async () => {
    if (!newPassword || !retypeNewPassword) {
      setError('Please fill out both fields.');
      return;
    }

    if (newPassword !== retypeNewPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Password Validation: At least 8 characters and 1 uppercase letter
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters long and contain one uppercase letter.');
      return;
    }

    try {
      const response = await axios.post('https://glafstry-backend.onrender.com/change-password2', {
        email,
        newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully.');
        navigation.navigate('HomeScreen2');
      } else {
        Alert.alert('Error', 'Unexpected response from server.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => navigation.navigate('HomeScreen2')} />
        <Appbar.Content title="Change Password" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      {/* Content */}
      <View style={styles.content}>
        {/* Input for New Password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New Password"
            placeholderTextColor="#dddddd"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              setError('');
            }}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Input for Retype New Password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Retype New Password"
            placeholderTextColor="#dddddd"
            value={retypeNewPassword}
            onChangeText={(text) => {
              setRetypeNewPassword(text);
              setError('');
            }}
            secureTextEntry={!showRetypePassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowRetypePassword(!showRetypePassword)}>
            <Icon name={showRetypePassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c2d48',
  },
  appbar: {
    backgroundColor: '#0c2d48',
  },
  appbarTitle: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    paddingEnd: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    height: 70,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    height: 50,
  },
  button: {
    width: '85%',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c2d48',
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ChangePassword;
