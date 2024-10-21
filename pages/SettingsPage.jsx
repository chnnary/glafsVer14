import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsPage({ route }) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Remove the token from AsyncStorage
    await AsyncStorage.removeItem('token');

    // Optionally, navigate the user to the login page
    navigation.replace('LoginPage');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.body}>
        <Text style={styles.headerText}>Gas Percentage Settings</Text>
        <View>
          <Text style={styles.subText}>Notify when gas is low</Text>
        </View>
        <Text onPress={() => navigation.navigate('ChangePasswordPage')} style={styles.subText}>
          Change Password
        </Text>
        <Text onPress={() => navigation.navigate('ChangeEmailPage')} style={styles.subText}>
          Change Email
        </Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appbar: {
    backgroundColor: '#0c2d48',
  },
  title: {
    color: 'white',
  },
  body: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  subText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SettingsPage;
