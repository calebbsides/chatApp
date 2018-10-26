import Pusher from 'pusher-js/react-native';

const initialState = {
    pusher: new Pusher('34b5eb49f328341df2f1', {
        authEndpoint: 'https://server-zxjljhbupn.now.sh/pusher/auth',
        cluster: 'us2',
        encrypted: true
    }),
    channel: null,
    messages: [],
    user: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setMessages":
            return {
                ...state,
                messages: action.data
            }
        case "setChannel":
            return {
                ...state,
                channel: action.data
            }
        case "setUser":
            return {
                ...state,
                user: action.data
            }
        default:
            return state;
    }
}

export { reducer };