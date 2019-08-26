import React, {StatelessComponent} from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import appConstants from '../../../appConstants';

const Spinner: StatelessComponent = ({conectionError}) => {
    const wifi = appConstants.noWifiIcon;
    return (
        <View style={styles.spinnerStyle} >
            {!conectionError && <ActivityIndicator size={'large'} color="#0000ff"/>} 
            {conectionError && 
                <Image 
                style={{ alignSelf: 'center', width: 125, height: 125 }} 
                source={wifi} />
            }
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
