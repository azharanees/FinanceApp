import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionView from './Views/TransactionView';
import 'react-native-gesture-handler';
import SummaryScreen from './Views/SummaryScreen';
import { TransactionProvider } from './TransactionContext';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator(); 

export default function App() {
  return (
    <TransactionProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Transaction" component={TransactionView} options={{ 
        title: 'Transactions',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="receipt-outline" color={color} size={size} />
        )
      }}/>
        <Tab.Screen name="Summary" component={SummaryScreen} options={{ 
        title: 'Summary',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="stats-chart-outline" color={color} size={size} />
        )
      }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </TransactionProvider>

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
