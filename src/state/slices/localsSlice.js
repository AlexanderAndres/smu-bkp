import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchMarkers } from '../thunks/fetchMarkers';


const initialState = {
    info: {},
    selectedFormat: '',
    selectedEvent: '',
    selectedGerente: '',
    selectedSubGerente: '',
    selectedJefeSuper: '',
    selectedSuper: '',
    selectedAdmin: '',
    status: 'idle',
    error: null,
}

export const localSlice = createSlice({
    name: 'locals',
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.info = action.payload;
        },
        setLocalsLoggout: () => initialState,
        setSelectedFormat: (state, action) => {
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedFormat = newValue
        },
        setSelectedEvent: (state, action) => {
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedEvent = newValue
        },
        setSelectedGerente: (state, action) => {
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedGerente = newValue
        },
        setSelectedSubGerente: (state, action) => {
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedSubGerente = newValue
        },
        setSelectedJefeSuper: (state, action) => {
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedJefeSuper = newValue
        },
        setSelectedSuper: (state, action) => {
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedSuper = newValue
        },
        setSelectedAdmin: (state, action) => {
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedAdmin = newValue
        },
    },
    extraReducers: {
        [fetchMarkers.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchMarkers.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.info = action.payload;
        },
        [fetchMarkers.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
})

export const { setInfo, setLocalsLoggout, setSelectedFormat, setSelectedEvent, setSelectedGerente, setSelectedSubGerente, setSelectedJefeSuper, setSelectedSuper, setSelectedAdmin } = localSlice.actions

export default localSlice.reducer