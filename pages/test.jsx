import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PressureDisplay = () => {
  const [pressure, setPressure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the latest pressure data
    const fetchPressure = async () => {
      try {
        const response = await axios.get(`${API_IP}/latest-pressure`);
        if (response.data) {
          setPressure(response.data.pressure_kpa);
        } else {
          setError('No pressure data found');
        }
      } catch (err) {
        setError('Error fetching pressure data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data initially and set interval for updates
    fetchPressure();
    const intervalId = setInterval(fetchPressure, 3000); // Update every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Latest Pressure:</Text>
      <Text style={styles.value}>{pressure} kPa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default PressureDisplay;
