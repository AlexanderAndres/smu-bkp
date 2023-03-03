import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchMarkers } from '../thunks/fetchMarkers';


const initialState = {
    info: {},
    selectedFormat: '',
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
        setLocalsLoggout: (state) => {
            state.locals = []
            state.geoJson = {}
            state.arquitectura = {}
            state.fire = {}
        },
        setSelectedFormat: (state, action) => {
            console.log('[Action payload]', action.payload)
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedFormat = newValue
        },
        setSelectedJefeSuper: (state, action) => {
            console.log('[Action payload]', action.payload)
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedJefeSuper = newValue
        },
        setSelectedSuper: (state, action) => {
            console.log('[Action payload]', action.payload)
            const newValue = action.payload === '<empty string>' ? '' : action.payload;
            state.selectedSuper = newValue
        },
        setSelectedAdmin: (state, action) => {
            console.log('[Action payload]', action.payload)
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

export const filterGeoJson = ({ user, format }) => (dispatch) => {
    console.log('User:', user, 'Format:', format)
    //dispatch(setSelectedFormat(format));
    axios.get(`https://smu-api.herokuapp.com/api/local/rut/${user}`).then((resp) => {
        console.log('Response from filter:', resp.data.data)
        //console.log('Response from filter: alvi', resp.data.data.filter((obj) => obj.localType === format))
    });
};

export const { setInfo, setLocalsLoggout, setSelectedFormat, setSelectedJefeSuper, setSelectedSuper, setSelectedAdmin } = localSlice.actions

export default localSlice.reducer