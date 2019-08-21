import { put, takeLatest, call, select } from 'redux-saga/effects';
import transactionListConstants from './transaction-list.constant';



export default [
    takeLatest(transactionListConstants.TRANSACTION_LIST_LONG_PRESS, longPress)
];



export function* longPress(action) {
    try {
        console.log('------[transaction-list][saga][longPress]---data----', action.value);

/*
        if (TransactionListActions.selecteToDeleteList.size() == 0) {
            this.props.actions.startDeleteMode();
        }

        this.props.actions.addToDeleteList(data);

        if (this.props.state.selecteToDeleteList.size() == 0) {
            this.props.actions.exitDeleteMode();
        }
        */
    } catch (e) {
        console.log(`[error][transaction-list][saga][longPress]>>> ${e}`);

    }
}

