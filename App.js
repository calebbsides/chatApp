import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import APIKeys from './constants/api-keys';
import * as Firebase from 'firebase';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import styles from './styles/app';

import AppNavigator from './navigation/unauth-flow';
import MainTabNavigator from './navigation/auth-flow';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };

    // Initialize app if not already initialized
    if(!Firebase.apps.length) {
      Firebase.initializeApp(APIKeys.FirebaseConfig);
    }

    // Listen for authentication changes
    Firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({ 
        isAuthenticationReady: true,
        isAuthenticated: !!user
    });
  }

  checkAuthentication = () => {
    if (this.state.isAuthenticated) {
      return <MainTabNavigator />;
    } else {
      return <AppNavigator />;
    }
  }

  render() {
    if ((!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.app_container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {this.checkAuthentication()}
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
      }),
    ]);
  };

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
