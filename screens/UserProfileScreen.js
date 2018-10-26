import React, { Component } from 'react';
import {
  Button,
  View
} from 'react-native';
import * as Firebase from 'firebase';

import styles from '../styles/appStyles';

export default class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _handleSignOutPress = () => {
        Firebase.auth().signOut();
    }

    render() {
        return (
        <View style={styles.profile_container}>
            <Button title={ 'Sign Out' } onPress={this._handleSignOutPress} />
        </View>
        );
    }
}