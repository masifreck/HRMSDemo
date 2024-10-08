import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'rgba(123,104,238,0.8)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    // marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5
  },
  bottomContainer: {
    justifyContent: 'center',
    height: height / 2.3,
    // backgroundColor:'yellow'
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 25,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  formButton: {
    backgroundColor: '#aa18ea',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 40,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: 'center',
  },
  closeButtonContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 25,
    top: -20,
  },
  leftIcon: {
    height: 22,
    width: 22,
    marginLeft: 10
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginLeft:'7%'
  },
});

export default styles;