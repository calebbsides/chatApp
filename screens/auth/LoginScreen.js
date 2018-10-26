import React, { Component } from 'react';
import {
  TextInput,
  View,
  Button,
  Alert
} from 'react-native';
import * as Firebase from 'firebase';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions';

import styles from '../../styles/authStyles';

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
            }
        }
    };
}

class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        }
    }

    _handleLoginPress = () => {
        const { userid } = this.props.user;
        const { password } = this.state;

        Firebase.auth().signInWithEmailAndPassword(userid, password).then(
            () => {
                this.props.actions.setUser({
                    userid: userid
                });
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
                    onChangeText={ text => { this.props.actions.setUser({ userid: text }) } } />
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

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);