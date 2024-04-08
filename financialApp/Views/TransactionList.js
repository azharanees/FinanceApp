import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { TransactionContext } from '../TransactionContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTransaction, fetchTransactions } from '../Database/database';

const TransactionsListScreen = ({ navigation }) => {
  const { transactions, addTransactionToContext } = useContext(TransactionContext);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [transactionData, setTransactionData] = useState({
    name: '',
    amount: '',
    description: '',
    date: chosenDate.toISOString().split('T')[0]
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddTransaction = () => {
    let transactionObj = {...transactionData}
    
    if (isNaN(transactionData.amount)) {
      alert('Please enter a valid amount.');
      return; 
    }else{
      transactionObj.amount = Number(transactionData.amount)
    }
    const formattedDate = chosenDate.toISOString().split('T')[0];
    console.log(formattedDate);
    addTransaction(transactionObj).then(r=>{
      transactionObj.id = r.id
      addTransactionToContext(transactionObj)
      setTransactionData({
        name: '',
        amount: '',
        date: formattedDate.toString(),
        description: ''
      });
      
      toggleModal();
    })
  
  };
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

  const renderTransactionsList = () => {
    if (transactions.length === 0) {
      return (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>No transactions yet!</Text>
          <Button title="Add Transaction" onPress={toggleModal} />
        </View>
      );
    } else {
      return (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      );
    }
  };


  return (
    <View style={styles.container}>
          {renderTransactionsList()}

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Transaction</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={transactionData.name}
              onChangeText={(text) => setTransactionData({ ...transactionData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={transactionData.amount}
              onChangeText={(text) => setTransactionData({ ...transactionData, amount: text })}
            />
                 <TextInput
              multiline
              numberOfLines={4}    
              style={styles.input}
              placeholder="Description"
              value={transactionData.description}
              onChangeText={(text) => setTransactionData({ ...transactionData, description: text })}
            />
            <View style={styles.row}>
              <Text style={styles.label}>Date: </Text>
              <DateTimePicker
                value={chosenDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setChosenDate(date);
                }}
              />
            </View>
       
            <View style={styles.buttonsContainer}>
              <Button title="Add" onPress={handleAddTransaction} />
              <Button title="Cancel" onPress={toggleModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    marginBottom: 20,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default TransactionsListScreen;
