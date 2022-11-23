import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// hooks
import { useTheme } from '@src/hooks/useTheme';
// context
import { TransactionsProvider } from '@src/contexts/TransactionsContext';
// components
import { Icon } from '@src/components/default';
// import { FadeInView } from '@src/components/animations/FadeInView';
// screens
import { Home } from '@src/screens/app/home/Home';
import { TransactionList } from '@src/screens/app/transaction/TransactionList';

// ----------------------------------------------------------------------

type RootParamList = {
  Home: undefined;
  TransactionList: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<RootParamList, 'Home'>;
export type TransactionListScreenProps = BottomTabScreenProps<RootParamList, 'TransactionList'>;

// ----------------------------------------------------------------------

// const AnimatedHome = (props: any) => (
//   <FadeInView>
//     <Home {...props} />
//   </FadeInView>
// );
//
// const AnimatedTransactionList = (props: any) => (
//   <FadeInView>
//     <TransactionList {...props} />
//   </FadeInView>
// );

// ----------------------------------------------------------------------

export function AppRoutes() {
  const theme = useTheme();
  const Tab = createBottomTabNavigator<RootParamList>();

  return (
    <TransactionsProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          //
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.palette.text.primary,
          tabBarInactiveTintColor: theme.palette.text.faded,
          tabBarStyle: {
            height: 58,
            borderTopWidth: 0,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name="home" color={color} size={34} />;
            },
          }}
        />

        <Tab.Screen
          name="TransactionList"
          component={TransactionList}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name="sync" color={color} size={34} />;
            },
          }}
        />
      </Tab.Navigator>
    </TransactionsProvider>
  );
}
