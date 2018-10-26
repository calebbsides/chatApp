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
        channel: state.channel,
        user: state.user
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
            },
            watchMessages: () => {
                dispatch(actions.watchMessages());
            },
            writeMessage: message => {
                dispatch(actions.writeMessage(message));
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

        this.props.actions.watchMessages();
    }

    sendNotification = (message) => {
        fetch("https://exp.host/--/api/v2/push/send", {
            body: JSON.stringify({
                to: this.props.user.pushToken,
                title: "New Message",
                body: message
            }),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
        });
    }

    componentDidMount() {
        this.props.actions.setChannel(this.props.pusher.subscribe('private-NuggetsOnly'));

        this.props.pusher.bind('receiveMessage', (data) => {
            this.props.actions.setMessages([...this.props.messages, { message: data.message, align: 'left' }]);
            this.props.actions.writeMessage( { message: data.message, align: 'left' } );
            this.sendNotification(data.message);
        });

        this.props.pusher.bind('client-message', (data) => {
            this.props.actions.setMessages([...this.props.messages, {  message: data.message, align: 'left' }]);
            this.props.actions.writeMessage( { message: data.message, align: 'left' } );
            this.sendNotification(data.message);
        });
    }

    textChange = (text) => {
        this.setState({ message: text });
    }

    submitText = () => {
        const { message } = this.state;

        if(message.trim() !== '') {
            this.props.channel.trigger('client-message', {message: message} );
            this.props.actions.setMessages([...this.props.messages, { message: message, align: 'right' }]);
            this.props.actions.writeMessage( { message: message, align: 'right' } );
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