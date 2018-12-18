
const config = { navigator: null};

class NavigationService {

    setNavigator(navigator){
        config.navigator = navigator;
    }
    navigateTo(routeName: string, params = {}) {
        config.navigator.navigate({ routeName: routeName, params });
        return;
    }
}

export default new NavigationService();