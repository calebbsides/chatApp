const actions = {
    setMessages: (messages) => {
        return {
            type: 'setMessages',
            data: messages
        };
    },
    setChannel: (channel) => {
        return {
            type: 'setChannel',
            data: channel
        }
    }
}

export { actions };