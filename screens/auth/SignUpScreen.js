import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
  Alert
} from 'react-native';
import * as Firebase from 'firebase';

import styles from '../../styles/authStyles';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            password: '',
            passwordConfirm: ''
        };
    }

    _handleCreateAcountPress = () => {
        const { userid } = this.state;
        const { password } = this.state;
        const { passwordConfirm } = this.state;

        if(password !== passwordConfirm) {
            Alert.alert("Passwords do not match.");
            return;
        }

        Firebase.auth().createUserWithEmailAndPassword(userid, password).then(
            () => {

            },
            error => {
                Alert.alert(error.message)
            }
        );
    }

    render() {
        return (
            <View style={ styles.container }>
                <TextInput 
                    style={ styles.input } 
                    value={ this.state.userid } 
                    placeholder={ 'Email' }
                    autoCapitalize={ 'none' }
                    onChangeText={ text => { this.setState({ userid: text }) } } />
                <TextInput 
                    style={ styles.input } 
                    value={ this.state.password } 
                    placeholder={ 'Password' }
                    autoCapitalize={ 'none' }
                    secureTextEntry={ true }
                    onChangeText={ text => { this.setState({ password: text }) } } />
                <TextInput 
                    style={ styles.input } 
                    value={ this.state.passwordConfirm } 
                    placeholder={ 'Confirm Password' }
                    autoCapitalize={ 'none' }
                    secureTextEntry={ true }
                    onChangeText={ text => { this.setState({ passwordConfirm: text }) } } />
                <Button title={ 'Create Account' } onPress={this._handleCreateAcountPress} />
            </View>
        );
    }
}