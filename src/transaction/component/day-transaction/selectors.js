/*
 * Selector. The query depends by the state shape
 */
export const getTransactions = (state) => state.dayTransaction.transactions;
export const getDayTransaction = (state) => state.dayTransaction.date;