import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    textStyle: {
        color: 'black',
        fontSize: 14,
    },
    valueStyle: {
        color: 'black',
        fontSize: 14,
        fontWeight: '600'

    },
    infoStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'white',
        height: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    }
})

export default styles;