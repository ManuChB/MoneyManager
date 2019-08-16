/*
 * Selector. The query depends by the state shape
 */
export const getTransactions = (state) => state.monthTransaction.transactions;
export const getCurrentMonthStart = (state) => state.monthTransaction.currentMonthStart;
export const getCurrentMonthEnd = (state) => state.monthTransaction.currentMonthEnd;
