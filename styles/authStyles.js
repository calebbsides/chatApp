import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    auth_container: {
        flex: 1,
        backgroundColor: '#9550e5',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    auth_heading: {
        color: '#ffffff',
        fontSize: 38,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 100,
    },
    auth_input: {
        width: 300,
        height: 50,
        borderWidth: 1,
        borderColor: '#bcbcbc',
        padding: 5,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    auth_buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    auth_button: {
        width: 140,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 10,
    },
    auth_fullWidthButton: {
        width: 300
    }
});