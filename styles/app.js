import React from 'react';
import {
  StyleSheet
} from 'react-native';
import Colors from '../constants/colors';

export default StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: Colors.appPalette1
  },
  profile_container: {
    flex: 1,
    backgroundColor: Colors.appPalette2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatlog_container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.appPalette2,
  },
  chatlog_inputContainer: {
    width: '100%',
    backgroundColor: Colors.appPalette2,
  },
  chatlog_input: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.appPalette1,
    paddingLeft: 20,
    alignSelf: 'center',
    backgroundColor: Colors.appPalette2,
    margin: 10
  },
  message_container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 20
  },
  message_input: {
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: Colors.appPalette1,
    borderRadius: 20,
    fontSize: 25,
    padding: 20,
    marginTop: 10,
    color: Colors.textColor,
  },
  message_inputRight: {
    alignSelf: 'flex-end',
    textAlign: 'right'
  },
  message_inputLeft: {
    alignSelf: 'flex-start',
    textAlign: 'left'
  },
});