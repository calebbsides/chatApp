import React, { Component } from 'react';
import { View, TextInput, KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../redux/actions';

import Messages from './Messages';

import styles from '../styles/appStyles';

mapStateToProps = state => {
    return {
        messages: state.messages,
        pusher: state.pusher,
        channel: state.channel
    };
}
  
mapDispatchToProps = dispatch => {
    return {
        actions: {
            setMessages: messages => {
                dispatch(actions.setMessages(messages));
            },
            setChannel: channel => {
                dispatch(actions.setChannel(channel));
            }
        }
    };
}

class ChatLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputHeight: 10,
            message: ''
        }
    }

    componentDidMount() {
        this.props.actions.setChannel(this.props.pusher.subscribe('private-NuggetsOnly'));

        this.props.pusher.bind('receiveMessage', (data) => {
            this.props.actions.setMessages([...this.props.messages, { message: data.message, align: 'left' }]);
        });

        this.props.pusher.bind('client-message', (data) => {
            this.props.actions.setMessages([...this.props.messages, {  message: data.message, align: 'left' }]);
        });
    }

    textChange = (text) => {
        this.setState({ message: text });
    }

    submitText = () => {
        if(this.state.message.trim() !== '') {
            this.props.channel.trigger('client-message', {message: this.state.message} );
            this.props.actions.setMessages([...this.props.messages, { message: this.state.message, align: 'right' }]);
            this.setState({
                message: ''
            })
        }
    }

    render() {
        return (
            <View style={styles.chatlog_container}>
                <Messages />
                <KeyboardAvoidingView style={styles.chatlog_inputContainer} behavior='padding' keyboardVerticalOffset={115}>
                    <TextInput 
                        style={ [styles.chatlog_input, {marginBottom: this.state.inputHeight}] }
                        value={this.state.message} 
                        onChangeText={this.textChange} 
                        clearTextOnFocus={true} 
                        onSubmitEditing={this.submitText} 
                    >
                    </TextInput>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLog);