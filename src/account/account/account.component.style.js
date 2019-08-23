import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    dataViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    valueStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600'
    },
    textStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3'
    },
    infoStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50,
        borderBottomWidth: 1
    },
    textValue: {
        margin: 10
    }

})

export default styles;
