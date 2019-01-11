
const constants = {
    routName: {
        splash: 'Splash',
        login: 'Login',
        tabs: 'Tab',
        moneyManager: 'MoneyManager',
        accounts: 'Accounts',
        transactions: 'Transactions',
        newTransaction: 'NewTransaction',
        accountDetail: 'AccountDetail'
    },
    loginMode:{
        register: 'Register',
        logIn: 'LogIn',
        forgotPassword: 'ForgotPassword'
    },
    tabMode: {
        account: 'Account',
        transaction: 'Transaction'        
    },
    timeMode: {
        day: 'Day',
        week: 'Week',
        month: 'Month',
        year: 'Year'
    },

    transactionIcons: {
        cash: { 
            id: 'CASH',
            value: require('../assets/images/cash-filled-64.png')
        } ,
        credit: {
            id: 'CREDIT',
            value: require('../assets/images/credit-card-64.png')
        }, 
        default: {
            id: 'DEFAULT',
            value: require('../assets/images/icons8-cash-filled-64.png')
        },
    }
}

export default constants;