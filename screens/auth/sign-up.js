import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
  Alert,
  Text
} from 'react-native';
import * as Firebase from 'firebase';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions';

import styles from '../../styles/auth';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            password: '',
            passwordConfirm: ''
        };
    }

    handleCreateAcountPress = () => {
        const { userid } = this.state;
        const { password } = this.state;
        const { passwordConfirm } = this.state;

        if(password !== passwordConfirm) {
            Alert.alert("Passwords do not match.");
            return;
        }

        Firebase.auth().createUserWithEmailAndPassword(userid, password).then(
            () => {
                this.props.actions.writeUser({ ...this.props.user, userid: this.state.userid });
            },
            error => {
                Alert.alert(error.message)
                this.props.navigation.navigate("LogIn");
            }
        );
    }

    render() {
        return (
            <View style={ styles.auth_container }>
                <Text style={ styles.auth_heading }>CREATE ACCOUNT</Text>
                <TextInput 
                    style={ styles.auth_input } 
                    value={ this.props.userid } 
                    placeholder={ 'Email' }
                    autoCapitalize={ 'none' }
                    keyboardType={ 'email-address' }
                    onChangeText={ text => { this.setState({ userid: text }) } } />
                <TextInput 
                    style={ styles.auth_input } 
                    value={ this.state.password } 
                    placeholder={ 'Password' }
                    autoCapitalize={ 'none' }
                    secureTextEntry={ true }
                    onChangeText={ text => { this.setState({ password: text }) } } />
                <TextInput 
                    style={ styles.auth_input } 
                    value={ this.state.passwordConfirm } 
                    placeholder={ 'Confirm Password' }
                    autoCapitalize={ 'none' }
                    secureTextEntry={ true }
                    onChangeText={ text => { this.setState({ passwordConfirm: text }) } } />
                <View style={ styles.auth_buttonContainer }>
                    <View style={ [styles.auth_button, styles.auth_fullWidthButton] } >
                        <Button color={ '#ffffff' } title={ 'Create Account' } onPress={this.handleCreateAcountPress} />
                    </View>
                </View>
            </View>
        );
    }
}

mapStateToProps = state => {
    return {
        user: state.user
    };
}
  
mapDispatchToProps = dispatch => {
    return {
        actions: {
            setUser: user => {
                dispatch(actions.setUser(user));
            },
            writeUser: user => {
                dispatch(actions.writeUser(user));
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);