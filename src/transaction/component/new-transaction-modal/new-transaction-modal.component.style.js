import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        elevation: 4,
        position: 'absolute'
    },
    screenBlocker: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        shadowOpacity: 2,
    },
    modalStyle: {
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        shadowColor: 'red',
        shadowOpacity: 10,
        elevation: 5,
        position: 'absolute'
    }
});

export default styles;