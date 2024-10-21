import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { 
    ImageBackground, 
    View, 
    Image,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,

} = require('react-native');

function RegisterPage(){
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [usernameVerify, setUsernameVerify] = useState(false);
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    function handleSubmit(){
        const userData = {
            username: username,
            email : email,
            password,

        };
        if (usernameVerify && emailVerify && passwordVerify){
            axios
            .post("http://192.168.19.245:5003/register",userData)
            .then(res => {console.log(res.data)
            if(res.data.status == "ok"){
                Alert.alert('Registered Sucessfully');
            }
            else {
                Alert.alert(JSON.stringify(res.data));
            }
                
            })
            .catch(e => console.log(e));
        }
        else{
            Alert.alert("Fill all the details.")
        }
    }

    function handleUsername(e){
        const usernameVar = e.nativeEvent.text;
        setUsername(usernameVar);
        setUsernameVerify(false);
        if(usernameVar.length > 5){
            setUsernameVerify(true);
        }
    }
    function handleEmail(e){
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        setEmailVerify(false);
        if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)){
            setEmail(emailVar);
            setEmailVerify(true);
        }
    }
    function handlePassword(e) {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        setPasswordVerify(false);
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(passwordVar)) {
          setPassword(passwordVar);
          setPasswordVerify(true);
        }
    }
    return(
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}>
            <ImageBackground 
                source={
                    require('../images/background.png')} 
                    style ={styles.backgroundContainer}>

                {/* Header */}
                <View 
                    style={styles.headerView}
                >
                    <Text 
                    style={styles.headerText}
                    >
                        Create
                    </Text>
                    <Text 
                        style={styles.headerText}
                    >
                        Account
                    </Text>
                </View>
                {/* Register Text Field */}
                <View 
                style = {styles.centerContainer}
                >
                    <View style = {styles.textBox}>
                        <Ionicons 
                            name="person-outline" 
                            style = {styles.userIcon} 
                            color="white" />
                            <TextInput placeholderTextColor={'#dddddd'}
                            placeholder ="Username"
                            style ={styles.userText}
                            onChange={e => handleUsername(e)}
                            />  
                            {username.length < 1 ? null : usernameVerify? (
                            <Ionicons name="checkmark-circle-outline" style = {styles.userIcon} color="green" />
                            ): (
                            <Ionicons name="alert-circle-outline" style = {styles.userIcon} color="red" />
                            )}
                    </View>
                    {username.length < 1 ? null : usernameVerify ? null : (
                        <Text 
                        style ={{
                            marginTop: 5,
                            marginLeft: 15,
                            color: 'red'
                        }}>
                            Username should be more than 6 characters.
                        </Text>
                    )}
                    <View style = {styles.textBox}>
                        <Ionicons 
                            name="mail-outline" 
                            style = {styles.userIcon} 
                            color="white" />
                            <TextInput placeholderTextColor={'#dddddd'}
                            placeholder ="Email"
                            style ={styles.userText}
                            onChange={e => handleEmail(e)}
                            />
                            {username.length < 1 ? null : emailVerify? (
                            <Ionicons name="checkmark-circle-outline" style = {styles.userIcon} color="green" />
                            ): (
                            <Ionicons name="alert-circle-outline" style = {styles.userIcon} color="red" />
                            )}  
                    </View>
                    {email.length < 1 ? null : emailVerify ? null : (
                        <Text 
                        style ={{
                            marginTop: 5,
                            marginLeft: 15,
                            color: 'red'
                        }}>
                            Invalid email Address
                        </Text>
                    )}
                    <View style = {styles.textBox}>
                        <Ionicons 
                            name="lock-closed-outline" 
                            style = {styles.userIcon} 
                            color="white" />
                            <TextInput placeholderTextColor={'#dddddd'}
                            placeholder ="Password"
                            style ={styles.userText}
                            onChange={e => handlePassword(e)}
                            secureTextEntry={showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                {password.length < 1 ? null : !showPassword ? (
                                    <Ionicons name="eye-outline" style = {styles.userIcon} color={passwordVerify ? 'green' : 'red'} />   
                                    ): (
                                    <Ionicons name="eye-off-outline" style = {styles.userIcon} color={passwordVerify ? 'green' : 'red'} />
                                    )}                                
                            </TouchableOpacity>
                    </View>
                    {password.length < 1 ? null : passwordVerify ? null : (
                        <Text 
                        style ={{
                            marginTop: 5,
                            marginLeft: 15,
                            color: 'red'
                        }}>
                            Should contain Uppercase, Lowercase, Number and 8 or more characters.
                        </Text>
                    )}

                </View>
                <View style={styles.button}>
                        <TouchableOpacity style={styles.inBut} onPress={()=> handleSubmit()}>
                            <View>
                                <Text style={styles.loginText}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                <View style = {styles.centerContainer}>
                        <View style ={styles.signupText}>
                            <Text onPress={() => {navigation.navigate('LoginPage');
                            }}  
                            style={styles.bottomText}>
                                Already have an account?
                            </Text>
                            <Text> </Text>
                            <Text onPress={() => {navigation.navigate('LoginPage');
                            }} 
                            style={styles.bottomtextBold}>
                                Sign In.
                            </Text>
                        </View>
                        
                </View>
            </ImageBackground>
        </ScrollView>
    )
}
export default RegisterPage;