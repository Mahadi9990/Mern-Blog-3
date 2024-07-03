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
        singInStart: (state) => {
            state.error = null,
            state.loading = true
        },
        singInSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false
            state.error =null
        },
        singInFailuar: (state, action) => {
            state.error = action.payload,
            state.loading =false
        },
        updateStart: (state) => {
            state.error = null,
            state.loading = true
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false
            state.error =null
        },
        updateFailuar: (state, action) => {
            state.error = action.payload,
            state.loading =false
        },
        deleteUserStart: (state) => {
            state.error = null,
            state.loading = true
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null,
            state.loading = false
            state.error =null
        },
        deleteUserFailuar: (state, action) => {
            state.error = action.payload,
            state.loading =false
        }
    }
})

export const {
    singInStart,
    singInSuccess,
    singInFailuar,
    updateStart,
    updateSuccess,
    updateFailuar,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailuar
} = userSlice.actions

export default userSlice.reducer;