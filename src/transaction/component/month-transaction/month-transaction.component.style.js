import {
    StyleSheet
} from 'react-native';


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
    text: {
        fontSize: 17,
        alignSelf: 'center',
    },
});

export default styles;