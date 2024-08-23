import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import WorkingHour from '../component/WorkingHour';
import AttSummary from '../component/AttnSummary';
// import AttSummary from '../component/AttnSummary';

function AttnHistory() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [punchData, setPunchData] = useState({
    '2023-06-01': { punchIn: '09:30 AM', punchOut: '05:00 PM' },
    '2023-06-02': { punchIn: '08:45 AM', punchOut: '05:15 PM' },
    // Add more punch data for other dates
  });

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const getPunchInTime = (date) => {
    if (punchData[date]) {
      return punchData[date].punchIn;
    }
    return '';
  };

  const getPunchOutTime = (date) => {
    if (punchData[date]) {
      return punchData[date].punchOut;
    }
    return '';
  };

  const getMarkedDates = () => {
    const markedDates = {};
    for (const date in punchData) {
      const punchInTime = getPunchInTime(date);
      const isLate = punchInTime && punchInTime > '09:00 AM';
      markedDates[date] = { marked: true, dotColor: isLate ? 'red' : 'green' };
    }
    return markedDates;
  };


  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <View style={{
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // width: 120,
              marginLeft: 20,
            }}>
            {renderDot('green')}
            <Text style={{ color: 'gray' }}>Perfect Time: 47%</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('orange')}
            <Text style={{ color: 'gray' }}>Half Day: 16%</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // width: 120,
              marginLeft: 20,
            }}>
            {renderDot('red')}

            <Text style={{ color: 'gray' }}>lateComing: 23%</Text>

          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
            {renderDot('#3BE9DE')}
            <Text style={{ color: 'gray' }}>Leave: 40%</Text>
          </View>
        </View>
      </View>
    );
  };


  return (
    <ScrollView >
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          onDayLongPress={(day) => console.log('onDayLongPress', day)}
          onMonthChange={(date) => console.log('onMonthChange', date)}
          onPressArrowLeft={(goToPreviousMonth) => {
            console.log('onPressArrowLeft');
            goToPreviousMonth();
          }}
          onPressArrowRight={(goToNextMonth) => {
            console.log('onPressArrowRight');
            goToNextMonth();
          }}
          markedDates={getMarkedDates()}
        />
      </View>
      {/* {selectedDate && (
        <View style={styles.timeContainer}>
          <Text style={{ color: 'black', fontSize: 18 }}>Punch In Time: {getPunchInTime(selectedDate)}</Text>
          <Text style={{ color: 'black', fontSize: 18 }}>Punch Out Time: {getPunchOutTime(selectedDate)}</Text>
        </View>
      )} */}
      <View style={styles.summaryContainer}>
        <View style={styles.daillySummary}>
          <Text style={{
            fontWeight: 'bold',
            textAlign: 'center',
            paddingVertical: 8,
            fontSize: 16,
            color: 'white',
            backgroundColor: '#3e0961',
          }}>Dailly Report</Text>
          {selectedDate ?
            <View style={styles.timeContainer}>
              <Text style={{ color: 'black', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Punch In Time</Text>
              <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center', fontWeight: '700', marginTop: 6 }}>{getPunchInTime(selectedDate)}</Text>
              <Text style={{ color: 'black', fontSize: 14, textAlign: 'center', fontWeight: '600', marginTop: 6 }}>Punch Out Time</Text>
              <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center', fontWeight: '700', marginTop: 6 }}>{getPunchInTime(selectedDate)}</Text>
            </View>
            :
            <View style={styles.timeContainer}>
              <Text style={{ color: 'black', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Punch In Time</Text>
              <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center', fontWeight: '700', marginTop: 6 }}>None</Text>
              <Text style={{ color: 'black', fontSize: 14, textAlign: 'center', fontWeight: '600', marginTop: 6 }}>Punch Out Time</Text>
              <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center', fontWeight: '700', marginTop: 6 }}>None</Text>
            </View>
          }
        <Text style={{
          textAlign:'center',
          padding:8,
          fontSize:11,
          color:'gray'
        }}>Press the Date to show the Punch time</Text>
        </View>
        <View style={styles.weeklySummary}>
          <AttSummary />
        </View>
      </View>
      {renderLegendComponent()}
      <View style={{ marginTop: 10 }}>
        <WorkingHour />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#e9e6eb',
  },
  timeContainer: {
    marginTop: 8
  },
  calendarContainer: {
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    margin: 10,
    borderRadius: 7
  },
  summaryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  daillySummary: {
    width: '38%',
    height: 200,
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
  weeklySummary: {
    width: '58%',
    height: 200,
    // backgroundColor : 'green'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default AttnHistory;
