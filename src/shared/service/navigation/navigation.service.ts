import store from '../../../store/configreStore';
import { NavigationActions } from 'react-navigation';

const config = { navigator: null};

class NavigationService {

    setNavigator(navigator){
        config.navigator = navigator;
    }
    navigateTo(routeName: string, params = {}) {
        console.log(`[NavigationService][navigateTo][routeName]-> ${routeName}// [params]->${JSON.stringify(params)}`);
        config.navigator.navigate({ routeName: routeName, params });
        return;
    }

    //navigate to previous stack
    navigateBack() {
        config.navigator.dispatch(NavigationActions.back());
    }
}

export default new NavigationService();