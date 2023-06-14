import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineInfo } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import PageLoader from '../../../components/loader/PageLoader'
import { closeLocalEvents, fetchLocalEvents } from '../../../state/slices/viewsSlice'
import { BiLoaderAlt } from 'react-icons/bi';
import { fetchMarkers } from '../../../state/thunks/fetchMarkers'

const Events = () => {
  const { ceco } = useSelector(state => state.views.local.data[0])
  const events = useSelector(state => state.views.events?.data)
  const userRut = useSelector(state => state.auth.rut);
  const dispatch = useDispatch()

  const [dataFetched, setDataFetched] = useState(false)
  const [sortedEvents, setSortedEvents] = useState([]);
  const [alertsTypes, setAlertsTypes] = useState([])
  const [hoverInfo, setHoverInfo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadClose, setLoadClose] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState(null);
  const navigate = useNavigate();

  const switchType = (elem) => {
    switch (elem) {
      case 1:
        return 'Amago de incendio'
      case 2:
        return 'Caída de frio'
      case 3:
        return 'Caída por trabajos en Altura'
      case 4:
        return 'Corte de Electricidad'
      case 5:
        return 'Corte de Agua'
      case 6:
        return 'Generador con Falla'
      case 7:
        return 'Vandalísmo'
      case 8:
        return 'Fuga de gas/olor a gas'
      case 9:
        return 'Filtración de agua mayor'
      case 10:
        return 'Problemas por lluvia'
    }
  }

  const switchColorAlert = (type_id) => {
    switch (type_id) {
      case 1:
        return { bg: 'bg-red-600', ctr: 'bg-red-800' }
      case 2:
        return { bg: 'bg-blue-400', ctr: 'bg-blue-700' }
      case 3:
        return { bg: 'bg-orange-500', ctr: 'bg-orange-800' }
      case 4:
        return { bg: 'bg-purple-500', ctr: 'bg-purple-800' }
      case 5:
        return { bg: 'bg-indigo-500', ctr: 'bg-indigo-800' }
      case 6:
        return { bg: 'bg-green-500', ctr: 'bg-green-800' }
      case 7:
        return { bg: 'bg-pink-600', ctr: 'bg-pink-800' }
      case 8:
        return { bg: 'bg-red-300', ctr: 'bg-red-600' }
      case 9:
        return { bg: 'bg-indigo-700', ctr: 'bg-indigo-900' }
      case 10:
        return { bg: 'bg-blue-600', ctr: 'bg-blue-800' }

    }
  }

  useEffect(() => {
    setLoadClose(false);
    setSelectedEventId(null); // actualizar el ID del evento seleccionado
  }, [])


  useEffect(() => {
    if (events) {
      const sorted = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
      setSortedEvents(sorted);
    }
  }, [events]);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchLocalEvents(ceco)).then((data) => {
        axios.get(`https://smu-api.herokuapp.com/api/alert/types`).then((resp) => {
          //console.log('Response from AlertsTypes:', resp.data.data)
          setAlertsTypes(resp.data.data)
          setDataFetched(true)
          setLoading(false)
        });
      })
    }

    return () => { }
  }, [])

  const handleCloseAlert = (id, ceco) => {
    // console.log('Data to close event:', id, ceco);
    setLoadClose(true);
    setSelectedEventId(id); // actualizar el ID del evento seleccionado
    dispatch(closeLocalEvents({ id, ceco })).then(() => {
      dispatch(fetchLocalEvents(ceco));
      dispatch(fetchMarkers(userRut))
    })
  };

  const handleAddEvent = () => {
    navigate('/sendEvent')
  }

  const handleHoverInfo = () => {
    setHoverInfo(!hoverInfo)
  }

  function leftRandomArbitrary(max) {
    const theRandom = Math.floor(Math.random() * max);
    // console.log('[The Random]:', 'left-' + theRandom)
    return (' ' + 'left-' + theRandom + ' ');
  }

  const dateAdapter = fecha => {
    const fechaToDate = new Date(fecha)
      .toLocaleString("en-CL")
    //console.log('[Fecha]:', fechaToDate)
    return fechaToDate
  }

  const handleScroll = (e) => {
    console.log("Scrolled");
  };

  return (
    <>
      <PageLoader show={loading ? true : false} />
      <div className={`min-h-full h-full w-screen pr-4 py-8 md:pl-36 md:pt-5 flex flex-col bg-neutral-900/95`}>
        <h2 className='text-4xl w-full mt-5 mb-8'>Eventos latentes</h2>
        <div onClick={handleHoverInfo} className={`fixed top-20 right-0 py-2 z-50 m-5 cursor-pointer h-auto ${hoverInfo ? 'rounded-sm w-auto px-6 bg-slate-700' : 'rounded-full h-10 w-10 grid place-items-center bg-orange-400'}`}>
          {hoverInfo ?
            (
              <div>
                {alertsTypes.map(type => {
                  return (
                    <div key={type.id} className='py-2 flex items-center gap-3'>
                      <div className={`${switchColorAlert(type.id).bg} h-1 w-5`}></div>
                      <span>{type.type}</span>
                    </div>
                  )
                })}
                <button className={`h-12 w-32 md:w-24 my-5 bg-slate-800 text-red-50 font-semibold`} onClick={handleHoverInfo}>Cerrar</button>
              </div>
            )
            :
            (
              <AiOutlineInfo />
            )
          }
        </div>
        <button onClick={handleAddEvent}
          className='fixed rounded-full h-10 w-10 bg-orange-400 right-0 bottom-0 m-5 z-50 grid place-items-center hover:drop-shadow-md shadow-orange-500 hover:bg-orange-500 transition-all duration-150'>
          +
        </button>

        <div className={`flex flex-col gap-y-8`}>
          {events && events.map((alert, i) => {
            return (
              <div key={i} className={`rounded-lg min-h-96 w-72 md:w-[90%] overflow-hidden`}>
                <div className={`flex flex-col gap-5 md:flex-row h-full w-full`}>
                  <div className={`w-full`}>
                    <div className={`${switchColorAlert(alert.type_id).ctr}`}>
                      <div className={`rounded-t-lg ${alert.estado ? 'animate-fastPulse' : ''} ${switchColorAlert(alert.type_id).bg}`}>
                        <div className={` min-h-16 flex items-center px-4 md:px-6`}>
                          <span className={`text-xl py-4`}>{switchType(alert.type_id)}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`flex flex-col gap-y-5 w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900 p-4 md:p-6`}>
                      <p className=''> <b> Estado:</b>
                        <span className={`${(alert.estado === 1) ? 'text-red-600' : ''} text-sm font-bold`}>
                          &nbsp;{(alert.estado === 1) ? 'ACTIVO' : 'CERRADO'}
                        </span>
                      </p>
                      <p className={`font-bold`}>
                        Fecha:
                        <span className={``}>&nbsp;{
                          dateAdapter(alert.date)
                        }</span>
                      </p>

                      {alert.detalle && alert.detalle.map((detalle, j) => {
                        return (
                          <div key={j} className={`flex flex-col md:flex-row font-bold gap-x-5 w-full`}>
                            {detalle.olorQuemado ? (<span>Hay olor a quemado</span>) : ''}
                            {detalle.llamaLatente ? (<span>Llama latente</span>) : ''}
                            {detalle.alarmaHumo ? (<span>Alarma de humo activada</span>) : ''}
                            {detalle.avisoBomberos ? (<span>Avisado a bomberos</span>) : ''}

                            {detalle.avisoUrgencias ? (<span>Se avisó a urgencias</span>) : ''}
                            {detalle.personal ? (<span>{detalle.personal === 1 ? 'Personal de equipo interno' : 'Personal de proveedor'} afectado</span>) : ''}
                            {detalle.consiente ? (<span>Paciente {detalle.consiente === 3 ? 'conciente' : 'inconciente'}</span>) : ''}

                            {
                              detalle.altura ? (<span>Caida de {detalle.altura === 5
                                ? '1,8mts a 5mts'
                                : detalle.altura === 6
                                  ? '5mts a 10mts'
                                  : detalle.altura === 7
                                    ? 'Más de 10mts'
                                    : ''
                              }
                              </span>) : ''
                            }

                            {detalle.fractura ? (<span>{detalle.fractura === 8 ? 'Presenta fractura' : 'No presenta fractura'}</span>) : ''}
                            {detalle.autorizado ? (<span>{detalle.autorizado === 10 ? 'Trabajo estaba autorizado' : 'Trabajo no estaba autorizado'}</span>) : ''}

                            {alert.estadoLocal_id ? (<span>{alert.estadoLocal_id === 1
                              ? 'Local abierto'
                              : alert.estadoLocal_id === 2
                                ? 'Local cerrado'
                                : alert.estadoLocal_id === 3
                                  ? 'Local fuera de servicio'
                                  : alert.estadoLocal_id === 4
                                    ? 'Local cerrado permanentemente' : ''
                            }
                            </span>) : ''}
                          </div>
                        )
                      })}

                      {alert.description && (
                        <div>
                          <p>Descripción:</p>
                          <p>{alert.description}</p>
                        </div>
                      )
                      }

                      <div className={`w-full grid place-items-end`}>
                        {(alert.estado === 1) ?
                          (
                            <button
                              onClick={() => {
                                handleCloseAlert(alert.id, alert.ceco);
                              }}
                              className={`${switchColorAlert(alert.type_id).bg} grid place-items-center h-8 w-24 md:h-12 md:w-32 text-red-50 font-semibold hover:text-red-100 hover:border-transparent rounded active:duration-75 transition-all`}
                            >
                              {(loadClose && alert.id === selectedEventId) ? <BiLoaderAlt className={`animate-spin h-6 w-6`} /> : ('Cerrar')}
                            </button>
                          )
                          : (null)
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          }
          {(events && events.length === 0) ? 
            (<p> No existen eventos para el local </p>)
            :
            ('')
          }
        </div>
      </div>
    </>
  )
}

export default Events