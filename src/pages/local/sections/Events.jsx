import React from 'react'

const Events = () => {
  const req = [{
    alertType: 1,
    ceco: 510,
    fecha: new Date('03/02/2023 18:03:44'),
    lugar: 'Sector Panadería',
    desc: 'Fuego en maquinaria',
    estado: 1
  }, {
    alertType: 6,
    ceco: 510,
    fecha: new Date('05/02/2023 11:20:40'),
    lugar: 'Sector Fiambrería',
    desc: 'Incidente islas de frio fiambreria',
    estado: 0
  }
  ]

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

  const switchColorAlert = (alertType) => {
    switch (alertType) {
      case 1:
        return 'bg-red-600'
      case 2:
        return 'bg-blue-700'
      case 3:
        return 'bg-amber-400'
      case 4:
        return 'bg-lime-500'
      case 5:
        return 'bg-gray-100'
      case 6:
        return 'bg-blue-400'
    }
  }

  return (
    <div className='w-full min-h-screen grid place-items-center'>
      <div className="rounded-xl bg-slate-700 h-[90%] w-[90%] p-6 drop-shadow-lg shadow-white ">
        <h2 className='text-4xl pl-3'>Eventos</h2>
        <div>
          {
            req.map((alert) => {
              return (
                <div key={alert.alertType + alert.fecha} className='mt-4 min-w-full border-b py-4'>
                  <div className="relative flex flex-row ">
                    <div className=''>
                      <span className={`absolute pt-14 w-3 h-3 mt-5 ml-3 ${switchColorAlert(alert.alertType)} rounded-full`}></span>
                      {(alert.estado === 1) ? <span className={`absolute pt-14 w-3 h-3 mt-5 ml-3 ${switchColorAlert(alert.alertType)} animate-ping rounded-full`}></span> : ''}
                    </div>
                    <div className='pl-12'>
                      <p className='text-md'>Estado: <span className={`${(alert.estado === 1) ? 'text-red-600' : ''} text-sm font-bold`}>{(alert.estado === 1) ? 'ACTIVO' : 'CERRADO'}</span></p>
                      <p className=''><b className='text-md'>Tipo:</b> {switchType(alert.alertType)}</p>
                      <p><b className='text-md'>Fecha:</b> {alert.fecha.toLocaleString("es-ES")}</p>
                      <p><b className='text-md'>Lugar:</b> {alert.lugar}</p>
                      <p><b className='text-md'>Descripcion:</b> {alert.desc}</p>
                    </div>
                    {(alert.estado === 1) ?
                      <button className='absolute left-3/4 top-6 bg-transparent 
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