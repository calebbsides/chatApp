import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './auth-flow';

import LogInScreen from '../screens/auth/login';
import SignUpScreen from '../screens/auth/sign-up';
import ForgotPasswordScreen from '../screens/auth/forgot-password';

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