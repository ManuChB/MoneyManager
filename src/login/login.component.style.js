import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch'
        //backgroundColor: 'rgba(179, 206, 249, 1)'
    },
    subContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        margin: 20

    },
    infoTextStyle:{
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 25,
        flexDirection: 'row'
    },
    buttonContainerStyle: {
        marginBottom: 50
    },
    errorStyle: { 
        color: 'red',
        marginTop:25,
        marginLeft: 25,
        marginRight: 25,
        minHeight: 50
    },
    linearGradient: {
        flex: 1
    },
    modelTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    languageSelectorStyle: {
        alignSelf: 'flex-end'
    }
})

export default styles;