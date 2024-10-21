import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { 
    ImageBackground, 
    View, 
    Image,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,

} = require('react-native');

function LoginPage(){
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    function handleSubmit(){
        console.log(username, password);
        const userData={
            username: username,
            password
        }
        axios
        .post("http://192.168.254.125:5003/login-user", userData)
        .then(res => {console.log(res.data)
        if (res.data.status == 'ok'){
            AsyncStorage.setItem('token', res.data.data);
            navigation.navigate('HomeScreen');
        }
        });
    }
    return(
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps={'always'}>
            <ImageBackground 
                source={
                    require('../images/background.png')} 
                    style ={styles.backgroundContainer}>
                <View>
                    <View style ={styles.centerContainer}>
                        <Image 
                        style = {styles.logo}
                        source={
                            require('../images/logo.png')}>
                        </Image>
                    </View> 
                    {/* Login Text Field */}
                    <View style = {styles.centerContainer}>
                        <View style = {styles.textBox}>
                            <Ionicons 
                            name="person-outline" 
                            style = {styles.userIcon} 
                            color="white" />
                            <TextInput placeholderTextColor={'#dddddd'}
                            placeholder ="Username"
                            style ={styles.userText}
                            onChange={e => setUsername(e.nativeEvent.text)}
                            />  
                        </View>
                        <View style = {styles.textBox}>
                            <Ionicons 
                                name="lock-closed-outline" 
                                style = {styles.userIcon} 
                                color="white" />
                            <TextInput 
                                placeholder = "Password"
                                placeholderTextColor = "#dddddd"
                                style = {styles.userText}
                                onChange={e => setPassword(e.nativeEvent.text)}
                                secureTextEntry={showPassword}
                                />
                        </View>                      
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
                            <View>
                                <Text style={styles.loginText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Forgot Password */}
                    <View 
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginTop: 10,
                            marginRight: 30,
                        }}>
                            <Text 
                            onPress={() => {navigation.navigate('ForgotPassword')}}
                            style={{color: 'white',
                            fontSize:  16,
                            fontWeight: 500,
                            }}>
                                Forgot Password?
                            </Text>    
                    </View>
                    <View style = {styles.centerContainer}>
                        <View style ={styles.bottomtextColumn}>
                            <Text onPress={() => {navigation.navigate('RegisterPage');
                            }} 
                            style={styles.bottomText}>
                                Don't have an account yet?
                            </Text>
                            <Text> </Text>
                            <Text onPress={() => {navigation.navigate('RegisterPage');
                            }} 
                            style={styles.bottomtextBold}>
                                Sign Up here
                            </Text>
                        </View>
                        
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
    
    
}
// var styles = StyleSheet.create({
//     backgroundContainer: {
//         flex: 1,
//         width: null,
//         height: null,
//     },
//     centerContainer:{
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     logo:{
//         height: 100,
//         width: 100,
//         marginTop: 100,
//         marginBottom: 65,
//         borderRadius: 60,
//         resizeMode: "cover",
//     },
//     textBox:{
//         flexDirection: 'row',
//         paddingTop: 5,
//         paddingBottom: 5,
//         marginTop: 30,
//         marginLeft: 30,
//         marginRight: 30,
//         paddingHorizontal: 15,
//         borderWidth: 1,
//         borderColor: '#FFFFFF',
//         borderRadius: 5,
//     },
//     userIcon:{
//         marginTop: 10,
//         marginRight: 10,
//         fontSize: 27,
//     },
//     userText:{
//         flex: 1,
//         fontSize: 18,
//         margin: 10,
//         color: 'white',
//     },
//     button: {
//         alignItems: 'center',
//         marginTop: 40,
//         alignItems: 'center',
//         textAlign: 'center',
//         margin: 1,
//     },
//     inBut: {
//         width: '85%',
//         backgroundColor: 'white',
//         alignItems: 'center',
//         paddingHorizontal: 15,
//         paddingVertical: 15,
//         borderRadius: 5,
//     },
//     loginText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#0c2d48',
//     },
//     bottomtextColumn:{
//         flexDirection: 'row',
//         marginTop: 150,
//     },
//     bottomText:{
//         color: 'white',
//     },
//     bottomtextBold:{
//         color: 'white',
//         fontWeight: 'bold',
//     }
//   });
export default LoginPage;