// LogPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const LogPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://192.168.254.125:5003/logs'); // Replace with your server IP
                const combinedLogs = [];

                // Combine flame and gas logs into a single array
                response.data.flameLogs.forEach(log => {
                    combinedLogs.push({
                        type: 'Flame Detected',
                        timestamp: log.timestamp
                    });
                });

                response.data.gasLogs.forEach(log => {
                    combinedLogs.push({
                        type: 'Gas Detected',
                        timestamp: log.timestamp
                    });
                });

                // Sort logs by timestamp (optional)
                combinedLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setLogs(combinedLogs);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detection Logs</Text>
            <FlatList
                data={logs}
                keyExtractor={(item, index) => index.toString()} // Using index as key since logs are combined
                renderItem={({ item }) => (
                    <View style={styles.logItem}>
                        <Text>{`${item.type}`}</Text>
                        <Text>{`Date: ${new Date(item.timestamp).toLocaleDateString()}`}</Text>
                        <Text>{`Time: ${new Date(item.timestamp).toLocaleTimeString()}`}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    logItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default LogPage;
