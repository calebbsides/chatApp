import React from 'react';
import {
  View
} from 'react-native';
import { ChatLog } from "../components";
import styles from '../styles/appStyles';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.app_container}>
        <ChatLog />
      </View>
    );
  }
}