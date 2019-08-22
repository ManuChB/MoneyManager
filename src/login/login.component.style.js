import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingLeft: 15,
        paddingRight: 15
        //backgroundColor: 'rgba(179, 206, 249, 1)'
    },
    subContainerStyle: {
        flex: 0.6,
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
        flex: 1, 
        marginBottom: 50
    },
    errorStyle: { 
        flex: 1,
        color: 'red',
        marginLeft: 25,
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