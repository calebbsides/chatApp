import React from 'react';
import {
  View
} from 'react-native';
import * as Firebase from 'firebase';
import { ChatLog } from "../components";
import { connect } from 'react-redux';
import { actions } from '../redux/actions';

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
          }
      }
  };
}

class HomeScreen extends React.Component {
  constructor (props) {
    super(props);

    this.props.actions.setUser({ userid: Firebase.auth().currentUser.email });
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