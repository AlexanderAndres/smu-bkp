import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import PageLoader from '../../../components/loader/PageLoader'
import { closeLocalEvents, fetchLocalEvents } from '../../../state/slices/viewsSlice'

const Events = () => {
  const dispatch = useDispatch()
  const { ceco } = useSelector(state => state.views.local.data[0])
  const events = useSelector(state => state.views.events.data)

  const [dataFetched, setDataFetched] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alertsTypes, setAlertsTypes] = useState([])

  const navigate = useNavigate();

  const switchType = (elem) => {
    switch (elem) {
      case 1:
        return 'Amago de incendio'
      case 2:
        return 'Caída de frio, mural'
      case 3:
        return 'Caída de frio, Central de Media Temperatura'
      case 4:
        return 'Caída de frio, Central de Baja Temperatura'
      case 5:
        return 'Caída por trabajos en Altura'
      case 6:
        return 'Corte de Electricidad'
      case 7:
        return 'Corte de Agua'
      case 8:
        return 'Generador con Falla'
      case 9:
        return 'Vandalísmo'
      case 10:
        return 'Fuga de gas'
      case 11:
        return 'Filtración de agua'
    }
  }

  const switchColorAlert = (type_id) => {
    switch (type_id) {
      case 1:
        return 'bg-red-600'
      case 2:
        return 'bg-blue-500'
      case 3:
        return 'bg-blue-800'
      case 4:
        return 'bg-blue-700'
      case 5:
        return 'bg-gray-50'
      case 6:
        return 'bg-orange-300'
      case 7:
        return 'bg-blue-700'
      case 8:
        return 'bg-orange-400'
      case 9:
        return 'bg-yellow-900'
      case 10:
        return 'bg-red-400'
      case 11:
        return 'bg-blue-300'
    }
  }

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
    console.log('Data to close event:', id, ceco)
    dispatch(closeLocalEvents({ id, ceco })).then(() => {
      dispatch(fetchLocalEvents(ceco))
    })
  }

  const handleAddEvent = () => {
    navigate('/sendEvent')
  }

  return (
    <>
      <PageLoader show={loading ? true : false} />
      <div className='w-full min-h-screen grid place-items-center'>
        <div className='fixed top-0 right-0 rounded-sm bg-gray-700 m-5 w-auto h-auto py-2 px-6 z-50'>
          {
            alertsTypes.map(type => {
              return (
                <div className='py-2 flex items-center gap-3'>
                  <span key={type.id}>{type.type}</span>
                  <div className={`${switchColorAlert(type.id)} h-1 w-5`}></div>
                </div>
              )
            })
          }
        </div>
        <button onClick={handleAddEvent}
          className='fixed rounded-full h-10 w-10 bg-orange-400 right-0 bottom-0 m-5 z-50 grid place-items-center hover:drop-shadow-md shadow-orange-500 hover:bg-orange-500 transition-all duration-150'> + </button>
        <div className="bg-slate-800 w-full p-6 drop-shadow-lg shadow-white ">
          <h2 className='text-4xl pl-3'>Eventos</h2>
          <div>
            {events && events.map((alert) => {
              return (
                <div key={alert.id} className='mt-4 min-w-full border-b py-4'>
                  <div className="relative flex flex-row ">
                    <div className=''>
                      <span className={`absolute pt-14 w-3 h-3 mt-5 ml-3 ${switchColorAlert(alert.type_id)} rounded-full`}></span>
                      {(alert.estado === 1) ? <span className={`absolute pt-14 w-3 h-3 mt-5 ml-3 ${switchColorAlert(alert.type_id)} animate-ping rounded-full`}></span> : ''}
                    </div>
                    <div className='pl-12 pr-5'>
                      <p className='text-md'>Estado: <span className={`${(alert.estado === 1) ? 'text-red-600' : ''} text-sm font-bold`}>{(alert.estado === 1) ? 'ACTIVO' : 'CERRADO'}</span></p>
                      <p><b className='text-md'>Fecha:</b> {new Date(alert.date).toLocaleString("es-ES")}</p>
                      <p className=''><b className='text-md'>Tipo:</b> {switchType(alert.type_id)}</p>
                      <p><b className='text-md'>Daños:</b> {(alert.danos === 1) ? 'SI' : 'NO'}</p>
                      <p><b className='text-md'>Detenidos:</b> {(alert.detenidos === 1) ? 'SI' : 'NO'}</p>
                      <p><b className='text-md'>Robo:</b> {(alert.robo === 1) ? 'SI' : 'NO'}</p>
                      <p><b className='text-md'>Intento de robo:</b> {(alert.intentoRobo === 1) ? 'SI' : 'NO'}</p>
                      <p><b className='text-md'>Personal lesionado:</b> {(alert.personalLesionado === 1) ? 'SI' : 'NO'}</p>
                      <br />
                      <p><b className='text-md'>Descripcion:</b> {alert.description}</p>
                    </div>
                    {(alert.estado === 1) ?
                      <button
                        onClick={() => handleCloseAlert(alert.id, alert.ceco)}
                        className='absolute right-5 top-0 bg-transparent 
                      hover:bg-red-600 text-red-500 font-semibold 
                      hover:text-red-50 py-2 px-4 border border-red-500
                      hover:border-transparent rounded
                      active:duration-75 transition-all '>
                        Cerrar
                      </button>
                      : ''
                    }

                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Events