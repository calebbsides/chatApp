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
            },
            writeUser: user => {
                dispatch(actions.writeUser(user));
            }
        }
    };
}

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirm: ''
        };
    }

    _handleCreateAcountPress = () => {
        const { userid } = this.props.user;
        const { password } = this.state;
        const { passwordConfirm } = this.state;

        if(password !== passwordConfirm) {
            Alert.alert("Passwords do not match.");
            return;
        }

        Firebase.auth().createUserWithEmailAndPassword(userid, password).then(
            () => {
                this.props.actions.writeUser({ userid: userid });
            },
            error => {
                Alert.alert(error.message)
                this.props.navigation.navigate("LogIn");
            }
        );
    }

    render() {
        return (
            <View style={ styles.container }>
                <TextInput 
                    style={ styles.input } 
                    value={ this.props.userid } 
                    placeholder={ 'Email' }
                    autoCapitalize={ 'none' }
                    onChangeText={ text => { this.props.actions.setUser({ userid: text }) } } />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);