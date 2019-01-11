import { StackNavigator, TabNavigator, NavigationContainer } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import appConstants from './appConstants';
//screens
// import AcountScreen from './auth/acount/acount.screen';
import LoginScreen from './login/login.screen';
import SplashScreen from './splash/splash.screen';
import AccountListScreen from './account/account-list.screen';
import TransactionListScreen from './transaction/transaction-list.screen';
import MoneyManagerScreen from './money-manager/money-manager.screen';
import NewTransactionScreen from './transaction/component/new-transaction-modal/new-transaction-modal.screen';
import accountDetailScreen from './account/account-detail/account-detail.screen';

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


const AppNavigator: NavigationContainer = StackNavigator(
    {
        Splash: { screen: SplashScreen },
        Login: { screen: LoginScreen },
        MoneyManager: { screen: MoneyManagerScreen },
        Accounts: { screen: AccountListScreen },
        Transactions: { screen: TransactionListScreen },
        NewTransaction: { screen: NewTransactionScreen },
        AccountDetail: { screen: accountDetailScreen}
        // Settings: { screen: SettingsScreen }
    },
    {
        initialRouteName: appConstants.routName.splash,
        navigationOptions: { header: null, gesturesEnabled: false },
        transitionConfig: TransitionConfiguration
    }
);

export default AppNavigator;
