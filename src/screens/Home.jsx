import {
  View,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@context/ThemeContext';
import CustomText from '@components/CustomText';
import SmsAndroid from 'react-native-get-sms-android';
import SmsReceiver from 'react-native-android-sms-listener';
import {constants} from 'Constants';
import {useAuth} from '@context/AuthContext';

const Home = () => {
  const {isDarkMode} = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';
  const cardContainerBg = isDarkMode ? '#111' : '#f0f0f0';
  const cardBg = isDarkMode ? '#444' : '#fff';
  const borderBottomColor = isDarkMode ? '#333' : '#ccc';
  const transactionText = isDarkMode ? '#888' : '#333';

  const {accessToken} = useAuth();
  const [transactions, setTransactions] = React.useState([
    {
      id: '1',
      sender: 'John Doe',
      receiver: 'Jane Doe',
      amount: 100,
      date: '2021-09-10',
    },
  ]);

  const fetchuserTransactions = async () => {
    try {
      const data = await fetch(constants.FETCH_USER_TRANSACTIONS, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!data.ok) {
        throw new Error('Network response was not ok');
      }

      if (data.ok) {
        return data.json();
      }
    } catch (error) {}
  };

  useEffect(() => {
    // Fetch transactions
    const handleFetchTransaction = async () => {
      const respose = await fetchuserTransactions();
      if (respose) {
        setTransactions(respose);
      }
    };
    // Update transactions state
    // sort transactions by date
    setTransactions(prevTransactions =>
      prevTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)),
    );

    handleFetchTransaction();
  }, []);

  useEffect(() => {
    // Request SMS permission
    const requestSmsPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const grantedRead = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
              title: 'SMS Permission',
              message:
                'This app needs access to your SMS messages to function properly.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
            fetchSmsMessages();
          } else {
            console.log('SMS permission denied');
          }

          const grantedListen = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
            {
              title: 'SMS Permission',
              message:
                'This app needs access to your SMS messages to function properly.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (grantedListen === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('SMS listen permission granted');
            listenForIncomingSms();
          } else {
            console.log('SMS listen permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    // Listen for incoming sms messages -- WORKED ( WIth Limitation Will only work when app is Active)
    // Solution: Create Native Service in Android Broadcast Receiver to listen for incoming SMS
    const listenForIncomingSms = () => {
      try {
        const subscription = SmsReceiver.addListener(message => {
          console.log('Incoming SMS:', message);
          sendSmsToBackend(message.body);
        });
        // Cleanup listener on unmount
        return () => {
          subscription.remove();
        };
      } catch (error) {
        console.log('Error listening for incoming SMS:', error);
      }
    };

    // Fetch sms messages -- WORKED
    const fetchSmsMessages = () => {
      SmsAndroid.list(
        JSON.stringify({
          box: 'inbox',
          maxCount: 1,
        }),
        fail => {
          console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
          const messages = JSON.parse(smsList);
          console.log(count, '\n\n\n\n', messages);
          sendSmsToBackend(messages[0].body);
        },
      );
    };

    // send sms to backend -- WORKED
    const sendSmsToBackend = async message => {
      try {
        const response = await fetch(constants.ADD_TRANSACTION, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({message}), // Send the SMS messages as JSON
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('SMS successfully sent to backend:', responseData);
      } catch (error) {
        console.log('Error sending SMS to backend:', error);
      }
    };

    requestSmsPermission();

    // Cleanup listener on unmount};
  }, []);

  const TrasactionList = ({item}) => (
    <View
      style={[styles.transactionItem, {borderBottomColor: borderBottomColor}]}>
      <CustomText style={[styles.transactionText, {color: transactionText}]}>
        {item.sender} → {item.receiver}
      </CustomText>
      <CustomText style={[styles.transactionText, {color: transactionText}]}>
        Amount: {item.amount} | Date: {item.date}
      </CustomText>
    </View>
  );

  return (
    <View style={[styles.home, {backgroundColor: viewColor}]}>
      <View style={styles.container}>
        <View
          style={[styles.cardContainer, {backgroundColor: cardContainerBg}]}>
          <View style={[styles.card, {backgroundColor: cardBg}]}>
            <CustomText style={[styles.cardTitle, {color: 'gray'}]}>
              Total Spending
            </CustomText>
            <CustomText style={[styles.cardAmount, {color: 'tomato'}]}>
              ₹1200
            </CustomText>
          </View>
          <View style={[styles.card, {backgroundColor: cardBg}]}>
            <CustomText style={[styles.cardTitle, {color: 'gray'}]}>
              Monthly Spending
            </CustomText>
            <CustomText style={[styles.cardAmount, {color: 'tomato'}]}>
              ₹300
            </CustomText>
          </View>
        </View>

        <FlatList
          data={transactions}
          renderItem={TrasactionList}
          keyExtractor={item => item.id}
          style={styles.transactionList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyComponent}>
              <CustomText style={[{color: 'gray'}]}>
                No transactions found
              </CustomText>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    // backgroundColor: '#f0f0f0',
    padding: 15,
    paddingVertical: 30,
    borderRadius: 2,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    // backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionList: {
    width: '100%',
    marginTop: 5,
    // backgroundColor:'tomato'
  },
  transactionItem: {
    padding: 25,
    borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  transactionText: {
    fontSize: 16,
    // color: '#333',
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200, // Adjust height as needed
  },
});
