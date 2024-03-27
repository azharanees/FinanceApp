import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionsListScreen from './TransactionList';
import TransactionDetailScreen from './TransactionDetails';

const Stack = createStackNavigator();


export default function TransactionView() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TransactionList" component={TransactionsListScreen} options={{ 
        title: 'Transactions',
      }}  />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailScreen} options={{ 
        title: 'Transaction Detail',
      }}/>
    </Stack.Navigator>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
