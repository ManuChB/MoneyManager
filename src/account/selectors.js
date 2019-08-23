/*
 * Selector. The query depends by the state shape
 */
export const getAccounts = (state) => state.accountList.accountList;
export const getAccountListByType = (state) => state.accountList.accountListByType;
export const getBalanceInfo = (state) => state.accountList.accountsBalance;