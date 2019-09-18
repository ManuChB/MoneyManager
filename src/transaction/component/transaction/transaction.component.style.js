import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
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
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        borderBottomWidth: 1
    },
    textValue: { 
       margin: 10
    },

    expense: {
        color: 'red'
    },
    income: {
        color: 'green'
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
