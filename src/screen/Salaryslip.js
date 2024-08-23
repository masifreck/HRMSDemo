import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import PayslipSummary from '../component/PayslipSummary';
import MonthYearPicker from '../component/MonthYearPicker';

const renderDot = color => {
  return (
    <View
      style={{
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

const renderLegendComponent = () => {
  return (
    <View style={{ justifyContent: 'center', }}>
      <View style={{}}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
          {renderDot('green')}
          <View>
            <Text style={{ color: 'black', fontWeight: "bold", fontSize: 16 }}>₹ 20,000.00</Text>
            <Text style={{ color: 'gray' }}>Earnings</Text>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: 120, marginTop: 20 }}>
          {renderDot('orange')}
          <View>
            <Text style={{ color: 'black', fontWeight: "bold", fontSize: 16 }}>₹ 3,000.00</Text>
            <Text style={{ color: 'gray' }}>Deductions</Text>
          </View>
        </View>
      </View>
    </View>
  );
};



const Salaryslip = () => {
  const [showIssueBox, setShowIssueBox] = useState(false);
  const [issue, setIssue] = useState(false);

  const showInput = () => {
    return (
      <View>
        <View style={{
          // backgroundColor:"red",
          marginHorizontal: 10,
          height: 70,
          borderRadius: 8,
          borderColor: 'gray',
          borderWidth: 0.8,
          marginVertical: 8,
          flexDirection:'row',
          justifyContent:'space-between'
        }}>
          <TextInput
            style={{
              width: '70%',
              marginHorizontal: 10,
              color: 'black',
              fontSize: 14,
            }}
            placeholder="Write your Issue !"
            placeholderTextColor={'gray'}
            multiline={true}
            onChangeText={(text) => setIssue(text)} />
          <View style={{
            marginRight:10,
            alignItems:'center'
          }}>
            <TouchableOpacity style={styles.cancel}>
              <Text style={{color:'white',fontSize:12}}>Cencel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submit}>
              <Text style={{color:'white',fontSize:12}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <MonthYearPicker />
      {/* <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 19,textAlign:'center',marginTop:8 }}>January 2023</Text> */}
      <View style={{
        marginHorizontal: 30,
        paddingVertical: 10,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <PayslipSummary />
        {renderLegendComponent()}
      </View>

      <View style={styles.btnView}>
        <TouchableOpacity style={[styles.btn, {
          width: '60%',
          backgroundColor: 'lightgray',
          borderWidth: 0.5,
          borderColor: 'gray'
        }]} onPress={() => { setShowIssueBox(true) }}>
          <Text style={[styles.txt, { color: 'black' }]}>Raise an Issue</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.btn, { width: '30%', backgroundColor: '#aa18ea' }]}>
          <Text style={styles.txt}>Download</Text>
        </TouchableOpacity>
      </View>

      {showIssueBox && showInput()}

      <Text style={[styles.label, { paddingBottom: 8, }]}>Earnings</Text>
      <View style={styles.insideContainer}>
        {/* Basic */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Basic</Text>
          <Text style={[styles.money, { color: 'green' }]}>₹ 10,000.00</Text>
        </View>
        {/* Medical Allowance */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Medical Allowance</Text>
          <Text style={[styles.money, { color: 'green' }]}>₹ 1000.00</Text>
        </View>
        {/* HRA */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>HRA</Text>
          <Text style={[styles.money, { color: 'green' }]}>₹ 1234.00</Text>
        </View>
        {/* Conveyance */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Conveyance</Text>
          <Text style={[styles.money, { color: 'green' }]}>₹ 300.00</Text>
        </View>
        {/* Entertainment */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Entertainment</Text>
          <Text style={[styles.money, { color: 'green' }]}>₹ 134.00</Text>
        </View>
        {/* Uniform */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Uniform</Text>
          <Text style={[styles.money, { color: 'green' }]}>₹ 102.00</Text>
        </View>
        {/* Arrears */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Arrears</Text>
          <Text style={[styles.money, { color: 'green' }]}>₹ 0.00</Text>
        </View>
        {/* Total */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
          borderTopColor: 'gray',
          borderTopWidth: 0.8
        }}>
          <Text style={{
            marginTop: 6,
            color: 'black',
            fontSize: 17,
            fontWeight: 'bold'
          }}>Total :</Text>
          <Text style={{
            marginTop: 6,
            color: 'black',
            fontSize: 17,
            fontWeight: 'bold',
            color: 'green'
          }}>₹ 20,000.00</Text>
        </View>
      </View>
      {/* Deductions */}
      <Text style={[styles.label, { paddingVertical: 8 }]}>Deductions</Text>
      <View style={styles.insideContainer}>
        {/* Provident Fund */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Provident Fund</Text>
          <Text style={[styles.money, { color: 'orange' }]}>₹ 1,076.00</Text>
        </View>
        {/* ESIC Employee */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>ESIC Employee</Text>
          <Text style={[styles.money, { color: 'orange' }]}>₹ 76.00</Text>
        </View>
        {/* Loan */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Loan</Text>
          <Text style={[styles.money, { color: 'orange' }]}>₹ 3,006.00</Text>
        </View>
        {/* Adjustments */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Adjustments</Text>
          <Text style={[styles.money, { color: 'orange' }]}>₹ 0.00</Text>
        </View>
        {/* Other Deduction */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Other Deduction</Text>
          <Text style={[styles.money, { color: 'orange' }]}>₹ 900.00</Text>
        </View>
        {/* Total */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
          borderTopColor: 'gray',
          borderTopWidth: 0.8
        }}>
          <Text style={{
            marginTop: 6,
            color: 'black',
            fontSize: 17,
            fontWeight: 'bold'
          }}>Total Deduction:</Text>
          <Text style={{
            marginTop: 6,
            color: 'black',
            fontSize: 17,
            fontWeight: 'bold',
            color: 'red'
          }}>₹ 3,000.00</Text>
        </View>
      </View>
      {/* Employer Contribution */}
      <Text style={[styles.label, { paddingVertical: 8 }]}>Employer Contribution</Text>
      <View style={[styles.insideContainer, { marginBottom: 30 }]}>
        {/* ESIC Employer */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>ESIC Employer</Text>
          <Text style={[styles.money, { color: 'orange' }]}>₹ 315.00</Text>
        </View>
        {/* Provident Fund */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Provident Fund</Text>
          <Text style={[styles.money, { color: 'orange' }]}>₹ 329.00</Text>
        </View>
        {/* Pension Fund */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.text}>Pension Fund</Text>
          <Text style={[styles.money, { color: 'orange' }]}>₹ 747.00</Text>
        </View>
        {/* Total */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
          borderTopColor: 'gray',
          borderTopWidth: 0.8
        }}>
          <Text style={{
            marginTop: 6,
            color: 'black',
            fontSize: 17,
            fontWeight: 'bold'
          }}>Total Contribution:</Text>
          <Text style={{
            marginTop: 6,
            color: 'black',
            fontSize: 17,
            fontWeight: 'bold',
            color: 'green'
          }}>₹ 1,391.00</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  insideContainer: {
    padding: 20,
    width: '95%',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden'
  },
  btnView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  btn: {
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  text: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '500'
  },
  money: {
    fontSize: 15,
    fontWeight: '600'
  },
  cancel: {
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop:8
  },
  submit: {
    backgroundColor: 'green',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop:10
  }
});

export default Salaryslip;
