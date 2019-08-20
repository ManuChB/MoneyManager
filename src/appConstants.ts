
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
        transaction: 'Transaction',
        settings: 'Settings',
        report: 'Report'         
    },
    timeMode: {
        day: 'Day',
        week: 'Week',
        month: 'Month',
        year: 'Year'
    },

    localId: {
        transaction: 'transaction_',
        account: 'account_'
    },

    collection: {
        transactions: 'transactions',
        accounts: 'accounts',
        categories: 'categories',
        currency: 'currency',
        accountTypes: 'accountTypes'
    },

    asyncStorageItem: {
        CATEGORIES: 'CATEGORIES',
        CURRENCIES: 'CURRENCIES',
        ACCOUNT_TYPES: 'ACCOUNT_TYPES'
    },

    transactionIcons: {
        cash: { 
            iconName: 'cash',
            value: require('../assets/images/cash-filled-64.png')
        } ,
        credit: {
            iconName: 'card',
            value: require('../assets/images/credit-card-64.png')
        }, 
        default: {
            iconName: 'DEFAULT',
            value: require('../assets/images/icons8-cash-filled-64.png')
        },
    }
}

export default constants;