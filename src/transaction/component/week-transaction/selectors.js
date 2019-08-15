/*
 * Selector. The query depends by the state shape
 */
export const getTransactions = (state) => state.weekTransaction.transactions;
export const getCurrentWeekStart = (state) => state.weekTransaction.currentWeekStart;
export const getCurrentWeekEnd = (state) => state.weekTransaction.currentWeekEnd;
