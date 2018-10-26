import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
  Alert
} from 'react-native';
import * as Firebase from 'firebase';

import styles from '../../styles/authStyles';

export default class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            password: ""
        }
    }

    _handleLoginPress = () => {
        const { userid } = this.state;
        const { password } = this.state;

        Firebase.auth().signInWithEmailAndPassword(userid, password).then(
            () => {

            },
            error => {
                Alert.alert(error.message);
            }
        );
    }

    _handleForgotPasswordPress = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    _handleCreateAcountPress = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={ styles.container }>
                <TextInput 
                    style={ styles.input } 
                    value={ this.state.userid } 
                    placeholder={ 'Email' }
                    textContentType={ 'username' }
                    autoCapitalize={ 'none' }
                    keyboardType={ 'email-address' }
                    onChangeText={ text => { this.setState({ userid: text }) } } />
                <TextInput 
                    style={ styles.input } 
                    value={ this.state.password } 
                    placeholder={ 'Password' }
                    secureTextEntry={ true }
                    textContentType={ 'password' }
                    autoCapitalize={ 'none' }
                    onChangeText={ text => { this.setState({ password: text }) } } />
                <Button title={ 'Log In' } onPress={this._handleLoginPress} />
                <Button title={ 'Forgot Password' } onPress={this._handleForgotPasswordPress} />
                <Button title={ 'Create an Account' } onPress={this._handleCreateAcountPress} />
            </View>
        );
    }
}