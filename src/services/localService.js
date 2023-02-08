import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocalHeaders = () => async (user) => {
    try {
        await axios.get(`https://smu-api.herokuapp.com/api/local/rut/${user}`).then((data) => {
            //dispatch(setMarkers(data));
            const geoJson = {
                'type': 'geojson',
                'data': {
                    "type": "FeatureCollection",
                    "features": []
                }
            }

            data.data.data.forEach((local) => {
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
            //console.log('geoJson:', geoJson)
            //console.log('Locals Fetch:', data)
            setDataFetched(true)
            return geoJson
        }).catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error);
        return error
    }
};

/*

export const fetchLocalArc = createAsyncThunk('local/getArc', async (local) => {
    const response = await axios.get(`https://smu-api.herokuapp.com/api/view1/${local}`).then((data) => {
        //console.log('From fetch arc', data)
        return data
    }).catch((err) => {
        console.log(err)
    })
    return response
})

*/