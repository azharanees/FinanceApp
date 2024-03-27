import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { TransactionContext } from '../TransactionContext';

const TransactionsListScreen = ({ navigation }) => {
  const { transactions } = useContext(TransactionContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}>
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemTitle}>Amount: ${item.amount}</Text>
          <Text>Date: {item.date}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TransactionsListScreen;
