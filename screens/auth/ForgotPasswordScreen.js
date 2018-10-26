import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
  Alert
} from 'react-native';
import * as Firebase from 'firebase';

import styles from '../../styles/authStyles';

export default class ForgotPaswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: ''
        };
    }

    _handleResetPasswordPress = () => {
        const { userid } = this.state;

        Firebase.auth().sendPasswordResetEmail(userid).then(
            () => {
                Alert.alert("We have sent an email to " + userid + " to reset your password");
                this.props.navigation.navigate("LogIn");
            },
            error => {
                Alert.alert(error.message);
                this.props.navigation.navigate("LogIn");
            }
        );
    }

    render() {
        return (
        <View style={styles.container}>
            <TextInput 
                style={ styles.input } 
                value={ this.state.userid } 
                placeholder={ 'Email' }
                autoCapitalize={ 'none' }
                onChangeText={ text => { this.setState({ userid: text }) } } />
            <Button title={ 'Reset Password' } onPress={this._handleResetPasswordPress} />
        </View>
        );
    }
}