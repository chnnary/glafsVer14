import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function SettingsPage({ route }) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Remove the token from AsyncStorage
    await AsyncStorage.removeItem('token');

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginPage' }],
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Settings" titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.body}>
        <Text onPress={() => navigation.navigate('CheckEmailPage')} style={styles.subText}>
          Change Password
        </Text>
        <Text onPress={() => navigation.navigate('ChangeEmailPage')} style={styles.subText}>
          Change Email
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
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
  button: {
    width: wp('85%'),
    backgroundColor: '#0c2d48',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('3%'),
    marginLeft: wp('4%'),
  },
  buttonText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SettingsPage;
