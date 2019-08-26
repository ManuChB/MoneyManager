import { put, takeLatest, call, select } from 'redux-saga/effects';

import accountListAction from './account-list.action';
import moneyManagerAction from '../money-manager/money-manager.action';

import accountListConstants from './account-list.constant';
import FirebaseService from '../shared/service/firebase/firebase.service';
import NavigationService from '../shared/service/navigation/navigation.service';
import appConstants from '../appConstants';
import AsyncStorageService from '../shared/service/async-storage/async-storage.service';
import * as selectors from './selectors';
import AccountService from '../shared/service/account/account.service';

export default [
    takeLatest(accountListConstants.ACCOUNT_LIST_INITIALIZE_START, initialize),
    takeLatest(accountListConstants.SET_ACCOUNT_TO_DETAIL, accountToDetail),
    takeLatest(accountListConstants.SAVE_NEW_ACCOUNT, saveNewAccount),
    takeLatest(accountListConstants.REMOVE_ACCOUNT, removeAccount)
];



export function* initialize() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        yield call(getAccounts);
        yield put(accountListAction.accountListInitializeFinish());
        const uCurrency = yield call(AsyncStorageService.getItem, appConstants.asyncStorageItem.USER_CURRENCY);
        console.log('---------------accc', uCurrency);
        yield put(accountListAction.setUserCurrency(uCurrency));
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][accountList][saga][initialize]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}

export function* getAccounts() {
    try {
        yield put(moneyManagerAction.moneyManagerShowSpinner());
        const accountList = yield call(AccountService.getAccounts);
        yield put(accountListAction.setAccounts(accountList));
        const orderedAccountList = orderAccuntsByType(accountList);
        yield put(accountListAction.setAccountsByType(orderedAccountList));
        yield call(calculateBalance);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    } catch (e) {
        console.log(`[error][accountList][saga][getAccounts]>>> ${e}`);
        yield put(moneyManagerAction.moneyManagerHideSpinner());
    }
}

export function orderAccuntsByType(accountList) {
    let array = [];
    appConstants.accountTypesArray.forEach(type => {
        let arr = accountList.filter(
            (account) => account.type.id == type.id
        )
        array.push({type, data: arr});
    });
    return array;    
}

export function* accountToDetail(action) {
    try {
        yield call(NavigationService.navigateTo, appConstants.routName.accountDetail,
            {
                account: action.value.account,
                onClose: NavigationService.navigateBack,
                onSave: action.value.onSave,
                onRemove: action.value.onRemove
            }
        );
    } catch (e) {
        console.log(`[error][accountList][saga][accountToDetail]>>> ${e}`);
    }
}

export function* saveNewAccount(action) {
    try {
        if (action.value.id.includes(appConstants.localId.account)) {
            yield call(AccountService.newAccount, action.value);
        } else {
            yield call(updateAccount, action);
        }
        yield call(getAccounts);
    } catch (e) {
        console.log(`[error][accountList][saga][saveNewAccount]>>> ${e}`);
    }
}


export function* updateAccount(action) {
    try {
        if (action.value.id.includes(appConstants.localId.account)) {
            yield call(saveNewAccount, action);
        } else {
            AccountService.updateAccount(action.value);
            yield call(initialize);
        }
    } catch (e) {
        console.log(`[error][accountList][saga][updateAccount]>>> ${e}`);
    }
}

export function* calculateBalance() {
    try {
        const accounts = yield select(selectors.getAccounts); 
        let balanceInfo = yield select(selectors.getBalanceInfo);
        const accountListByType = yield select(selectors.getAccountListByType);

        const { income, expense, balance } = AccountService.calculateBalance(accounts);

        if (balanceInfo.some(balance => balance.type === appConstants.accountTypesGeneral.name)) {
            balanceInfo = balanceInfo.map(
                (b) => b.type === appConstants.accountTypesGeneral.name ? { income, expense, balance, type: appConstants.accountTypesGeneral.name } : balance
            )
        }else{
            balanceInfo.push({ income, expense, balance, type: appConstants.accountTypesGeneral.name })
        }

        yield accountListByType.map(accountList => {
            if (accountList.data.length > 0){
                const response = AccountService.calculateBalance(accountList.data);
                if (balanceInfo.some(balance => balance.type === accountList.type)) {
                    balanceInfo = balanceInfo.map(
                        (balance) => balance.type === accountList.type ? { income: response.income, expense: response.expense, balance: response.balance, type: accountList.type } : balance
                    )
                } else {
                    balanceInfo.push({ income: response.income, expense: response.expense, balance: response.balance, type: accountList.type })
                }
            }
        });

        yield put(accountListAction.setBalanceInfo(balanceInfo));        
    } catch (e) {
        console.log(`[error][accountList][saga][calculateBalance]>>> ${e}`);
    }
}

export function* removeAccount(action) {
    try {
        yield call(AccountService.removeAccount, action.value);
        yield call(initialize);
    } catch (e) {
        console.log(`[error][day-transaction][saga][removeTransaction]>>> ${e}`);
    }
}