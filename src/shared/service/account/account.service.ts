import _ from 'lodash';
import { IAccountData } from '../../../account/account/account.model';
import FirebaseService from '../firebase/firebase.service';
import appConstants from '../../../appConstants';
import NavigationService from '../navigation/navigation.service';
import AsyncStorageService from '../async-storage/async-storage.service';
import { database } from 'firebase';

let _this;
class AccountService {
    constructor() {
        _this = this;
    }
    async getAccounts() {
        try {
            //const uid = await AsyncStorageService.getItem('USER_ID');
            //const accounts = await FirebaseService.getAllFromCollectionWhithUid(appConstants.collection.accounts, uid);
            //await AsyncStorageService.removeItem(appConstants.asyncStorageItem.USER_ACCOUNTS);

            const accounts = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_ACCOUNTS)
            if(accounts) {
                return accounts;
            } else{
                return [];
            }
            
        } catch (e) {
            console.log(`[error][AccountService][getAccounts]>>> ${e}`);
        }
    }

    calculateBalance(accounts: Array<IAccountData>):{income: number, expense: number, balance: number} {
        try {
            var income = 0;
            var expense = 0;
            var balance = 0;
            accounts.forEach(element => {
                if (element.value < 0.00) {
                    expense += element.value;
                } else {
                    income += element.value;
                }
            });
            balance = income + expense;
            return { income, expense, balance }
        } catch (e) {
            console.log(`[error][AccountService][calculateBalance]>>> ${e}`);
        }
    }

    async newAccount(account) {
        try {
            if (account.id.includes(appConstants.localId.account)) {
                const uid = await AsyncStorageService.getItem('USER_ID');
                const data = await FirebaseService.addToCollection(appConstants.collection.accounts, {...account, uid: uid});
                await _this.updateAccount({ ...account, id: data.id }, true);
                let uAccounts = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_ACCOUNTS) || [];
                uAccounts.push({ ...account, id: data.id, value: parseFloat(account.value) });
                await AsyncStorageService.setItem(appConstants.asyncStorageItem.USER_ACCOUNTS, uAccounts );
            }
            else{
                _this.updateAccount(account);
            }
        } catch (e) {
            console.log(`[error][AccountService][newAccount]>>> ${e}`);
        }
    }

    async updateAccount(account, noLocalUpdate?) {
        try {
            if (account.id.includes(appConstants.localId.account)) {
                await _this.newAccount(account);
            } else {
                FirebaseService.updateDocumentInCollection(appConstants.collection.accounts, account);
            }
            if (!noLocalUpdate){
                let uAccounts = await AsyncStorageService.getItem(appConstants.asyncStorageItem.USER_ACCOUNTS) || [];
                const updatedAccounts = uAccounts.map(
                    (a) => a.id === account.id ? account : a
                )
                await AsyncStorageService.setItem(appConstants.asyncStorageItem.USER_ACCOUNTS, updatedAccounts);

            }
        } catch (e) {
            console.log(`[error][accountService][updateAccount]>>> ${e}`);
        }
    }

    
    async accountToDetail(account, onSave) {
        try {
            await NavigationService.navigateTo(appConstants.routName.accountDetail,
                {
                    data: account,
                    onClose: NavigationService.navigateBack,
                    onSave: onSave
                }
            );
        } catch (e) {
            console.log(`[error][accountService][accountToDetail]>>> ${e}`);
        }
    }


    async removeAccount(account) {
        try {
            await FirebaseService.removeFromCollection(appConstants.collection.accounts, account);
        } catch (e) {
            console.log(`[error][accountService][removeAccount]>>> ${e}`);
        }
    }


}

export default new AccountService();