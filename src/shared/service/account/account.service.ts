import _ from 'lodash';
import { IAccountData } from '../../../account/account/account.model';
import FirebaseService from '../firebase/firebase.service';
import appConstants from '../../../appConstants';
import NavigationService from '../navigation/navigation.service';
import AsyncStorageService from '../async-storage/async-storage.service';
import { database } from 'firebase';
import sqLiteService from '../sqLite/sqLite.service';

let _this;
class AccountService {
    constructor() {
        _this = this;
    }
    async getAccounts() {
        try {
            const accounts = await sqLiteService.getAllAccounts();
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
                const insertId = await sqLiteService.addAccount({ ...account, uid: uid });
                const item = await FirebaseService.addToCollection(appConstants.collection.accounts, { ...account, uid: uid, id: insertId });
                await sqLiteService.updateAccount({ ...account, uid: uid, id: insertId, firebaseId: item.id });
            }
            else{
                _this.updateAccount(account);
            }
        } catch (e) {
            console.log(`[error][AccountService][newAccount]>>> ${e}`);
        }
    }

    async updateAccount(account) {
        console.log('---------updateaccount-----', account);
        try {
            if (account.id.toString().includes(appConstants.localId.account)) {
                await _this.newAccount(account);
            } else {
                await sqLiteService.updateAccount(account);
                FirebaseService.updateDocumentInCollection(appConstants.collection.accounts, account);
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
            FirebaseService.removeFromCollection(appConstants.collection.accounts, account);
            await sqLiteService.removeAccount(account);
        } catch (e) {
            console.log(`[error][accountService][removeAccount]>>> ${e}`);
        }
    }


}

export default new AccountService();