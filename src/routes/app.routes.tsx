import { Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import Dashboard from '../screens/dashboard/Dashboard';

// ----------------------------------------------------------------------

export function AppRoutes() {
  const TabNavigator = createBottomTabNavigator();
  const StackNavigator = createNativeStackNavigator();

  const theme = useTheme();

  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.palette.primary.main,
        tabBarInactiveTintColor: theme.palette.text.primary,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: Platform.OS === 'ios' ? 88 : 60,
          backgroundColor: theme.palette.background.paper,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <TabNavigator.Screen
        name="Início"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons size={size} color={color} name="home" />,
        }}
      />
    </TabNavigator.Navigator>
  );
}
