import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  authIsReady: false,
  profileTheme: "lightTheme",
}

export const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    isLoggedIn: (state, { payload }) => {
      state.user = payload
    },
    authReady: (state, { payload }) => {
      state.user = payload.data
      state.selectedBusinessId = payload.selectedBusinessId
      state.authIsReady = true
    },
    updateBusinessCategory: (state, { payload }) => {
      state.user.business[payload.selectedBusinessId].categories = payload.data
    },
    logOut: () => {
      return { ...initialState, authIsReady: true }
    },
  },
})

export const selectUserProfile = (state) => state.userProfile
export const selectUserBusiness = (state) => state.userProfile.user.business
export const selectBusinessAccounts = (state, id) => state.userProfile.user.business[id].accts
export const selectTransactionCategories = (state, id) => state.userProfile.user.business[id].categories

export const { isLoggedIn, authReady, updateBusinessCategory, logOut } = profileSlice.actions

export default profileSlice.reducer
