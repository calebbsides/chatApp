import React from 'react';
import {
  StyleSheet
} from 'react-native';


export default StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50
  },
  profile_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatlog_container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  chatlog_inputContainer: {
    width: '100%',
    backgroundColor: '#F1F1F1',
  },
  chatlog_input: {
    height: 35,
    width: '90%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#CBCBCB',
    paddingLeft: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
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
    borderColor: 'grey',
    borderRadius: 20,
    fontSize: 25,
    padding: 20,
    marginTop: 10
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