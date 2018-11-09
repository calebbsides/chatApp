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

export default class ForgotPaswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: ''
        };
    }

    handleResetPasswordPress = () => {
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
        <View style={ styles.auth_container }>
            <Text style={ styles.auth_heading }>Forgot Password</Text>
            <TextInput 
                style={ styles.auth_input } 
                value={ this.state.userid } 
                placeholder={ 'Email' }
                autoCapitalize={ 'none' }
                keyboardType={ 'email-address' }
                onChangeText={ text => { this.setState({ userid: text }) } } />
            <View style={ styles.auth_buttonContainer }>
                <View style={ [styles.auth_button, styles.auth_fullWidthButton] } >
                    <Button color={ '#ffffff' } title={ 'Reset Password' } onPress={this.handleResetPasswordPress} />
                </View>
            </View>
        </View>
        );
    }
}