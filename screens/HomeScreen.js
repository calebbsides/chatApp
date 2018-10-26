import React from 'react';
import {
  View
} from 'react-native';
import * as Firebase from 'firebase';
import { ChatLog } from "../components";
import { connect } from 'react-redux';
import { actions } from '../redux/actions';
import { Permissions, Notifications } from 'expo';

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
  constructor (props) {
    super(props);

    this.props.actions.setUser({ ...this.props.user, userid: Firebase.auth().currentUser.email });
  }

  setUpNotifications = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    if(status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    
    if(finalStatus !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    this.props.actions.updateUser({ ...this.props.user, pushToken: token });
  }

  componentDidMount() {
    this.setUpNotifications();
  }

  render() {
    return (
      <View style={styles.app_container}>
        <ChatLog />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);