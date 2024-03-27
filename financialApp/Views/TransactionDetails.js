import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetailScreen = ({ route }) => {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Transaction Name:</Text>
      <Text style={styles.detail}>{transaction.name}</Text>
      
      <Text style={styles.label}>Amount:</Text>
      <Text style={styles.detail}>${transaction.amount}</Text>
      
      <Text style={styles.label}>Date:</Text>
      <Text style={styles.detail}>{transaction.date}</Text>
      
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.detail}>{transaction.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    marginBottom: 15,
    color: '#666',
  },
});

export default TransactionDetailScreen;
