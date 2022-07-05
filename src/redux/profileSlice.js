import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  authIsReady: true,
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
      state.user = payload
      state.authIsReady = true
    },
    logOut: () => {
      return { ...initialState, authIsReady: true }
    },
  },
})

export const selectUserProfile = (state) => state.userProfile

export const { isLoggedIn, authReady, logOut } = profileSlice.actions

export default profileSlice.reducer
