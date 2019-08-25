import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

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