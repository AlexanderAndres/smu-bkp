import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMarkers = createAsyncThunk('locals/fetchMarkers', async (user) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/local/rut/${user}`)
        .then((resp) => {
            //console.log('[Data]:', resp.data.data)
            const uniqueUsers = {}
            resp.data.data.forEach(objeto => {
                objeto.usersInfo.forEach(usuario => {
                    if (!uniqueUsers[usuario.rut]) {
                        uniqueUsers[usuario.rut] = usuario;
                    }
                });
            });

            const geoJson = {
                'type': 'geojson',
                'data': {
                    "type": "FeatureCollection",
                    "features": []
                }
            }

            resp.data.data.forEach((local) => {
                geoJson.data.features.push({
                    "type": "Feature",
                    "properties": local,
                    "geometry": {
                        "coordinates": [
                            `${local.longitude}`,
                            `${local.latitude}`
                        ],
                        "type": "Point"
                    }
                });
            });

            console.log('[UniqueUsers]:', uniqueUsers)
            console.log('[Geojson]:', geoJson)
            //dispatch(setInfo({ geoJson, uniqueUsers }))
            return { geoJson, uniqueUsers }
        })
    return response
})