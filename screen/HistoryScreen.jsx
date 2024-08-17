import React, {useCallback, useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import NetworkStatus from './NetworkStatus';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {counterEvent} from 'react-native/Libraries/Performance/Systrace';
const {width, height} = Dimensions.get('window');
const HistoryScreen = () => {
  // useEffect(() => {
  //   console.log('Useeffect original data changed', originalData);
  // }, [originalData]);

  // const removeFetchEntry = async index => {
  //   console.log('entered removefetchentry with index', index);
  //   try {
  //     const updatedData = [...originalData];
  //     updatedData.splice(index, 1);
  //     console.log('removed in updated data', updatedData);
  //     await storage.setString('FetchEntries', JSON.stringify(updatedData));
  //     console.log('removed in original data from removefetchentry');
  //     retrieveFetchEntries();
  //   } catch (error) {
  //     console.log('Error removing data:', error.message);
  //   }
  // };

  // const pushDataToAPI = async (ind, a, b, c, d, e, f) => {
  //   console.log('Entered pushDataToAPI');
  //   console.log(
  //     'Here is data Posted:',
  //     `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${a}&b=${b}&c=${c}&d=${d}&e=${e}&f=${f}`,
  //   );

  //   try {
  //     const response = await fetch(
  //       `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${a}&b=${b}&c=${c}&d=${d}&e=${e}&f=${f}`,
  //       requestOptions,
  //     );
  //     const result = await response.text();

  //     console.log(
  //       'Here is data Posted:',
  //       `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${a}&b=${b}&c=${c}&d=${d}&e=${e}&f=${f}`,
  //       'With Response',
  //       result,
  //     );

  //     if (result.includes('SUCCESS')) {
  //       console.log('Entering RemoveFetchEntry');
  //       await removeFetchEntry(ind);
  //       console.log('Exited RemoveFetchEntry');

  //       Toast.show({
  //         type: ALERT_TYPE.SUCCESS,
  //         title: 'SUCCESS',
  //         // textBody: '',
  //       });
  //     } else {
  //       Toast.show({
  //         type: ALERT_TYPE.WARNING,
  //         title: result,
  //         // textBody: result,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Toast.show({
  //       type: ALERT_TYPE.WARNING,
  //       title: 'Error',
  //       textBody: error.message.split(' ').slice(0, 4).join(' ') + '...',
  //     });
  //   }
  // };

  // const syncData = async () => {
  //   console.log('Just now entered into Sync Data');
  //   setIsLoading(true);
  //   try {
  //     console.log(
  //       'entred try block in syncdata an going into retriveFetchEntries====================',
  //     );
  //     const nonsense = retrieveFetchEntries();
  //     console.log(
  //       'Completed retriveFetchEntries==========================================',
  //     );

  //     // const existingEntries = await storage.getString('FetchEntries');
  //     // const entries = existingEntries ? JSON.parse(existingEntries) : [];

  //     console.log('entred if block in syncdata ');
  //     console.log('Original data lenght goes here', nonsense, nonsense.length);
  //     if (nonsense.length > 0) {
  //       // for (const entry of originalData) {
  //       //   await pushDataToAPI(entry.a, entry.b, entry.c, entry.d, entry.e),
  //       //     entry.f;
  //       // }
  //       console.log('Entered If block with following details', nonsense.length);
  //       for (let ind = 0; ind < nonsense.length; ind++) {
  //         console.log('entred For Loop', ind);
  //         const entry = nonsense[ind];
  //         console.log('Push No', ind);
  //         await pushDataToAPI(
  //           ind,
  //           entry.a,
  //           entry.b,
  //           entry.c,
  //           entry.d,
  //           entry.e,
  //           entry.f,
  //         ); // Assuming this line does something necessary
  //       }
  //       console.log('Push complted, agian going to retriveFetchEntres');
  //       await retrieveFetchEntries();
  //       // retrieveFetchEntries();
  //       setIsLoading(false);
  //     } else {
  //       // console.log('No entries to sync');
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     // console.log('Error syncing data:', error.message);
  //   }
  // };

  // const clearMMKVStorage = async () => {
  //   try {
  //     // await storage.setString('FetchEntries', ''); // Correct method for setting data
  //     await storage.clearStore();
  // console.log('All entries deleted from MMKV storage');
  //   } catch (error) {
  // console.log('Error clearing MMKV storage:', error.message);
  //   }
  // };

  // const postdata = () => {
  //   if (isConnected) {
  // console.log('Online');
  //     syncData();
  //   } else {
  // console.log('Offline');
  //     const newdate = new Date()
  //       .toISOString()
  //       .slice(0, 10)
  //       .split('-')
  //       .reverse()
  //       .join('-');

  //     storeFetchEntry(LocationCode, PassNo, TruckNo, 1, UserName, newdate);
  //   }
  // };

  const storage = new MMKVLoader().initialize();
  const [IsLoading, setIsLoading] = useState(false);
  const isConnected = NetworkStatus(); // Use the hook
  // const [isConnected, setIsConnected] = useState(true); // State for network status
  // console.log(isConnected);

  const [originalData, setoriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [flatLoad, setflatLoad] = useState(false);

  const retrieveFetchEntries = async () => {
    console.log('Entred retrive fetch entries using else block');
    try {
      const storedEntries = await storage.getString('FetchEntries');
      const entries = storedEntries
        ? JSON.parse(storedEntries).map(item => ({
            b: item.b,
            c: item.c,
            d: item.d === 0 ? 'IN' : 'OUT',
            f: item.f, // Replace 'someValueForF' with your desired value
          }))
        : [];

      setflatLoad(true);
      setData(entries);
      console.log(entries);
      // setflatLoad(false)
    } catch (error) {
      console.log('Error retrieving data:', error.message);
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: error.message.split(' ').slice(0, 4).join(' ') + '...',
        autoClose:100
      });
    }
  };

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
  };
  const FinalSync = async () => {
    try {
      const storedEntries = await storage.getString('FetchEntries');
      const entries = storedEntries ? JSON.parse(storedEntries) : [];
      console.log('Length of entries inside loop', entries.length);

      if (entries.length > 0) {
        const newData = entries.map(item => ({
          b: item.b,
          c: item.c,
          d: item.d === 0 ? 'IN' : 'OUT',
          f: item.f, // Replace 'someValueForF' with your desired value
        }));
        setData(newData);

        const entry = entries[0];
        try {
          const response = await fetch(
            `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${entry.a}&b=${entry.b}&c=${entry.c}&d=${entry.d}&e=${entry.e}&f=${entry.f}`,
            requestOptions,
          );
          const result = await response.text();

          // console.log(
          //   'Here is data Posted:',
          //   `https://tsm.tranzol.com/api/v2/postvehiclescan?a=${entry.a}&b=${entry.b}&c=${entry.c}&d=${entry.d}&e=${entry.e}&f=${entry.f}`,
          //   'With Response',
          //   result,
          // );

          if (result.includes('SUCCESS')) {
            // console.log('Entering RemoveFetchEntry');
            // await removeFetchEntry(ind);

            try {
              // const updatedData = [...originalData];
              entries.splice(0, 1);
              // console.log('removed in updated data', entries);
              await storage.setString('FetchEntries', JSON.stringify(entries));
              // retrieveFetchEntries();
            } catch (error) {
              console.log('Error removing data:', error.message);
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody:
                  error.message.split(' ').slice(0, 4).join(' ') + '...',
              });
            }
            // console.log('Exited RemoveFetchEntry');

            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'SUCCESS',
              autoClose:300
              // textBody: '',
            });
          } else {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: result,
              // textBody: result,
            });
          }
        } catch (error) {
          console.error(error);
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Error',
            textBody: error.message.split(' ').slice(0, 4).join(' ') + '...',
          });
        }
      } else {
        setData([]);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'No Data',
          autoClose:100
          // textBody: '',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: error.message.split(' ').slice(0, 4).join(' ') + '...',
      });
    }
  };

  const checkConnectionAndSync = async () => {
    const storedEntries = await storage.getString('FetchEntries');
    const entries = storedEntries ? JSON.parse(storedEntries) : [];
    console.log('lenght of entriesin history scren', entries.length);

    if (entries.length > 0) {
      for (let i = 0; i < entries.length; i++) {
        if (isConnected) {
          setIsLoading(true);
          await FinalSync();
          await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 500 milliseconds (half a second)
        } else {
          console.log('entered else');
          await retrieveFetchEntries();
        }
      }
    } else if (entries.length === 0) {
      // await storage.setString('FetchEntries', '');
      setData([]);
    }

    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      console.log('call back called');
      checkConnectionAndSync();
    }, [isConnected]),
  );

  useEffect(() => {
    console.log('use effect called for data');
    if (setflatLoad && data.length !== 0) {
      setData(data);
      console.log(data);
    }
    setflatLoad(false);
  }, [data, flatLoad]);

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Text
          style={{
            color: '#276A76',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'PoppinsBold',

            marginHorizontal: 20,
            marginTop: 10,
          }}>
          HISTORY
        </Text>
        {IsLoading && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <ActivityIndicator animating={true} color="#276A76" size="small" />
          </View>
        )}
        {data.length !== 0 ? (
          <View style={{marginBottom: height * 0.06}}>
            <FlatList
              data={data}
              // keyExtractor={(item, index) => {
              //   index.toString();
              // }}
              refreshing={flatLoad}
              renderItem={({item, index}) => (
                <View style={styles.item}>
                  <View style={{}}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 7,
                        // fontFamily: 'PoppinsMedium',
                      }}>
                      {item.f}
                    </Text>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 20,
                        fontWeight: '900',
                        // fontFamily: 'PoppinsBold',
                      }}>
                      {item.c}
                    </Text>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 10,
                        marginTop: 1,
                        // fontFamily: 'PoppinsMedium',
                      }}>
                      {item.b}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 20,
                        fontFamily: 'PoppinsBlack',
                      }}>
                      {item.d}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: '#276A76',
                textAlign: 'center',
                fontSize: 15,
                textTransform: 'uppercase',
                fontFamily: 'PoppinsBold',
                letterSpacing: 0,
              }}>
              No Data
            </Text>
          </View>
        )}
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#276A76',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemtext: {
    color: '#ffffff',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  largeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 14,
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default HistoryScreen;
