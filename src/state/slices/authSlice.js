import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    rut: null,
    role: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.rut = action.payload.rut
            state.role = action.payload.role
        },
        setAuthLogout: () => initialState
    }
})

export const { setMode, setLogin, setAuthLogout, setLocals } = authSlice.actions

export default authSlice.reducer