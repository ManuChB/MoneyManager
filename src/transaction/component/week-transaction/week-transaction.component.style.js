import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    section: {
        flexDirection: 'row',
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
    date: {
        flex: 1,
    },
    categoryText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    transListTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 2,
        position: 'relative',
        backgroundColor: '#3ed5e6',
        height: 30
    },
    valueText: {
        fontSize: 17,
        fontWeight: 'bold',
        position: 'absolute',
        right: '5%'
    }
});

export default styles;