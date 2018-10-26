import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';

import styles from '../styles/appStyles';

export default class Messages extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const messageComponents = this.props.messages.map((message, index) => {
            if(message.align === 'left') {
                return <Text style={[styles.message_input, styles.message_inputLeft]} key={'Message_' + index}>{message.message}</Text>
            } else {
                return <Text style={[styles.message_input, styles.message_inputRight]} key={'Message_' + index}>{message}</Text>
            }
        });

        return (
            <ScrollView contentContainerStyle={styles.message_container}>
                {messageComponents}
            </ScrollView>
        )
    }
}