import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import LogInScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

export default createSwitchNavigator(
  {
    LogIn: LogInScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'LogIn'
  }
);