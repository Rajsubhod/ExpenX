import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@context/ThemeContext';
import CustomText from '@components/CustomText';

const Home = () => {
  const {isDarkMode} = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';
  const cardContainerBg = isDarkMode ? '#111' : '#f0f0f0';
  const cardBg = isDarkMode ? '#444' : '#fff';
  const borderBottomColor = isDarkMode ? '#333' : '#ccc';
  const transactionText = isDarkMode ? '#888' : '#333';
  
  const [transactions, setTransactions] = React.useState([
    {
      id: '1',
      sender: 'John Doe',
      receiver: 'Jane Doe',
      amount: 100,
      date: '2021-09-01',
    },
    {
      id: '2',
      sender: 'Jane Doe',
      receiver: 'John Doe',
      amount: 50,
      date: '2021-09-02',
    },
    {
      id: '3',
      sender: 'Jane Doe',
      receiver: 'John Doe',
      amount: 150,
      date: '2021-09-03',
    },
    {
      id: '4',
      sender: 'John Doe',
      receiver: 'Jane Doe',
      amount: 200,
      date: '2021-09-04',
    },
    {
      id: '5',
      sender: 'John Doe',
      receiver: 'Jane Doe',
      amount: 300,
      date: '2021-09-05',
    },
    {
      id: '6',
      sender: 'Jane Doe',
      receiver: 'John Doe',
      amount: 250,
      date: '2021-09-06',
    },
    {
      id: '7',
      sender: 'John Doe',
      receiver: 'Jane Doe',
      amount: 100,
      date: '2021-09-07',
    },
    {
      id: '8',
      sender: 'Jane Doe',
      receiver: 'John Doe',
      amount: 50,
      date: '2021-09-08',
    },
    {
      id: '9',
      sender: 'Jane Doe',
      receiver: 'John Doe',
      amount: 150,
      date: '2021-09-09',
    },
    {
      id: '10',
      sender: 'John Doe',
      receiver: 'Jane Doe',
      amount: 200,
      date: '2021-09-10',
    },
  ]);

  useEffect(() => {
    // Fetch transactions
    // Update transactions state

    // sort transactions by date
    setTransactions((prevTransactions) => prevTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const TrasactionList = ({item}) => (
    <View style={[styles.transactionItem, {borderBottomColor: borderBottomColor} ]}>
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
        <View style={[styles.cardContainer, {backgroundColor:cardContainerBg}]}>
          <View style={[styles.card, {backgroundColor:cardBg}]}>
            <CustomText style={[styles.cardTitle, {color:'gray'}]}>Total Spending</CustomText>
            <CustomText style={[styles.cardAmount, {color:'tomato'}]}>₹1200</CustomText>
          </View>
          <View style={[styles.card, {backgroundColor: cardBg}]}>
            <CustomText style={[styles.cardTitle, {color:'gray'}]}>Monthly Spending</CustomText>
            <CustomText style={[styles.cardAmount, {color:'tomato'}]}>₹300</CustomText>
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
              <CustomText style={[{color:'gray'}]}>No transactions found</CustomText>
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
