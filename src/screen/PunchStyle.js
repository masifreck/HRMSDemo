
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      height: '100%',
      width:'100%'
    },
    mapcontainer: {
      height: '70%',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      
    },
    accurateLocationButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      zIndex: 1000,
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#000',
    },
  
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    ImgContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      bottom: -40,
      alignSelf: 'center',
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'gray',
    },
    Image: {
      width: 200,
      height: 200,
    },
    btnView: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      position: 'absolute',
      bottom: 30,
    
    },
    btn: {
      height: 50,
      width: '40%',
      backgroundColor: '#aa18ea',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    txt: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '600',
    },
    buttonContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      bottom: 0,
      padding: 20,
    },
    camButton: {
      height: 80,
      width: 80,
      borderRadius: 40,
      backgroundColor: '#B2BEB5',
      alignSelf: 'center',
      borderWidth: 4,
      borderColor: 'white',
    },
    text: {
      color: 'black',
      fontSize: 15
    }
  });