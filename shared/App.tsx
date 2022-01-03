import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreenContainer from './screens/dashboard/DashboardScreenContainer';
import MenuScreenContainer from './screens/menu/MenuScreenContainer';
import LoginScreenContainer from './screens/login/LoginScreenContainer';
import Icon from 'react-native-vector-icons/FontAwesome';
import HistoryScreenContainer from './screens/history/HistoryScreenContainer';

const RootStack = createStackNavigator();
const TabStack = createBottomTabNavigator();

const TabStackContainer = () => (
  <TabStack.Navigator initialRouteName="Dashboard">
    <TabStack.Screen
      options={{
        tabBarIcon: (props) => {
          return (
            <Icon
              size={25}
              name="history"
              color={props.focused ? 'dodgerblue' : 'black'}
            />
          );
        },
      }}
      name="History"
      component={HistoryScreenContainer}
    />
    <TabStack.Screen
      options={{
        tabBarIcon: (props) => {
          return (
            <Icon
              size={25}
              name="dashboard"
              color={props.focused ? 'dodgerblue' : 'black'}
            />
          );
        },
      }}
      name="Dashboard"
      component={DashboardScreenContainer}
    />
    <TabStack.Screen
      options={{
        tabBarIcon: (props) => {
          return (
            <Icon
              size={25}
              name="bars"
              color={props.focused ? 'dodgerblue' : 'black'}
            />
          );
        },
      }}
      name="Menu"
      component={MenuScreenContainer}
    />
  </TabStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        mode="modal"
        headerMode="none">
        <RootStack.Screen name="Main" component={TabStackContainer} />
        {/* use full screens modal2 */}
        <RootStack.Screen name="Login" component={LoginScreenContainer} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
