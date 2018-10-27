import * as Firebase from 'firebase';

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
    },
    setUser: (user) => {
        return {
            type: 'setUser',
            data: user
        }
    },
    watchMessages: () => {
        return dispatch => {
            Firebase.database().ref("messages").on("value",
                data => {
                    let messages = data.val();
                    let arr = [];
                    for (var message in messages) {
                        if (messages[message].message !== "") {
                            arr.push(messages[message]);
                        }
                    }
                    dispatch(actions.setMessages(arr.reverse()));
                },
                error => {
                    console.info(error.message)
                }
            );
        }
    },
    writeMessage: (message) => {
        return dispatch => {
            Firebase.database().ref("messages").push(message);
        }
    },
    writeUser: (user) => {
        return dispatch => {
            const newUserKey = Firebase.database().ref().child('users').push().key;
            const newUser = {
                ...user,
                userKey: newUserKey
            }

            let updates = {};
            updates['/users/' + newUserKey] = newUser;

            dispatch(actions.setUser(newUser));
            return Firebase.database().ref().update(updates, 
                err => {

                }    
            );
        }
    },
    updateUser: (user) => {
        return dispatch => {

            let updates = {};
            updates['/users/' + user.userKey] = user;

            return Firebase.database().ref().update(updates, 
                error => {
                    if(error) {
                        console.info(error.message);
                    }
                }    
            );
        }
    }
}

export {
    actions
};