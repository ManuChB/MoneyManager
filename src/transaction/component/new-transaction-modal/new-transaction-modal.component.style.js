import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
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
        elevation: 10
    },
    modalStyle: {
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        shadowColor: 'red',
        shadowOpacity: 10,
        elevation: 5,
        position: 'absolute'
    },
    checkBoxStyle: {
        flex: 1, 
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 0,
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        elevation: 3,
        borderRadius: 10
    },
    deleteButton: {
        position: 'absolute',
        bottom: '25%',
        right: '3%',
        marginRight: 0,
        height: '80%',
        width: '10%',
        borderColor: '#ed0239',
        backgroundColor: '#ed0239'
    },
    deleteModalIcon: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    deleteModalCustom: {
        height: '40%'
    },
    deleteModalButton: {
        top: '30%'
    },
    '@media (max-width: 350)': {
        deleteModalCustom: {
            height: '60%'
        },
        deleteModalButton: {
            top: '20%'
        },
    }
});

export default styles;