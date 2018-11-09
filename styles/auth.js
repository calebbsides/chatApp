import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export default StyleSheet.create({
    auth_container: {
        flex: 1,
        backgroundColor: Colors.appPalette1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 65,
    },
    auth_heading: {
        color: Colors.appPalette2,
        fontSize: 38,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 100,
    },
    auth_input: {
        width: 300,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.appPalette3,
        padding: 5,
        margin: 5,
        borderRadius: 10,
        backgroundColor: Colors.appPalette2,
    },
    auth_buttonContainer: {
        width: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    auth_button: {
        width: '47.5%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.appPalette2,
        borderRadius: 10,
    },
    auth_fullWidthButton: {
        width: '100%'
    }
});