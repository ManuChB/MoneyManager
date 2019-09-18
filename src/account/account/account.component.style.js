import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    name: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    space: {
        width: '30%'
    },
    mainView: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    valueStyle: {
        color: 'black',
        fontSize: '1rem',
        fontWeight: '600'
    },
    valueRateStyle: {
        color: 'grey',
        fontSize: 12,
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
    },
    '@media (max-width: 350)': {
        valueStyle: {
            fontSize: '0.8rem',
        },
        valueRateStyle: {
            fontSize: '0.7rem',
        }
    }

})

export default styles;
