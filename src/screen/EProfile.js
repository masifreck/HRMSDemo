import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Insurance from '../component/Insurance';
import Fontisto from 'react-native-vector-icons/Fontisto';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const EProfile = () => {

  const [showBankDetails, setshowBankDetails] = useState(false);
  const [showInsuranceDetails, setshowInsuranceDetails] = useState(false);
  const [showGeneralDetails, setshowGeneralDetails] = useState(true);
  const [showOfficialDetails, setshowOfficialDetails] = useState(false);
  const [showCommunicationDetails, setshowCommunicationDetails] = useState(false);

  const handleBankPress = () => {
    setshowBankDetails(!showBankDetails);
  };
  const handleInsurancePress = () => {
    setshowInsuranceDetails(!showInsuranceDetails);
  };
  const handleGeneralPress = () => {
    setshowGeneralDetails(!showGeneralDetails);
  };
  const handleOfficialPress = () => {
    setshowOfficialDetails(!showOfficialDetails);
  };
  const handleCommunicationPress = () => {
    setshowCommunicationDetails(!showCommunicationDetails);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ImageBackground
            source={require('../assets/menu-bg.jpeg')}
            style={styles.imgBack}>
            <View style={styles.imgContainer}>
              <Image
                source={require('../assets/mypic.jpeg')}
                style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 1, borderColor: 'white' }}
              />

              <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 20 }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Roboto-Medium',
                    marginBottom: 4,
                    fontWeight: '500'
                  }}>
                  Mr. Satyaranjan Ojha
                </Text>
                <Text style={{ fontSize: 13, color: 'white', fontWeight: '500', marginBottom: 4, }}>
                  BRANCH : ELPL-CO-BHUBANESWAR</Text>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 13,
                    marginBottom: 4,
                  }}>
                  satyaranjanojha@gmail.com
                </Text>
                <Text style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Regular',
                  fontSize: 13
                }}>Employee Code : 44</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}>
          <PanCard />
          <AdharCard />
        </ScrollView>


        <TouchableOpacity
          style={[
            styles.button,
            showGeneralDetails ? styles.buttonWithDetails : styles.buttonWithoutDetails,
          ]}
          onPress={handleGeneralPress}
        >
          <Text style={styles.buttonText}>General Details</Text>
          <Text style={styles.arrowButton}>{showGeneralDetails ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showGeneralDetails && (
          <View style={styles.bottomContainer}>

            <View style={[styles.row]}>
              <View >
                <View>
                  <Text style={styles.txt1}>Mother's Name :</Text>
                  <Text style={styles.txt2}>Manjulata Ojha</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Company :</Text>
                  <Text style={styles.txt2}>Exim Logistics Pvt. Ltd.</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Department :</Text>
                  <Text style={styles.txt2}>Human Resouses</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Current/Left :</Text>
                  <Text style={styles.txt2}>Current</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  {/* <Text style={styles.txt1}>Blood Group :</Text> */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Fontisto name="blood-drop" size={18} color={'red'} />
                    <Text style={[styles.txt2, { marginLeft: 10 }]}>O+</Text>
                  </View>

                </View>



              </View>
              <View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Joining Date :</Text>
                  <Text style={styles.txt2}>16-05-2016</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Division :</Text>
                  <Text style={styles.txt2}>BBSR</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Designation :</Text>
                  <Text style={styles.txt2}>Manager</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Grade :</Text>
                  <Text style={styles.txt2}>IL5</Text>
                </View>

              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            showOfficialDetails ? styles.buttonWithDetails : styles.buttonWithoutDetails,
          ]}
          onPress={handleOfficialPress}
        >
          <Text style={styles.buttonText}>Official Details</Text>
          <Text style={styles.arrowButton}>{showOfficialDetails ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showOfficialDetails && (
          <View style={[styles.bottomContainer]}>
            <View style={[styles.row]}>
              <View >
                <View>
                  <Text style={styles.txt1}>PF No :</Text>
                  <Text style={styles.txt2}>OF1234567876543456</Text>
                </View>
                {/* <View style={{ marginTop: 10 }}>
                <Text style={styles.txt1}>UAN :</Text>
                <Text style={styles.txt2}>199788349909</Text>
              </View> */}
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>ESIC Date :</Text>
                  <Text style={styles.txt2}>01-09-2016</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Profession Tax :</Text>
                  <Text style={styles.txt2}>Yes</Text>
                </View>
              </View>

              <View>
                {/* <View>
                <Text style={styles.txt1}>PAN No :</Text>
                <Text style={styles.txt2}>BGYPD91234</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.txt1}>Aadhar No :</Text>
                <Text style={styles.txt2}>573664512345</Text>
              </View> */}
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>UAN :</Text>
                  <Text style={styles.txt2}>199788349909</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>ESIC No :</Text>
                  <Text style={styles.txt2}>12345678987654</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>PF Applicable :</Text>
                  <Text style={styles.txt2}>Yes</Text>
                </View>
              </View>
            </View>
          </View>
        )}


        <TouchableOpacity
          style={[
            styles.button,
            showInsuranceDetails ? styles.buttonWithDetails : styles.buttonWithoutDetails,
          ]}
          onPress={handleInsurancePress}
        >
          <Text style={styles.buttonText}>Insurance Details</Text>
          <Text style={styles.arrowButton}>{showInsuranceDetails ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showInsuranceDetails && (
          <View style={[styles.bottomContainer, { padding: 0, overflow: 'hidden' }]}>
            <Insurance />
          </View>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            showCommunicationDetails ? styles.buttonWithDetails : styles.buttonWithoutDetails,
          ]}
          onPress={handleCommunicationPress}
        >
          <Text style={styles.buttonText}>Communication Details</Text>
          <Text style={styles.arrowButton}>{showCommunicationDetails ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showCommunicationDetails && (
          <View style={[styles.bottomContainer]}>
            <View style={[styles.row]}>
              <View >
                <View>
                  <Text style={styles.txt1}>Telephone :</Text>
                  <Text style={styles.txt2}>1234567890</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Mobile No 2 :</Text>
                  <Text style={styles.txt2}>1997883499</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Emergency Contact Name :</Text>
                  <Text style={styles.txt2}>Mohan Dash</Text>
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.txt1}>Mobile No 1 :</Text>
                  <Text style={styles.txt2}>9087654321</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Personal Email :</Text>
                  <Text style={styles.txt2}>abc@gmail.com</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Emergency Contact No :</Text>
                  <Text style={styles.txt2}>5678987654</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            showBankDetails ? styles.buttonWithDetails :
              [styles.buttonWithoutDetails, { marginBottom: 30 }],

          ]}
          onPress={handleBankPress}
        >
          <Text style={styles.buttonText}>Bank Details</Text>
          <Text style={styles.arrowButton}>{showBankDetails ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showBankDetails && (
          <View style={[styles.bottomContainer, { marginBottom: 30, }]}>
            {/* Add your view with text components here */}
            <View style={[styles.row]}>
              <View>
                <View>
                  <Text style={styles.txt1}>Payment Mode :</Text>
                  <Text style={styles.txt2}>Bank</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Bank Branch :</Text>
                  <Text style={styles.txt2}>Bhadrak</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>IFSC Code :</Text>
                  <Text style={styles.txt2}>SBIN0123456</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Account Holder Name :</Text>
                  <Text style={styles.txt2}>Satyaranjan Ojha</Text>
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.txt1}>Bank :</Text>
                  <Text style={styles.txt2}>SBI</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>Account No :</Text>
                  <Text style={styles.txt2}>20078123456</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.txt1}>MICR Code :</Text>
                  <Text style={styles.txt2}>NONE</Text>
                </View>
              </View>
            </View>
          </View>
        )}



      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonWithoutDetails: {
    borderRadius: 10,
    // marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0.8,
    borderColor: 'lightgray',
  },
  buttonWithDetails: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8d7f5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 14,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aa18ea',
  },
  arrowButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aa18ea',
  },
  container: {
    flex: 1,
    backgroundColor: '#e9e6eb',
    // height: '100%'
  },
  topContainer: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    height: 150,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgBack: {
    height: 150,
    width: '100%'
  },
  imgContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  bottomContainer: {
    alignItems: 'stretch',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20
  },
  lable: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txt1: {
    color: 'gray',
    fontSize: 12
  },
  txt2: {
    color: 'black',
    fontSize: 15,
    fontWeight: '700'
  },
  panView: {
    height: 190,
    width: 295,
    margin: 8,
    marginLeft: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adharView: {
    height: 190,
    width: 295,
    margin: 8,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.7,
    borderColor: 'lightgray',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txt3: {
    color: 'blue',
    fontSize: 10,
    fontWeight: '500'
  },
  txt4: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600'
  },
  txt5: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '500',
    marginRight: 6
  },
  txt6: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  }
})

export default EProfile



const PanCard = () => {
  return (
    <View style={styles.panView}>
      <ImageBackground
        source={require('../assets/pan-card.png')}
        style={{
          height: '100%',
          width: '101%',
          alignSelf: 'center'
        }}
      >
        <View style={{ marginTop: 50, marginLeft: 16 }}>
          <Text style={styles.txt3}>Permanent Account Number :</Text>
          <Text style={[styles.txt4, { marginTop: 3, fontSize: 15, fontWeight: 'bold' }]}>AFGPO1234B</Text>
        </View>
        <View style={{ marginTop: 6, marginLeft: 16 }}>
          <Text style={styles.txt3}>Name :</Text>
          <Text style={styles.txt4}>{'Satyaranjan Ojha'.toUpperCase()}</Text>
        </View>
        <View style={{ marginTop: 6, marginLeft: 16 }}>
          <Text style={styles.txt3}>Father's Name :</Text>
          <Text style={styles.txt4}>{'Prafulla Kumar Ojha'.toUpperCase()}</Text>
        </View>
        <View style={{ marginTop: 6, marginLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txt3}>Date of Barth :</Text>
          <Text style={[styles.txt4, { marginLeft: 6 }]}>21-05-2023</Text>
        </View>


      </ImageBackground>
    </View>
  )
}

const AdharCard = () => {
  return (
    <View style={styles.adharView}>
      <ImageBackground
        source={require('../assets/aadhaar.png')}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <View style={{ marginTop: 55, marginLeft: 95, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txt5}>Name :</Text>
          <Text style={styles.txt6}>Satyaranjan Ojha</Text>
        </View>
        <View style={{ marginTop: 4, marginLeft: 95, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txt5}>DOB :</Text>
          <Text style={styles.txt6}>23-05-2023</Text>
        </View>
        <View style={{ marginTop: 4, marginLeft: 95, }}>
          <Text style={styles.txt5}>Address :</Text>
          <Text style={[styles.txt6, { width: 160 }]}>Rashulgadh, Bhubaneswar, Odisha, 751010</Text>
        </View>
        <Text style={{
          color: 'black',
          position: 'absolute',
          bottom: 8,
          left: 80,
          fontSize: 15,
          fontWeight: '700'
        }}>9876543215678965</Text>
      </ImageBackground>
    </View>
  )
}