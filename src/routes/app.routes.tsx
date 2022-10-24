import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// screens
import { Home } from '@src/screens/app/home/Home';
import { Create } from '@src/screens/app/create/Create';
import { Summary } from '@src/screens/app/summary/Summary';

// ----------------------------------------------------------------------

export function AppRoutes() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: 'flash',
        }}
      />

      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarLabel: 'Adicionar',
          tabBarIcon: 'currency-usd',
        }}
      />

      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{
          tabBarLabel: 'Resumo',
          tabBarIcon: 'chart-timeline-variant',
        }}
      />
    </Tab.Navigator>
  );
}
