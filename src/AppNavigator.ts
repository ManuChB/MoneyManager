import { StackNavigator, TabNavigator, NavigationContainer } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import appConstants from './appConstants';
//screens
// import AcountScreen from './auth/acount/acount.screen';
import LoginScreen from './login/login.screen';
import SplashScreen from './splash/splash.screen';
// import SettingsScreen from './assignment-list/settings/settings.screen';

const TransitionConfiguration = () => {
    return {
        screenInterpolator: (sceneProps: any) => {
            const { position, scene } = sceneProps;
            const { index, route } = scene;
            const params = route.params || {};
            const noAnimation = params.noAnimation;
            if (noAnimation) {
                return {};
            }
            return CardStackStyleInterpolator.forHorizontal(sceneProps);
        }
    };
};

// const TabScreen: NavigationContainer = TabNavigator(
//     {
//         AcountScreen: { screen: AcountScreen }
//     },
//     {
//         animationEnabled: true,
//         tabBarOptions: {
//             activeTintColor: '#3f51b5',
//             inactiveTintColor: 'gray',
//             inactiveBackgroundColor: 'white',
//             activeBackgroundColor: 'white'
//         },
//         tabBarPosition: 'bottom'
//     }
// );

const AppNavigator: NavigationContainer = StackNavigator(
    {
        Splash: { screen: SplashScreen },
        Login: { screen: LoginScreen },
        // Tab: { screen: TabScreen },
        // Settings: { screen: SettingsScreen }
    },
    {
        initialRouteName: appConstants.routName.splash,
        navigationOptions: { header: null, gesturesEnabled: false },
        transitionConfig: TransitionConfiguration
    }
);

export default AppNavigator;
