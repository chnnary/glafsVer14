import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  // Register and Login
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: hp('12%'), // Responsive height
    width: wp('25%'), // Responsive width
    marginTop: hp('10%'), // Responsive margin
    marginBottom: hp('8%'), // Responsive margin
    borderRadius: 60,
    resizeMode: "cover",
  },
  textBox: {
    flexDirection: 'row',
    paddingTop: hp('1%'), // Responsive padding
    paddingBottom: hp('1%'), // Responsive padding
    marginTop: hp('4%'), // Responsive margin
    marginLeft: wp('8%'), // Responsive margin
    marginRight: wp('8%'), // Responsive margin
    paddingHorizontal: wp('4%'), // Responsive padding
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 5,
  },
  userIcon: {
    marginTop: hp('2.5%'), // Responsive margin
    marginRight: wp('2%'), // Responsive margin
    fontSize: wp('7%'), // Responsive font size
  },
  userText: {
    flex: 1,
    fontSize: wp('5%'), // Responsive font size
    margin: 10,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    marginTop: hp('5%'), // Responsive margin
    textAlign: 'center',
    margin: 1,
  },
  inBut: {
    width: wp('85%'), // Responsive width
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: wp('4%'), // Responsive padding
    paddingVertical: hp('2%'), // Responsive padding
    borderRadius: 5,
  },
  loginText: {
    fontSize: wp('5%'), // Responsive font size
    fontWeight: 'bold',
    color: '#0c2d48',
  },
  bottomtextColumn: {
    flexDirection: 'row',
    marginTop: hp('20%'), // Responsive margin
  },
  bottomText: {
    color: 'white',
  },
  bottomtextBold: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: wp('10%'), // Responsive font size
    color: 'white',
    fontWeight: 'bold',
    marginLeft: wp('2%'), // Responsive margin
  },
  headerView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: hp('8%'), // Responsive margin
    marginLeft: wp('5%'), // Responsive margin
  },
  signupText: {
    margin: hp('10%'), // Responsive margin
    flexDirection: 'row'
  },
  logsHeader: {
    backgroundColor: '#0c2d48',
  },
  logsheaderText: {
    color: 'white',
  },
  
  // HomePage
});

export default styles;
