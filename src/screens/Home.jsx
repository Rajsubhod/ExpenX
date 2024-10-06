import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@context/ThemeContext';
import CustomText from '@components/CustomText';

const Home = () => {
  const {isDarkMode} = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';
  const [transactions, setTransactions] = React.useState([
    {
      id: null,
      amount: null,
      sender: '',
      receiver: '',
      date: '',
    },
  ]);

  useEffect(() => {
    // Fetch transactions
    // Update transactions state
  }, []);
  return (
    <ScrollView style={[styles.home, {backgroundColor: viewColor}]}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <CustomText style={styles.cardTitle}>Total Spending</CustomText>
            <CustomText style={styles.cardAmount}>$1200</CustomText>
          </View>
          <View style={styles.card}>
            <CustomText style={styles.cardTitle}>Monthly Spending</CustomText>
            <CustomText style={styles.cardAmount}>$300</CustomText>
          </View>
        </View>

        <View style={styles.transactionList}>
          {transactions.map(transaction => (
            <View key={transaction.id} style={styles.transactionItem}>
              <CustomText style={styles.transactionText}>
                {transaction.sender} → {transaction.receiver}
              </CustomText>
              <CustomText style={styles.transactionText}>
                Amount: {transaction.amount} | Date: {transaction.date}
              </CustomText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
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
    marginTop: 20,
  },
  transactionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionText: {
    fontSize: 14,
    color: '#333',
  },
});
