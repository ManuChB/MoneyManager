
const config = { navigator: null};

class NavigationService {

    setNavigator(navigator){
        config.navigator = navigator;
    }
    navigateTo(routeName: string, params = {}) {
        console.log(`[NavigationService][navigateTo][routeName]-> ${routeName}`);
        config.navigator.navigate({ routeName: routeName, params });
        return;
    }
}

export default new NavigationService();