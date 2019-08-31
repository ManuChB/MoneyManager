
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
        ACCOUNT_TYPES: 'ACCOUNT_TYPES',
        USER_LANGUAGE: 'USER_LANGUAGE',
        USER_CURRENCY: 'USER_CURRENCY',
        TRANSACTIONS_BY_CATEGORY: 'TRANSACTIONS_BY_CATEGORY',
        USER_ACCOUNTS: 'USER_ACCOUNTS',
        USER_TRANSACTIONS: 'USER_TRANSACTIONS'
    },

    sqliteTable: {
        account: 'account',
        accountType: 'accountType',
        category: 'category',
        categorySubcategory: 'categorySubcategory',
        currency: 'currency',
        imageIcon: 'imageIcon',
        subCategory: 'subCategory',
        transactions: 'transactions'
    },

    transactionIcons:{
        cash: require('../assets/images/cash-filled-64.png'),
        card: require('../assets/images/credit-card-64.png'),
        DEFAULT: require('../assets/images/icons8-cash-filled-64.png')
    },
    defaultTransactionIcon: {
        name: 'DEFAULT',
        icon: require('../assets/images/icons8-cash-filled-64.png')
    },

    swipeConstants: {
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 10
    },
    accountTypesGeneral:{
        name: "accountTypes.general"
    },
    noWifiIcon: require('../assets/images/noWifi96.png')
}

export default constants;