import React, { useState } from 'react';
import { Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_IP } from '@env';

const {
  ImageBackground,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} = require('react-native');

function LoginPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = () => {
    if (!username || !password) {
      Alert.alert('Input Required', 'Please enter your login credentials.');
      return;
    }

    const userData = { username, password };

    axios
      .post(`${API_IP}/login-user`, userData)
      .then(res => {
        if (res.data.status === 'ok') {
          AsyncStorage.setItem('token', res.data.data);
          navigation.navigate('HomeScreen');
        } else if (res.data.error) {
          if (res.data.error === "User doesn't exist.") {
            Alert.alert('Login Failed', "User doesn't exist.");
          } else if (res.data.error === "Username and password don't match.") {
            Alert.alert('Login Failed', "Incorrect username or password.");
          } else {
            Alert.alert('Login Failed', res.data.error);
          }
        }
      })
      .catch(err => {
        Alert.alert('Error', 'Something went wrong. Please try again.');
        console.error(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={'always'}>
        <ImageBackground
          source={require('../images/background.png')}
          style={styles.backgroundContainer}>
          <View>
            <View style={styles.centerContainer}>
              <Image
                style={styles.logo}
                source={require('../images/logo.png')}
              />
            </View>
            {/* Username TextInput */}
            <View style={styles.centerContainer}>
              <View style={styles.textBox}>
                <Ionicons
                  name="person-outline"
                  style={styles.userIcon}
                  color="white"
                />
                <TextInput
                  placeholderTextColor={'#dddddd'}
                  placeholder="Username"
                  style={styles.userText}
                  onChange={e => setUsername(e.nativeEvent.text)}
                />

              </View>
              {/* Password TextInput */}
              <View style={styles.textBox}>
                <Ionicons
                  name="lock-closed-outline"
                  style={styles.userIcon}
                  color="white"
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#dddddd"
                  style={styles.userText}
                  onChange={e => setPassword(e.nativeEvent.text)}
                  secureTextEntry={showPassword} // Toggle visibility
                  value={password}
                />

                {/* Show/Hide Icon only if there is input in password */}
                {password.length > 0 && (
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"} // Toggle eye icon
                      style={styles.userIcon}
                      color="white"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
                <View>
                  <Text style={styles.loginText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 10,
              marginRight: 30,
            }}>
              <Text
                onPress={() => navigation.navigate('ForgotPassword')}
                style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
                Forgot Password?
              </Text>
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.bottomtextColumn}>
                <Text onPress={() => navigation.navigate('RegisterPage')} style={styles.bottomText}>
                  Don't have an account yet?
                </Text>
                <Text> </Text>
                <Text onPress={() => navigation.navigate('RegisterPage')} style={styles.bottomtextBold}>
                  Sign Up here
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginPage;
