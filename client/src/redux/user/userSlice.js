import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        singinStart: (state) => {
            state.error = null,
            state.loading = true
        },
        singinSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false
            state.error =null
        },
        singinFailuar: (state, action) => {
            state.error = action.payload,
            state.loading =false
        }
    }
})

export const { singinStart, singinSuccess, singinFailuar } = userSlice.actions

export default userSlice.reducer;