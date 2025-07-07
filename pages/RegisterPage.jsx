import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_IP } from '@env';

const {
  ImageBackground,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} = require('react-native');

function RegisterPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [usernameVerify, setUsernameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [retypePassword, setRetypePassword] = useState('');
  const [retypePasswordVerify, setRetypePasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showRetypePassword, setShowRetypePassword] = useState(true);

  function handleSubmit() {
    if (!usernameVerify || !emailVerify || !passwordVerify || !retypePasswordVerify) {
      Alert.alert("Fill all the details correctly.");
      return;
    }

    const userData = { username, email, password };
    axios
      .post(`${API_IP}/register`, userData)
      .then(res => {
        if (res.data.status === "ok") {
          Alert.alert('Registered Successfully');
          navigation.navigate('LoginPage');
        } else {
          Alert.alert(res.data.message || JSON.stringify(res.data));
        }
      })
      .catch(e => {
        console.error(e);
        Alert.alert("An error occurred. Please try again later.");
      });
  }

  function handleUsername(e) {
    const usernameVar = e.nativeEvent.text;
    setUsername(usernameVar);
    setUsernameVerify(usernameVar.length > 5);
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar));
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(passwordVar));
  }

  function handleRetypePassword(e) {
    const retypePasswordVar = e.nativeEvent.text;
    setRetypePassword(retypePasswordVar);
    setRetypePasswordVerify(retypePasswordVar === password);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}>
      <ImageBackground
        source={require('../images/background.png')}
        style={styles.backgroundContainer}>
        {/* Header */}
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Create</Text>
          <Text style={styles.headerText}>Account</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.centerContainer}>
          {/* Username */}
          <View style={styles.textBox}>
            <Ionicons name="person-outline" style={styles.userIcon} color="white" />
            <TextInput
              placeholderTextColor={'#dddddd'}
              placeholder="Username"
              style={styles.userText}
              onChange={handleUsername}
            />
            {username.length > 0 && (
              <Ionicons
                name={usernameVerify ? "checkmark-circle-outline" : "alert-circle-outline"}
                style={styles.userIcon}
                color={usernameVerify ? "green" : "red"}
              />
            )}
          </View>
          {username.length > 0 && !usernameVerify && (
            <Text style={styles.errorText}>Username should be more than 6 characters.</Text>
          )}

          {/* Email */}
          <View style={styles.textBox}>
            <Ionicons name="mail-outline" style={styles.userIcon} color="white" />
            <TextInput
              placeholderTextColor={'#dddddd'}
              placeholder="Email"
              style={styles.userText}
              onChange={handleEmail}
            />
            {email.length > 0 && (
              <Ionicons
                name={emailVerify ? "checkmark-circle-outline" : "alert-circle-outline"}
                style={styles.userIcon}
                color={emailVerify ? "green" : "red"}
              />
            )}
          </View>
          {email.length > 0 && !emailVerify && (
            <Text style={styles.errorText}>Invalid email address.</Text>
          )}

          {/* Password */}
          <View style={styles.textBox}>
            <Ionicons name="lock-closed-outline" style={styles.userIcon} color="white" />
            <TextInput
              placeholderTextColor={'#dddddd'}
              placeholder="Password"
              style={styles.userText}
              secureTextEntry={showPassword}
              onChange={handlePassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                style={styles.userIcon}
                color={passwordVerify ? "green" : "red"}
              />
            </TouchableOpacity>
          </View>
          {password.length > 0 && !passwordVerify && (
            <Text style={styles.errorText}>
              Must include uppercase, lowercase, a number, and be 8+ characters.
            </Text>
          )}

          {/* Retype Password */}
          <View style={styles.textBox}>
            <Ionicons name="lock-closed-outline" style={styles.userIcon} color="white" />
            <TextInput
              placeholderTextColor={'#dddddd'}
              placeholder="Retype Password"
              style={styles.userText}
              secureTextEntry={showRetypePassword}
              onChange={handleRetypePassword}
            />
            <TouchableOpacity onPress={() => setShowRetypePassword(!showRetypePassword)}>
              <Ionicons
                name={showRetypePassword ? "eye-off-outline" : "eye-outline"}
                style={styles.userIcon}
                color={retypePasswordVerify ? "green" : "red"}
              />
            </TouchableOpacity>
          </View>
          {retypePassword.length > 0 && !retypePasswordVerify && (
            <Text style={styles.errorText}>Passwords do not match.</Text>
          )}
        </View>

        {/* Sign Up Button */}
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Already Have an Account */}
        <View style={styles.centerContainer}>
          <View style={styles.signupText}>
            <Text onPress={() => navigation.navigate('LoginPage')} style={styles.bottomText}>
              Already have an account?
            </Text>
            <Text> </Text>
            <Text onPress={() => navigation.navigate('LoginPage')} style={styles.bottomtextBold}>
              Sign In.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default RegisterPage;
