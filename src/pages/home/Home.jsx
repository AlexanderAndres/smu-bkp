import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'
import { createRoot } from 'react-dom/client';
import { useDispatch, useSelector } from "react-redux"
import Marker from '../../components/marker/Marker'

import './map.css'

import MarkerUnimarc from '../../assets/svgs/Markers/MarkerUnimarc';
import MarkerAlvi from '../../assets/svgs/Markers/MarkerAlvi';
import MarkerSuper10 from '../../assets/svgs/Markers/MarkerSuper10';
import MarkerMay10 from '../../assets/svgs/Markers/MarkerMay10';
import { useNavigate } from 'react-router-dom';
import { fetchMarkers, setGeoJson } from '../../state/slices/localsSlice';
import FilterSideBar from '../../components/filterSideBar/FilterSideBar';
import Loader from '../../components/loader/Loader';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsYW54Y2UiLCJhIjoiY2xjbTZucGZ5M2tlYTNvcDR6amhwbTh1eCJ9.wFC-K6LRK1r__17CIt_ypw'


const Map = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.locals.geoJson);

  const navigate = useNavigate();
  const mapContainer = useRef(null);

  // Local state
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => {
    if (state.auth) {
      //console.log('State in newMap', state.auth)
      return state.auth
    }
  })

  useEffect(() => {
    if (!user.rut) {
      navigate('/')
    }
    return () => { }
  }, [])

  useEffect(() => {
    if (!dataFetched) {
      //console.log('RUT SEND TO fetch markers', user.rut)
      dispatch(
        fetchMarkers(user.rut)
      ).then((data) => {
        //console.log('Data from fetch markers', data)
        dispatch(setGeoJson(data.payload));
      })
      setDataFetched(true)
    }
  }, [dispatch, dataFetched, markers]);

  useEffect(() => {
    //console.log('UseEffect')

    if (dataFetched) {
      //console.log('Markers:', markers)
      const jump = markers.data.features.find((elem) => elem)
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/balanxce/clct3r28c000314n7kkbug9o9',
        center: jump.geometry.coordinates,
        zoom: 14
      })

      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

      map.on("load", () => {
        markers.data.features.forEach((feature) => {
          // Create a React ref
          const ref = React.createRef();
          // Create a new DOM node and save it to the React ref
          ref.current = document.createElement("div");
          // Render a Marker Component on our new DOM node
          // Create a root.
          //console.log('Local type:', feature.properties.localType)
          const root = createRoot(ref.current)
          switch (feature.properties.localType) {
            case 'UNI':
              root.render(
                <Marker onClick={() => markerClicked(feature.properties.ceco)} feature={feature} >
                  <MarkerUnimarc className={(feature.properties.alert == true) ? 'uniAlert' : ''} />
                </Marker>
              );
              break;
            case 'ALVI':
              root.render(
                <Marker onClick={() => markerClicked(feature.properties.ceco)} feature={feature} >
                  <MarkerAlvi className={(feature.properties.alert == true) ? 'alviAlert' : ''} />
                </Marker>
              );
              break;
            case 'M10':
              root.render(
                <Marker onClick={() => markerClicked(feature.properties.ceco)} feature={feature} >
                  <MarkerMay10 className={(feature.properties.alert == true) ? 'S10Alert' : ''} />
                </Marker>
              );
              break;
            case 'S10':
              root.render(
                <Marker onClick={() => markerClicked(feature.properties.ceco)} feature={feature} >
                  <MarkerSuper10 className={(feature.properties.alert == true) ? 'S10Alert' : ''} />
                </Marker>
              );
              break;
          }
          // Create a Mapbox Marker at our new DOM node
          new mapboxgl.Marker(ref.current).setLngLat(feature.geometry.coordinates).addTo(map);

          if (!map.getLayer('locations')) {
            map.addSource('locations', markers);
            // Add a layer showing the places.
            map.addLayer({
              'id': 'locations',
              'type': 'circle',
              'source': 'locations',
              'paint': {
                'circle-radius': 10,
                'circle-stroke-width': 0,
                'circle-color': '#ff0000'
              }
            });
          }


          // Create a popup, but don't add it to the map yet.
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,

          });

          map.on('mouseenter', 'locations', (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties;
            //console.log('desc-----',description)
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(
              ` <div class=''>
                    <h1 class='text-base font-medium'>${description.name} #${description.ceco}</h1>
                    <p class='text-xs font-normal'> ${description.address} </p>
                    <p class='text-xs font-normal'> ${description.city} </p>
                    <p class='text-xs font-normal'> ${description.region} </p>
                <div/>
            `).addTo(map);
          });

          map.on('mouseleave', 'locations', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
          })
        })
      })

      map.on('idle', () => {
        setLoading(false)
      })

      // Clean up on unmount
      return () => map.remove();
    }
  }, [markers])

  const markerClicked = (ceco) => {
    //console.log(`/local/${ceco}`)
    navigate(`/local/${ceco}/`)
  };

  return (
    <>
      <Loader show={loading ? true : false} />
      <div className='text-gray-800'>
        <FilterSideBar user={user} />
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  )
}

export default Map