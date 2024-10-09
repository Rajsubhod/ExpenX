import {View, StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTheme} from '@context/ThemeContext';
import CustomText from '@components/CustomText';
import SmsReceiver from 'react-native-android-sms-listener';
import SmsAndroid from 'react-native-get-sms-android';
import {constants} from 'Constants';
import {useAuth} from '@context/AuthContext';

const Home = () => {
  const {isDarkMode} = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';
  const cardContainerBg = isDarkMode ? '#111' : '#f0f0f0';
  const cardBg = isDarkMode ? '#444' : '#fff';
  const borderBottomColor = isDarkMode ? '#333' : '#ccc';
  const transactionText = isDarkMode ? '#888' : '#333';

  const {accessToken, userId} = useAuth();
  const [transactions, setTransactions] = React.useState([]);
  const [monthlySpending, setMonthlySpending] = React.useState(0);
  const [totalSpending, setTotalSpending] = React.useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const connectTimeoutRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const fetchuserTransactions = async () => {
    try {
      const data = await fetch(constants.FETCH_USER_TRANSACTIONS, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Requested-With': 'XMLHttpRequest',
          'X-User-Id': '88cbc110-43fc-40d5-8aab-63b7b7bebad6', // Hardcoded for now
        },
      });

      if (!data.ok) {
        throw new Error('Network response was not ok');
      }

      if (data.ok) {
        return data.json();
      }
    } catch (error) {
      console.log('Error fetching user transactions:', error);
      return null;
    }
  };

  const fetchSSE = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(constants.SSE_URL, {
        headers: {
          Accept: 'text/event-stream',
          'content-type': 'text/event-stream',
          Authorization: `Bearer ${accessToken}`,
          'X-Requested-With': 'XMLHttpRequest',
          'X-User-Id': '88cbc110-43fc-40d5-8aab-63b7b7bebad6', // Hardcoded for now
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsConnected(true);
      console.log(response);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const {value, done} = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const eventData = line.slice(6);
            try {
              console.log('Event message:', eventData);
              const newMessage = JSON.parse(eventData);
              console.log('New Message:', newMessage);
              setMessages(prevMessages => [...prevMessages, newMessage]);
            } catch (error) {
              console.error('Error parsing SSE data:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('SSE error:', error);
      setIsConnected(false);
    } finally {
      // Schedule reconnection
      connectTimeoutRef.current = setTimeout(fetchSSE, RECONNECT_TIMEOUT);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchSSE();
    }

    return () => {
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current);
      }
    };
  }, [userId, fetchSSE]);

  useEffect(() => {
    // Fetch transactions
    const handleFetchTransaction = async () => {
      const respose = await fetchuserTransactions();
      console.log('Transactions:', respose);
      if (respose) {
        setTransactions(respose);
      }
    };
    // sort transactions by date
    setTransactions(prevTransactions =>
      prevTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)),
    );

    handleFetchTransaction();
  }, []);

  useEffect(() => {
    // Update transactions state and calculate spending
    const calculateSpending = () => {
      let monthlyTotal = 0;
      let totalSpent = 0;
      const currentMonth = new Date().getMonth();

      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        // console.log('Transaction:', transactionDate.getMonth());
        // console.log('Current Month:', currentMonth);
        // console.log('Current Year:', currentYear);
        if (transactionDate.getMonth() === currentMonth) {
          monthlyTotal += transaction.amount;
        }
        totalSpent += transaction.amount;
      });

      setMonthlySpending(monthlyTotal);
      setTotalSpending(totalSpent);
    };

    calculateSpending();
  }, [transactions]);

  useEffect(() => {
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
    listenForIncomingSms();
  }, []);

  useEffect(() => {
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

    fetchSmsMessages();
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
              ₹{totalSpending}
            </CustomText>
          </View>
          <View style={[styles.card, {backgroundColor: cardBg}]}>
            <CustomText style={[styles.cardTitle, {color: 'gray'}]}>
              Monthly Spending
            </CustomText>
            <CustomText style={[styles.cardAmount, {color: 'tomato'}]}>
              ₹{monthlySpending}
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
