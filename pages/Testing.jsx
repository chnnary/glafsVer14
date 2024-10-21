import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import axios from 'axios';

const ServoControl = () => {
  const BASE_URL = 'http://127.0.0.1:5000/servo/toggle'; // Replace with your Raspberry Pi's IP address
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    const angle = isEnabled ? 0 : 90; // Change angle as needed
    await axios.post('http://192.168.254.181:5000/servo', { angle });
  };

  return (
    <View style={styles.container}>
      <Text>Control Servo Motor</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ServoControl;
