import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userid: "",
}

export const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    isLoggedIn: (state, action) => {
      state.userid = action.payload
    },
  },
})

export const selectUserProfile = (state) => state.userProfile

export const { isLoggedIn } = profileSlice.actions

export default profileSlice.reducer
