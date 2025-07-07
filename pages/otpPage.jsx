import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API_IP } from '@env';

const OTPPage = ({ navigation, route }) => {
  const { control, handleSubmit } = useForm();
  const { email } = route.params;

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_IP}/verify-otp`, { email, otp: data.otp });
      navigation.navigate('ChangePassword', { email });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the OTP sent to your email</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="OTP"
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="otp"
        defaultValue=""
      />
      <Button title="Verify OTP" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default OTPPage;
