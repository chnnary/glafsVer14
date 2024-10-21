import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginPage from './pages//LoginPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import LogsPage from './pages/LogsPage';
import RegisterPage from './pages/RegisterPage'; 
import Testing from './pages/Testing';
import OnBoardingPage from './pages/onBoardingPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OTPPage from './pages/otpPage';
// import ValveTimer from './pages/ValveTimer';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Logs') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0c2d48',
          tabBarInactiveTintColor: '#0c2d48',
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Logs" component={LogsPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    );
}
function HomeScreen2() {
    return (
      <Tab.Navigator
        initialRouteName="Settings"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Logs') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0c2d48',
          tabBarInactiveTintColor: '#0c2d48',
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Logs" component={LogsPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="onBoardingPage"
        screenOptions={({route}) => ({
            headerShown: false,
        })}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
        <Stack.Screen name='Testing' component={Testing} />
        <Stack.Screen name='onBoardingPage' component={OnBoardingPage} />
        <Stack.Screen name='LogsPage' component={LogsPage} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordPage} />
        <Stack.Screen name='ChangePassword' component={ChangePasswordPage} />
        <Stack.Screen name='OTP' component={OTPPage} />
        {/* <Stack.Screen name='ValveTimer' component={ValveTimer} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
