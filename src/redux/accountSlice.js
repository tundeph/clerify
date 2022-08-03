import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  accounts: {},
  uncategorisedAccts: {},
}

export const accountSlice = createSlice({
  name: "userAccts",
  initialState,
  reducers: {
    getTransactions: (state, { payload }) => {
      state.accounts = payload.data
    },
    getUncategorisedTransactions: (state, { payload }) => {
      state.uncategorisedAccts = payload.data
    },
    updateUncategorised: (state, { payload }) => {
      state.uncategorisedAccts[payload.acctId][payload.acct] = payload.newlyCategorised
    },
  },
})

export const selectUserTransactions = (state) => state.userAccts.accounts
export const selectUncategorisedAccts = (state) => state.userAccts.uncategorisedAccts
// export const selectBusinessAccounts = (state, id) => state.userProfile.user.business[id].accts
// export const selectTransactionCategories = (state, id) => state.userProfile.user.business[id].categories

export const { getTransactions, getUncategorisedTransactions, updateUncategorised } = accountSlice.actions

export default accountSlice.reducer
