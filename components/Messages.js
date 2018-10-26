import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/appStyles';

mapStateToProps = state => {
    return {
        messages: state.messages
    };
}
  
mapDispatchToProps = dispatch => {
    return {};
}

class Messages extends Component {
    constructor(props) {
        super(props);
    }

    mapMessagesToComponents = () => {
        return this.props.messages.reverse().map((message, index) => {
            if(message.align === 'left') {
                return <Text style={[styles.message_input, styles.message_inputLeft]} key={'Message_' + index}>{message.message}</Text>
            } else {
                return <Text style={[styles.message_input, styles.message_inputRight]} key={'Message_' + index}>{message.message}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages);