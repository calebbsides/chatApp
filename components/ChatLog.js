import React, { Component } from 'react';
import { View, TextInput, KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../redux/actions';

import Blockchain from './Blockchain/Blockchain';
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
            chain: new Blockchain(this.props.messages, 10, 1),
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
        //Subscribe to the channel
        let channel = this.props.pusher.subscribe('private-NuggetsOnly');
        this.props.actions.setChannel(channel);

        console.info(this.props.channel);

        // Write messages from server to database
        this.props.pusher.bind('receiveMessage', (data) => {
            this.props.actions.writeMessage({ 
                message: data.message,
                user: data.user
            });
            this.sendNotification(data.message);
        });

        // Send notifications if enabled and app is in the background
        this.props.pusher.bind('client-message', (data) => {
            this.sendNotification(data.message);
        });
    }

    textChange = (text) => {
        this.setState({ message: text });
    }

    submitText = () => {
        const { message } = this.state;

        if(message.trim() !== '') {

            // Trigger push event with message
            this.props.channel.trigger('client-message', {
                message: message, 
                user: this.props.user.userKey
            });

            // Write message to database
            this.props.actions.writeMessage({ 
                message: message, 
                user: this.props.user.userKey
            });

            // Add Message to blockchain
            this.state.chain.addMessage({
                message: this.state.message,
                user: this.props.user.userid
            });

            // Reset message
            this.setState({
                message: ''
            });

            // Mine pending messages
            this.state.chain.minePendingMessages();
        }
    }

    render() {
        return (
            <View style={styles.chatlog_container}>
                <Messages />
                <KeyboardAvoidingView style={styles.chatlog_inputContainer} behavior='padding' keyboardVerticalOffset={65}>
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