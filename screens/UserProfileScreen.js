import React, { Component } from 'react';
import {
  Button,
  View,
  Text
} from 'react-native';
import * as Firebase from 'firebase';
import { connect } from 'react-redux';

import styles from '../styles/appStyles';

mapStateToProps = state => {
    return {
        user: state.user
    };
}
  
mapDispatchToProps = dispatch => {
    return {};
}

class UserProfileScreen extends Component {
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
            <Text>{this.props.user.userid}</Text>
            <Button title={ 'Sign Out' } onPress={this._handleSignOutPress} />
        </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);