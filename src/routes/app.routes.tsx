import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// screens
import { Home } from '@src/screens/app/home/Home';
import { TransactionList } from '@src/screens/app/transaction/TransactionList';

// ----------------------------------------------------------------------

export function AppRoutes() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Início"
      barStyle={{ height: 55 }}
      screenOptions={{ tabBarLabel: '' }}
    >
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          tabBarIcon: 'home',
        }}
      />

      <Tab.Screen
        name="Transações"
        component={TransactionList}
        options={{
          tabBarIcon: 'currency-usd',
        }}
      />
    </Tab.Navigator>
  );
}
