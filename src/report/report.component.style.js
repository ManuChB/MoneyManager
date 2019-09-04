import {
    StyleSheet
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const styles = EStyleSheet.create({
    mainViewStyle: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    touchableStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#3ca8cf',
        borderTopColor: '#1379a3',
        borderTopWidth: 0
    },
    touchableViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableTextStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    selectedTab: {
        borderBottomColor: '#2c809e',
        borderBottomWidth: 5,
        shadowOffset: {
            width: 10,
            height: 30,
        },
        shadowColor: 'black',
        elevation: 30
    },
    transListTitle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 2,
        position: 'relative',
        backgroundColor: '#3ed5e6',
        height: 30,
    }, 
    totalText: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10
    },
    valueText: {
        fontSize: '1rem',
        fontWeight: 'bold',
        position: 'absolute',
        right: 0,
        marginRight: 10,
        color: '#61615e'
    },
    '@media (max-width: 350)': {
        
        totalText: {
            fontSize: '0.9rem'
        },
        valueText: {
            fontSize: '0.9rem'
        },
    }
});

export default styles;