import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeLocalEvents, fetchLocalEvents } from '../../../state/slices/viewsSlice'

const Events = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.views.events.data)
  //console.log('Event data:', data)

  const switchType = (elem) => {
    switch (elem) {
      case 1:
        return 'Fuego'
      case 2:
        return 'Corte de agua'
      case 3:
        return 'Corte de suministro electrico'
      case 4:
        return 'Caida de trabajos por alto'
      case 5:
        return 'Merma'
      case 6:
        return 'Frio'
    }
  }

  const switchColorAlert = (type_id) => {
    switch (type_id) {
      case 1:
        return 'bg-red-600'
      case 2:
        return 'bg-blue-700'
      case 3:
        return 'bg-amber-400'
      case 4:
        return 'bg-lime-400'
      case 5:
        return 'bg-gray-100'
      case 6:
        return 'bg-blue-400'
    }
  }

  useEffect(() => {
    console.log('info from data:', data)
  }, [])

  const handleCloseAlert = (id, ceco) => {
    console.log('Data to close event:', id, ceco)
    dispatch(closeLocalEvents({ id, ceco })).then(() => {
      dispatch(fetchLocalEvents(ceco))
    })
  }

  return (
    <div className='w-full min-h-screen grid place-items-center'>
      <div className="rounded-xl bg-slate-700 w-[95%] p-6 drop-shadow-lg shadow-white ">
        <h2 className='text-4xl pl-3'>Eventos</h2>
        <div>
          {
            data.map((alert) => {
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
  )
}

export default Events