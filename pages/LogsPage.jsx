// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Appbar } from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const LogPage = () => {
//     const [logs, setLogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchLogs = async () => {
//             try {
//                 const response = await axios.get('https://glafstry-backend.onrender.com/logs'); // Replace with your server IP
//                 const combinedLogs = [];

//                 // Combine flame and gas logs into a single array
//                 response.data.flameLogs.forEach(log => {
//                     combinedLogs.push({
//                         type: 'Flame Detected',
//                         timestamp: log.timestamp
//                     });
//                 });

//                 response.data.gasLogs.forEach(log => {
//                     combinedLogs.push({
//                         type: 'Gas Detected',
//                         timestamp: log.timestamp
//                     });
//                 });

//                 // Sort logs by timestamp
//                 combinedLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//                 setLogs(combinedLogs);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // Initial fetch
//         fetchLogs();

//         // Set up interval to fetch logs every second
//         const intervalId = setInterval(fetchLogs, 1000);

//         // Clean up the interval on component unmount
//         return () => clearInterval(intervalId);
//     }, []);

//     if (loading) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     if (error) {
//         return (
//             <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>Error: {error}</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Appbar.Header style={styles.appbar}>
//                 <Appbar.Content title="Logs" titleStyle={styles.title} />
//             </Appbar.Header>

//             <FlatList
//                 data={logs}
//                 keyExtractor={(item, index) => index.toString()} // Using index as key since logs are combined
//                 renderItem={({ item }) => (
//                     <View style={styles.logItemContainer}>
//                         <Ionicons name="notifications-outline" size={30} color="#0c2d48" style={styles.icon} />
//                         <View style={styles.logItem}>
//                             <Text style={styles.itemType}>{`${item.type}`}</Text>
//                             <Text style={styles.itemDate}>{`Date: ${new Date(item.timestamp).toLocaleDateString()}`}</Text>
//                             <Text style={styles.itemTime}>{`Time: ${new Date(item.timestamp).toLocaleTimeString()}`}</Text>
//                         </View>
//                     </View>
//                 )}
//                 contentContainerStyle={styles.flatListContent} // Add padding to FlatList content
//                 ItemSeparatorComponent={() => <View style={styles.separator} />} // Add spacing between items
//                 style={styles.flatList} // Add margin to the FlatList for spacing from the AppBar
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 0,
//         backgroundColor: '#fff',
//     },
//     itemTime: {
//         color: '#000000',
//         fontSize: 15,
//     },
//     itemDate: {
//         color: '#000000',
//         fontSize: 15,
//     },
//     itemType: {
//         color: '#000000',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     backAction: {
//         marginLeft: 2,
//     },
//     appbar: {
//         backgroundColor: '#0c2d48',
//     },
//     title: {
//         color: '#FFFFFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginVertical: 10,
//         marginLeft: -7,
//     },
//     logItemContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 15,
//         paddingHorizontal: 10,
//     },
//     logItem: {
//         flex: 1,
//         marginLeft: 3,
//         backgroundColor: '#D9D9D9',
//         borderRadius: 10,
//         padding: 10,
//     },
//     separator: {
//         height: 0,
//         backgroundColor: 'white',
//     },
//     flatList: {
//         marginTop: 25,
//     },
//     errorContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     errorText: {
//         fontSize: 18,
//         color: 'red',
//     },
// });

// export default LogPage;

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Appbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { API_IP } from '@env';

const LogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const previousLogsRef = useRef([]); // Store previous logs to compare changes

  // Request notification permission
  const requestNotificationPermission = async () => {
    await notifee.requestPermission();
  };

  // Display a notification
  const displayNotification = async (newLog) => {
    await notifee.createChannel({
      id: 'logs_channel',
      name: 'Log Notifications',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Log',
      body: `${newLog.type} at ${new Date(newLog.timestamp).toLocaleTimeString()}`,
      android: {
        channelId: 'logs_channel',
        smallIcon: 'ic_launcher', // Ensure you have a valid icon in res/drawable
      },
    });
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${API_IP}/logs`);
        const combinedLogs = [];

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

        // Sort logs by timestamp
        combinedLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Check for new logs
        if (previousLogsRef.current.length > 0) {
          const newLogs = combinedLogs.filter(
            log => !previousLogsRef.current.some(prev => prev.timestamp === log.timestamp)
          );
          if (newLogs.length > 0) {
            // Trigger notification for each new log
            newLogs.forEach(log => displayNotification(log));
          }
        }

        // Update logs and previousLogsRef
        setLogs(combinedLogs);
        previousLogsRef.current = combinedLogs;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    requestNotificationPermission();

    // Initial fetch
    fetchLogs();

    // Set up interval to fetch logs every second
    const intervalId = setInterval(fetchLogs, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
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
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Logs" titleStyle={styles.title} />
      </Appbar.Header>

      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItemContainer}>
            <Ionicons name="notifications-outline" size={30} color="#0c2d48" style={styles.icon} />
            <View style={styles.logItem}>
              <Text style={styles.itemType}>{`${item.type}`}</Text>
              <Text style={styles.itemDate}>{`Date: ${new Date(item.timestamp).toLocaleDateString()}`}</Text>
              <Text style={styles.itemTime}>{`Time: ${new Date(item.timestamp).toLocaleTimeString()}`}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  itemTime: { color: '#000000', fontSize: 15 },
  itemDate: { color: '#000000', fontSize: 15 },
  itemType: { color: '#000000', fontSize: 20, fontWeight: 'bold' },
  appbar: { backgroundColor: '#0c2d48' },
  title: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  logItemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 },
  logItem: { flex: 1, marginLeft: 3, backgroundColor: '#D9D9D9', borderRadius: 10, padding: 10 },
  separator: { height: 0, backgroundColor: 'white' },
  flatList: { marginTop: 25 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: 'red' },
});

export default LogPage;

