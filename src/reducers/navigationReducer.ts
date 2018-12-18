import NavigationContainer from '../AppNavigator';

export default (state: any, action: any) => NavigationContainer.router.getStateForAction(action, state);
