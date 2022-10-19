import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import Dashboard from '../pages/dashboard/Dashboard';

// ----------------------------------------------------------------------

export function Routes() {
  const TabNavigator = createBottomTabNavigator();
  const StackNavigator = createNativeStackNavigator();

  const theme = useTheme();

  return (
    <NavigationContainer>
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
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons size={size} color={color} name="home" />
            ),
          }}
        />
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
}
