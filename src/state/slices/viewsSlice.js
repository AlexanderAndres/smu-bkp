import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { loadAbort } from '../../utilities/load-abort'

const initialState = {
    loading: false,
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
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setViewsLogout: () => initialState
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
                // console.log('Fire Payload:', action.payload)
                state.incendios = action.payload
            })
            .addCase(fetchLocalMantenaince.fulfilled, (state, action) => {
                state.mantencion = action.payload
            })
            .addCase(downloadMantenaince.fulfilled, (state) => {
                // console.log('Pasó por download')
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
            .addCase(fetchLocalClimat.fulfilled, (state, action) => {
                state.climatizacion = action.payload
            })
            .addCase(fetchLocalFoodCooling.fulfilled, (state, action) => {
                state.frio_alimentario = action.payload
            })
            .addCase(fetchCortina.fulfilled, (state, action) => {
                state.cortina_metalica = action.payload
            })
            .addCase(editFoodCooling.fulfilled, (state, action) => {
                state.frio_alimentario = { ...state.events }
            })
        /*
        .addCase(fetchLocalClimatizacion.fulfilled, (state, action) => {
            state.climatizacion = action.payload
        })
        */
    }
})

export const { setMode, setLogin, setViewsLogout, setLoading, setLocals } = viewsSlice.actions

export default viewsSlice.reducer

export const fetchLocal = createAsyncThunk('local/getLocal', async (local) => {
    // console.log('Aquí está el fetch')
    const controller = loadAbort
    const response = await axios.get(`https://smu-api.herokuapp.com/api/local/${local}`, { signal: controller.signal }, controller).then((data) => {
        // console.log('From fetch GetLocal', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})
export const fetchLocalEvents = createAsyncThunk('local/getLocalEvents', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/alert/${local}`).then((data) => {
        // console.log('From fetchLocal Events', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})
export const closeLocalEvents = createAsyncThunk('local/closeEvent', async (data) => {
    const { id, ceco } = data
    //console.log('Data in slice:', id, ceco)
    const response = await axios.post(`https://smu-api.herokuapp.com/api/alert/${id}/${ceco}`).then((data) => {
        //console.log('Get close alert', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})

export const editFoodCooling = createAsyncThunk('foodCooling/edit', async (data) => {
    // console.log('Data in slice:', 'ID:', data.id, 'DATA:', data.info)
    const response = await axios.put(`https://smu-api.herokuapp.com/api/view7/upd/${data.id}`, data.info).then((data) => {
        //console.log('Get close alert', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
})

export const openLocalEvent = createAsyncThunk('local/openEvent', async (EventDetailObject) => {
    const headers = {
        "Content-Type": "multipart/form-data"
    };

    const formData = new FormData();

    for (let key in EventDetailObject) {
        const value = EventDetailObject[key];
        if (Array.isArray(value) || typeof value === "object") {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, value);
        }
    }

    console.log('[FormData]:', formData)

    const response = await axios.post(`https://smu-api.herokuapp.com/api/alert`, formData, { headers })
        .then((data) => {
            console.log('POST alert', data.data);
            return data.data;
        }).catch((err) => {
            console.log(err);
        });

    return response;
});





export const fetchLocalArc = createAsyncThunk('local/getArc', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view1/${local}`).then((data) => {
        console.log('From fetch arc', data.data)
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
export const fetchLocalClimat = createAsyncThunk('local/getClim', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view6/${local}`).then((data) => {
        //console.log('From fetch arc', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
}
)
export const fetchLocalFoodCooling = createAsyncThunk('local/getFoofCoo', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view7/${local}`).then((data) => {
        console.log('[From food cooling]', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
}
)
export const fetchCortina = createAsyncThunk('local/getCortina', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view8/${local}`).then((data) => {
        //console.log('From fetch arc', data.data)
        return data.data
    }).catch((err) => {
        console.log(err)
    })
    return response
}
)