import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
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
        fontSize: 12

    }
});

export default styles;