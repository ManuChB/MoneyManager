import React, {StatelessComponent} from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner: StatelessComponent = () => {
    return (
        <View style={styles.spinnerStyle} >
            <ActivityIndicator size={'large'} />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        elevation: 1000,
        zIndez: 1000,
        position: 'absolute'
    }
};


export { Spinner };
