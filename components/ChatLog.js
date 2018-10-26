import React, { Component } from 'react';
import Pusher from 'pusher-js/react-native';
import { View, TextInput, KeyboardAvoidingView } from 'react-native';

import Messages from './Messages';

import styles from '../styles/appStyles';

export default class ChatLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputHeight: 10,
            messages: [],
            message: '',
            pusher: null,
            channel: {}
        }

        // Pusher.logToConsole = true;
    }

    componentWillMount() {
        const pusher = new Pusher('34b5eb49f328341df2f1', {
            authEndpoint: 'https://server-zxjljhbupn.now.sh/pusher/auth',
            cluster: 'us2',
            encrypted: true
        });

        this.setState({ pusher: pusher });
    }

    componentDidMount() {
        this.setState({ channel: this.state.pusher.subscribe('private-NuggetsOnly') });

        this.state.pusher.bind('receiveMessage', (data) => {
            this.setState({ messages: [...this.state.messages, {align: 'left', message: data.message}] });
        });

        this.state.pusher.bind('client-message', (data) => {
            this.setState({ messages: [...this.state.messages, {align: 'left', message: data.message}] });
        });
    }

    textChange = (text) => {
        this.setState({ message: text });
    }

    submitText = () => {
        if(this.state.message.trim() !== '') {
            this.state.channel.trigger('client-message', {message: this.state.message} );
            this.setState({
                messages: [...this.state.messages, this.state.message],
                message: ''
            });
        }
    }

    render() {
        return (
            <View style={styles.chatlog_container}>
                <Messages messages={this.state.messages} />
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