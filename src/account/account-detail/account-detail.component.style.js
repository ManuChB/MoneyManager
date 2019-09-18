import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    deleteButton: {
        position: 'absolute',
        right: '3%',
        marginRight: 0,
        height: '80%',
        width: '10%',
        borderColor: '#ed0239',
        backgroundColor: '#ed0239'
    },
    headerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        borderBottomWidth: 1
    },
    headerTextStyle: {
        color: 'black',
        fontSize: 18,
        textTransform: 'uppercase'

    },
    deleteModalIcon: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    deleteModalCustom: {
        height: '45%'
    },
    deleteModalButton: {
        top: '27.5%'
    },
    deleteModalText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        margin: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    deleteModalView: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        bottom: 0,
        marginTop: 10,
        marginBottom: 20
    },
    '@media (max-width: 750)': {
        deleteModalCustom: {
            height: '55%'
        },
        deleteModalText: {
            margin: 20
        },
        deleteModalButton: {
            top: '22.5%'
        },
    },
    '@media (max-width: 350)': {
        deleteModalCustom: {
            height: '60%'
        },
        deleteModalText: {
            margin: 10,
            marginTop: 0
        },
        deleteModalButton: {
            top: '20%'
        },
    }
});

export default styles;