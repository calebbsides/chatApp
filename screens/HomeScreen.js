import React from 'react';
import {
  View
} from 'react-native';
import * as Firebase from 'firebase';
import {
  ChatLog
} from "../components";
import {
  connect
} from 'react-redux';
import {
  actions
} from '../redux/actions';
import {
  Permissions,
  Notifications
} from 'expo';

import styles from '../styles/appStyles';

mapStateToProps = state => {
  return {
    user: state.user
  };
}

mapDispatchToProps = dispatch => {
  return {
    actions: {
      setUser: user => {
        dispatch(actions.setUser(user));
      },
      updateUser: user => {
        dispatch(actions.updateUser(user));
      }
    }
  };
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    }
  }

  _setUpNotifications = async () => {
    const {
      status
    } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    if (status !== 'granted') {
      const {
        status
      } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    this.setState({ token: await Notifications.getExpoPushTokenAsync()});
  }

  _setUpUser = async () => {
    this._setUpNotifications();
    const currentUserEmail = Firebase.auth().currentUser.email;

    Firebase.database().ref("users").on("value",
      data => {
        let users = data.val();
        for (var user in users) {
          if (users[user].userid === currentUserEmail) {
            this.props.actions.setUser({
              userid: currentUserEmail,
              userKey: users[user].userKey,
              pushToken: this.state.token
            });
            this.props.actions.updateUser(this.props.user);
          }
        }
      },
      error => {
        console.info(error.message)
      }
    );
  }

  componentDidMount() {
    this._setUpUser();
  }

  render() {
    return ( 
      <View style = {styles.app_container} >
        {this.state.token}
        <ChatLog />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);