import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/app';

class Messages extends Component {
    constructor(props) {
        super(props);
    }

    mapMessagesToComponents = () => {
        return this.props.messages.map((message, index) => {
            if(message.user !== this.props.user.userKey) {
                return (
                    <Text style={[styles.message_input, styles.message_inputLeft]} key={'Message_' + index}>{message.message}</Text>
                );
            } else {
                return (
                    <Text style={[styles.message_input, styles.message_inputRight]} key={'Message_' + index}>{message.message}</Text>
                );
            }
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.message_container}>
                {this.mapMessagesToComponents()}
            </ScrollView>
        )
    }
}

mapStateToProps = state => {
    return {
        user: state.user,
        messages: state.messages
    };
}
  
mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);