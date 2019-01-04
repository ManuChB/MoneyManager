import { put, takeLatest, call } from 'redux-saga/effects';
import moment from "moment";
import dayTransactionAction from './day-transaction.action';
import { DAY_TRANSACTION_INITIALIZE_START } from './day-transaction.constant';
import appConstants from '../../../appConstants';

export default [
    takeLatest(DAY_TRANSACTION_INITIALIZE_START, initialize)
];

export function* initialize() {
    try {
        console.log(`[dayTransactions][saga][initialize]`, arrayData);

        yield put(dayTransactionAction.setDayTransactions(arrayData));
        yield put(dayTransactionAction.dayTransactionInitializeFinish());
    } catch (e) {
        console.log(`[error][login][saga][initialize]>>> ${e}`);
    }
}

const arrayData = [
    {
        id: '0',
        value: 234,
        account: 'Cash',
        image: 'CASH',
        type: 'Food',
        description: 'Example for a description that will be add by the user',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '1',
        value: 67,
        account: 'CREDIT',
        image: 'CREDIT',
        type: 'Food',
        description: 'Example ',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '2',
        value: 8,
        account: 'CREDIT',
        image: 'CREDIT',
        type: 'Food',
        description: 'Example ',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '3',
        value: 12,
        account: 'Cash',
        image: 'CASH',
        type: 'Food',
        description: 'Example for a description that will be add by the user',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '4',
        value: 532,
        account: 'CREDIT',
        image: 'CREDIT',
        type: 'Food',
        description: 'Example ',
        date: moment().format('DD-MM-YYYY').toString()
    },
    {
        id: '5',
        value: 586,
        account: 'Cash',
        image: 'CASH',
        type: 'Food',
        description: 'Example for a description that will be add by the user',
        date: moment().format('DD-MM-YYYY').toString()
    },
]

