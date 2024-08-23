import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';


const ReimbursementSts = () => {
  // Function to render the list of expenses
  const RenderExpenseList = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{fontSize:18, color: 'green',fontWeight:'bold'}}>₹ 2000</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>22-04-23</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}>
          <Text style={styles.item}>Bhubaneswar</Text>
          <Text style={{ fontSize: 14, color: 'gray', fontWeight: 'bold' }}>- -</Text>
          <Text style={styles.item}>Cuttack</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 4,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 0.8,
          paddingBottom: 6,
          marginBottom: 6,
          marginTop: 2
        }}>
          <Text style={{ fontSize: 13, color: 'gray', fontWeight: '500' }}>Travel Type : <Text style={{
            color: 'blue',
            fontSize: 14,
            fontWeight: 'bold'
          }}>BIKE</Text></Text>
          <Text style={{ fontSize: 13, color: 'gray', fontWeight: '500' }}>Kilometers : <Text style={{
            color: 'blue',
            fontSize: 14,
            fontWeight: 'bold'
          }}>20</Text></Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text style={{ fontSize: 12, color: 'gray', fontWeight: '500' }}>Fare : <Text style={{
            color: 'green',
            fontSize: 13,
            fontWeight: '600'
          }}> ₹ 200</Text></Text>
          <Text style={{ fontSize: 12, color: 'gray', fontWeight: '500' }}>Fooding : <Text style={{
            color: 'green',
            fontSize: 13,
            fontWeight: '600'
          }}> ₹ 300</Text></Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 12, color: 'gray', fontWeight: '500' }}>Lodging : <Text style={{
            color: 'green',
            fontSize: 13,
            fontWeight: '600'
          }}> ₹ 400</Text></Text>
          <Text style={{ fontSize: 12, color: 'gray', fontWeight: '500' }}>Misc. Expense : <Text style={{
            color: 'green',
            fontSize: 13,
            fontWeight: '600'
          }}> ₹ 1000</Text></Text>
        </View>
        <Text style={[styles.label,{marginTop:8}]}>Claim Ammount : <Text style={[styles.item
        ,{color:'green'}]}> ₹ 2500</Text></Text>
      </View>
    );
  };

  return (
    <ScrollView>
       
      <View style={styles.container}>
     
        <View style={styles.boxContainer}>
        <RenderExpenseList/>
          <View style={{
            borderBottomWidth: 0.8,
            borderBottomColor: 'lightgray',
            marginTop: 10
          }}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.item}>
             csdhgsdhbsih hchdbsh adchb cuidsbciu
            </Text>
          </View>
          <View style={[styles.rowContainer, { marginTop: 20 }]}>
            <View style={styles.circleContainer}>
              <Image
                source={require('../assets/mypic.jpeg')}
                style={styles.circleImage}
              />
            </View>
            <View style={styles.columnContainer}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#736f71'
              }}>Satyaranjan Ojha</Text>
              <Text style={{
                fontWeight: '600',
                color: 'gray'
              }}>Level 1</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.approved}>Approved</Text>
              <Text style={styles.timestamp}>1 day ago</Text>
            </View>

          </View>
          <View style={styles.rowContainer}>
            <Text style={{
              color: '#e68837',
              fontWeight: '600'
            }}>Warning:</Text>
            <Text style={{
              color: 'gray',
              fontWeight: '600',
              marginLeft: 10
            }}>--</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.circleContainer}>
              <Image
                source={require('../assets/mypic.jpeg')}
                style={styles.circleImage}
              />
            </View>
            <View style={styles.columnContainer}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#736f71'
              }}>Satyaranjan Ojha</Text>
              <Text style={{
                fontWeight: '600',
                color: 'gray'
              }}>Level 2</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.approved}>Approved</Text>
              <Text style={styles.timestamp}>2 hours ago</Text>
            </View>

          </View>
          <View style={styles.rowContainer}>
            <Text style={{
              color: '#e68837',
              fontWeight: '600'
            }}>Warning:</Text>
            <Text style={{
              color: 'gray',
              fontWeight: '600',
              marginLeft: 10
            }}>--</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.circleContainer}>
              <Image
                source={require('../assets/mypic.jpeg')}
                style={styles.circleImage}
              />
            </View>
            <View style={styles.columnContainer}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#736f71'
              }}>Satyaranjan Ojha</Text>
              <Text style={{
                fontWeight: '600',
                color: 'gray'
              }}>Level 3</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={[styles.approved, { color: 'red' }]}>Rejected</Text>
              <Text style={styles.timestamp}>1 hours ago</Text>
            </View>

          </View>
          <View style={[styles.rowContainer, { paddingBottom: 10, borderBottomColor: 'lightgray', borderBottomWidth: 0.8 }]}>
            <Text style={{
              color: '#e68837',
              fontWeight: '600'
            }}>Warning:</Text>
            <Text style={{
              color: '#736f71',
              fontWeight: '400',
              marginLeft: 10
            }}>Attach the appointment</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Cancel Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e9e6eb',
  },
  boxContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 16
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  columnContainer: {
    flexDirection: 'column',
    marginRight: 10,
  },
  label: {
    fontWeight: '700',
    color: 'gray'
  },
  item: {
    fontSize: 16,
    color: 'black',
    // color: '#736f71',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8
  },
  circleContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderColor: 'gray',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circleImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  approved: {
    color: 'green',
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray'
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aa18ea',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ReimbursementSts;
