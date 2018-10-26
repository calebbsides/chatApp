import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from '../styles/appStyles';

export default class Skeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
        <View style={styles.app_container}>
            <Text>Skeleton Code for a screen</Text>
        </View>
        );
    }
}
