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
import { setInfo } from '../../state/slices/localsSlice';
import FilterSideBar from '../../components/filterSideBar/FilterSideBar';
import Loader from '../../components/loader/Loader';
import { fetchMarkers } from '../../state/thunks/fetchMarkers';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsYW54Y2UiLCJhIjoiY2xjbTZucGZ5M2tlYTNvcDR6amhwbTh1eCJ9.wFC-K6LRK1r__17CIt_ypw'


const Map = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.locals.info.geoJson);

  const navigate = useNavigate();
  const mapContainer = useRef(null);

  //const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  const filters = {
    localType: useSelector(state => state.locals.selectedFormat),
    events: useSelector(state => state.locals.selectedEvent),
    jefeSuper: useSelector(state => state.locals.selectedJefeSuper),
    super: useSelector(state => state.locals.selectedSuper),
    admin: useSelector(state => state.locals.selectedAdmin)
  };

  const user = useSelector((state) => {
    if (state.auth) {
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
    if (markers) {
      const jump = markers.data.features.find((elem) => elem)
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/balanxce/clct3r28c000314n7kkbug9o9',
        center: jump.geometry.coordinates,
        zoom: 14
      })

      const filteredFeatures = markers.data.features.filter((feature) => {
        return (
          (filters.localType === "" || feature.properties.localType === filters.localType) &&
          (filters.events === "" || feature.properties.alert === parseInt(filters.events)) &&
          (filters.jefeSuper === "" || feature.properties.jefeSuper_rut === filters.jefeSuper) &&
          (filters.super === "" || feature.properties.supervisor_rut === filters.super) &&
          (filters.admin === "" || feature.properties.administrador_rut === filters.admin)
        );
      });

      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

      map.on("load", () => {
        filteredFeatures.forEach((feature) => {
          if (filters.localType === "" || filters.localType === feature.properties.localType) {
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

            // En el bucle forEach que crea los marcadores, agregue el evento de mouseover
            const marker = new mapboxgl.Marker(ref.current)
              .setLngLat(feature.geometry.coordinates)
              .addTo(map);

            // Agregue el evento de mouseover al marcador
            const popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
            }).setLngLat(feature.geometry.coordinates)
              .setHTML(`
                <div>
                    <h1 class='text-base font-medium'>${feature.properties.name} #${feature.properties.ceco}</h1>
                    <p class='text-xs font-light'>${feature.properties.address}, ${feature.properties.region}</p>
                </div>
              `);

            marker.getElement().addEventListener('mouseover', () => popup.addTo(map));
            marker.getElement().addEventListener('mouseleave', () => popup.remove());
          }
        })
      })

      map.on('idle', () => {
        setLoading(false)
      })

      // Clean up on unmount
      return () => map.remove();
    }
  }, [markers, filters])

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