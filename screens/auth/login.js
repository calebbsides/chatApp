import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
  Alert,
  Text
} from 'react-native';
import * as Firebase from 'firebase';

import styles from '../../styles/auth';

export default class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            password: ""
        }
    }

    handleLoginPress = () => {
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

    handleForgotPasswordPress = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    handleCreateAcountPress = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={ styles.auth_container }>
                <Text style={ styles.auth_heading }>LOG IN</Text>
                <TextInput 
                    style={ styles.auth_input } 
                    value={ this.state.userid } 
                    placeholder={ 'Email' }
                    textContentType={ 'username' }
                    autoCapitalize={ 'none' }
                    keyboardType={ 'email-address' }
                    onChangeText={ text => { this.setState({ userid: text }) } } />
                <TextInput 
                    style={ styles.auth_input } 
                    value={ this.state.password } 
                    placeholder={ 'Password' }
                    secureTextEntry={ true }
                    textContentType={ 'password' }
                    autoCapitalize={ 'none' }
                    onChangeText={ text => { this.setState({ password: text }) } } />
                <View style={ styles.auth_buttonContainer }>
                    <View style={ [styles.auth_button, styles.auth_fullWidthButton] } >
                        <Button color={ '#ffffff' } title={ 'Log In' } onPress={this.handleLoginPress} />
                    </View>
                    <View style={ [styles.auth_button, { marginRight: '5%'}] } >
                        <Button color={ '#ffffff' } title={ 'Forgot Password' } onPress={this.handleForgotPasswordPress} />
                    </View>
                    <View style={ styles.auth_button } >
                        <Button color={ '#ffffff' } title={ 'Create an Account' } onPress={this.handleCreateAcountPress} />
                    </View>
                </View>
            </View>
        );
    }
}