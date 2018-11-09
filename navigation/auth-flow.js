import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/tab-bar-icon';

// SCREENS
import HomeScreen from '../screens/home';
import UserProfileScreen from '../screens/user-profile';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-chatboxes`
          : 'md-chatboxes'
      }
    />
  ),
};

const UserStack = createStackNavigator({
  Home: UserProfileScreen
});

UserStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person`
          : 'md-person'
      }
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  UserStack
});
