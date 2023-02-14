import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { loadAbort } from '../../utilities/load-abort'

const initialState = {
    local: {},
    events: {},
    arquitectura: {},
    incendios: {},
    mantencion: {},
    iluminacion: {},
    cubierta: {},
    climatizacion: {},
    frio_alimentario: {},
    cortina_metalica: {},
    sistema_electrico: {},
    generacion_electrica: {},
    gases_refrigerantes: {}
}

export const viewsSlice = createSlice({
    name: 'views',
    initialState,
    reducers: {
        setViewsLogout: (state) => {
            state.local = {}
            state.events = {}
            state.arquitectura = {}
            state.incendios = {}
            state.mantencion = {}
            state.iluminacion = {}
            state.cubierta = {}
            state.climatizacion = {}
            state.frio_alimentario = {}
            state.cortina_metalica = {}
            state.sistema_electrico = {}
            state.generacion_electrica = {}
            state.gases_refrigerantes = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocalEvents.fulfilled, (state, action) => {
                state.events = action.payload
            })
            .addCase(fetchLocal.fulfilled, (state, action) => {
                state.local = action.payload
            })
            .addCase(fetchLocalArc.fulfilled, (state, action) => {
                state.arquitectura = action.payload
            })
            .addCase(fetchLocalFire.fulfilled, (state, action) => {
                state.incendios = action.payload
            })
            .addCase(fetchLocalMantenaince.fulfilled, (state, action) => {
                state.mantencion = action.payload
            })
            .addCase(downloadMantenaince.fulfilled, (state) => {
                console.log('Pasó por download')
            })
            .addCase(fetchLocalIluminacion.fulfilled, (state, action) => {
                state.iluminacion = action.payload
            })
            .addCase(fetchLocalCubierta.fulfilled, (state, action) => {
                state.cubierta = action.payload
            })
            .addCase(closeLocalEvents.fulfilled, (state) => {
                state.events = { ...state.events }
            })
            .addCase(openLocalEvent.fulfilled, (state) => {
                state.events = { ...state.events }
            })
        /*
        .addCase(fetchLocalClimatizacion.fulfilled, (state, action) => {
            state.climatizacion = action.payload
        })
        */
    }
})

export const { setMode, setLogin, setViewsLogout, setLocals } = viewsSlice.actions

export default viewsSlice.reducer

export const fetchLocal = createAsyncThunk('local/getLocal', async (local) => {
    const controller = loadAbort
    const response = await axios.get(`https://smu-api.herokuapp.com/api/local/${local}`, { signal: controller.signal }, controller).then((data) => {
        console.log('From fetch GetLocal', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})
export const fetchLocalEvents = createAsyncThunk('local/getLocalEvents', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/alert/${local}`).then((data) => {
        console.log('From fetchLocalEvents', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})
export const closeLocalEvents = createAsyncThunk('local/closeEvent', async (data) => {
    const { id, ceco } = data
    console.log('Data in slice:', id, ceco)
    const response = await axios.post(`https://smu-api.herokuapp.com/api/alert/${id}/${ceco}`).then((data) => {
        console.log('Get close alert', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})
export const openLocalEvent = createAsyncThunk('local/openEvent', async (data) => {
    const { ceco, type_id, estadoLocal_id, estado, descripcion, personalLesionado, intentoRobo, robo, detenidos, danos } = data
    //console.log('Contenido DATA', data)
    //console.log('Form Data', formData)
    const formData = new FormData();

    formData.append('ceco', ceco);
    formData.append('type_id', type_id);
    formData.append('estadoLocal_id', estadoLocal_id);
    formData.append('estado', estado);
    formData.append('description', descripcion);
    formData.append('personalLesionado', personalLesionado);
    formData.append('intentoRobo', intentoRobo);
    formData.append('robo', robo);
    formData.append('detenidos', detenidos);
    formData.append('danos', danos);

    const response = await axios.post(`https://smu-api.herokuapp.com/api/alert`, formData, {
        Headers: { "Content-Type": "multipart/form-data" }
    }).then((data) => {
        console.log('POST alert', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})
export const fetchLocalArc = createAsyncThunk('local/getArc', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view1/${local}`).then((data) => {
        //console.log('From fetch arc', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})

export const fetchLocalFire = createAsyncThunk('local/getFire', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view2/${local}`).then((data) => {
        //console.log('From fetch arc', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})

export const fetchLocalMantenaince = createAsyncThunk('local/getMantenaince', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view3/${local}`).then((data) => {
        //console.log('From fetch arc', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})

export const downloadMantenaince = createAsyncThunk('local/downloadMantenaince', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view3/download/${local}`).then((data) => {
        console.log('From download', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})

export const fetchLocalIluminacion = createAsyncThunk('local/getLight', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view4/${local}`).then((data) => {
        //console.log('From fetch arc', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})

export const fetchLocalCubierta = createAsyncThunk('local/getRoof', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view5/${local}`).then((data) => {
        //console.log('From fetch arc', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
}
)
/*
export const fetchLocalClimatizacion = createAsyncThunk('local/getRoof', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view6/${local}`).then((data) => {
        //console.log('From fetch arc', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})
*/