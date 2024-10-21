import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
  //Register and Login
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  centerContainer:{
      justifyContent: 'center',
      alignItems: 'center',
  },
  logo:{
      height: 100,
      width: 100,
      marginTop: 100,
      marginBottom: 65,
      borderRadius: 60,
      resizeMode: "cover",
  },
  textBox:{
      flexDirection: 'row',
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 30,
      marginLeft: 30,
      marginRight: 30,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#FFFFFF',
      borderRadius: 5,
  },
  userIcon:{
    marginTop: 10,
    marginRight: 10,
    fontSize: 27,
  },
  userText:{
    flex: 1,
    fontSize: 18,
    margin: 10,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
    alignItems: 'center',
    textAlign: 'center',
    margin: 1,
  },
  inBut: {
    width: '85%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c2d48',
  },
  bottomtextColumn:{
    flexDirection: 'row',
    marginTop: 150,
  },
  bottomText:{
    color: 'white',
  },
  bottomtextBold:{
    color: 'white',
    fontWeight: 'bold',
  },
  headerText:{
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    marginLeft:10,
  },
  headerView:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 80,
    marginLeft: 20,
  },
  signupText:{
    margin: 70, 
    flexDirection: 'row'
  },
  logsHeader:{
    backgroundColor: '#0c2d48',

  },
  logsheaderText:{
    color: 'white',
  },
  
  // HomePage
  
})
export default styles;