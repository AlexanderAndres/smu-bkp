import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/loader/Loader'
import PageLoader from '../../../components/loader/PageLoader'
import { fetchLocalFire } from '../../../state/slices/viewsSlice'

const Fire = () => {

    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState({})

    const [dataFetched, setDataFetched] = useState(false)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const data = useSelector((state) => state.views.incendios)

    const { ceco } = useSelector(state => state.views.local.data[0])
    useEffect(() => {
        if (!dataFetched) {
            dispatch(fetchLocalFire(ceco)).then((data) => {
                setDataFetched(true)
                setLoading(false)
            })
        }

        return () => { }
    }, [])

    const handleModal = (img) => {
        setModal(img)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setModal({})
    }

    if (loading || !data) {
        return <PageLoader show={loading ? true : false} />
    }

    return (
        <div className={`min-h-full h-full w-full pl-24 pr-4 pt-4 md:pl-28 md:pt-5 flex flex-col md:flex-row gap-4`}>
            <div className={`relative h-[50%] md:h-[97.5%] md:w-[50%] bg-cyan-600 rounded-lg overflow-hidden`}>
                <div className="h-full w-full">
                    <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src={data.data[0].estanque} alt="" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 opacity-40 z-10"></div>
                <h2 className="absolute z-20 p-4 text-3xl font-semibold uppercase">Sistema de extincion de incendio</h2>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                    <p className=''><b>Autonomia</b> {data.data[0].tiempoAutonomia}</p>
                    <p className=''><b>Capacidad de estanque</b> {data.data[0].capacidadEstanque}</p>
                    <p className=''><b>Cantidad de extintores</b> {data.data[0].cantidadTipoExtintores}</p>
                    <p className=''><b>Gabinetes</b> {data.data[0].gabinetes}</p>
                </div>
            </div>

            <div className={`md:h-[97.5%] md:w-[50%] flex flex-col gap-4`}>
                <div className="relative md:max-w-1/2">
                    <img className='rounded-lg h-full w-full object-cover' src={data.data[0].planoExtintores} alt="" />
                </div>
                {/* Las imagenes dentro de este contenedor */}
                <div className="flex bg-cyan-600 h-full">
                    <div className="w-1/2 md:w-1/4 flex-1">
                        <img className="h-full w-full object-cover object-center" src={data.data[0].rociadores} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fire


/*
<>
            <div className='w-full min-h-screen grid place-items-center'>
                <div className="grid grid-cols-12 grid-rows-12 rounded-xl bg-slate-700 h-[90%] gap-2 w-[95%] p-6 drop-shadow-lg shadow-white">
                    <div className='rounded-xl h-40 col-span-6 row-span-1 col-start-1 row-start-1 bg-slate-100 text-gray-900 first-line p-5'>
                        <p className=''><b>Autonomia</b> {data.data[0].tiempoAutonomia}</p>
                        <p className=''><b>Capacidad de estanque</b> {data.data[0].capacidadEstanque}</p>
                        <p className=''><b>Cantidad de extintores</b> {data.data[0].cantidadTipoExtintores}</p>
                        <p className=''><b>Gabinetes</b> {data.data[0].gabinetes}</p>
                    </div>

                    <div className="grid grid-cols-2 grid-rows-3 gap-4 col-start-7 row-start-1 col-span-6 row-span-1">
                        <div className="bg-slate-600 rounded-xl col-start-1 col-span-3 row-span-3 bg-cover bg-center"
                            style={{ backgroundImage: `url(${data.data[0].rociadores})` }}
                            onClick={() => handleModal(data.data[0].rociadores)}
                        >
                        </div>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-3 gap-4 col-start-7 row-start-2 col-span-6 row-span-2">
                        <div className="bg-slate-600 rounded-xl col-start-1 col-span-3 row-span-3 bg-cover bg-center"
                            style={{ backgroundImage: `url(${data.data[0].estanque})` }}
                            onClick={() => handleModal(data.data[0].estanque)}
                        >
                        </div>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-3gap-4 col-start-1 row-start-2 col-span-6 row-span-2">
                        <div className="bg-slate-600 rounded-xl col-start-1 col-span-3 row-span-3 bg-cover bg-center"
                            style={{ backgroundImage: `url(${data.data[0].planoExtintores})` }}
                            onClick={() => handleModal(data.data[0].planoExtintores)}
                        >
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <div className="grid transition-all place-items-center h-screen w-screen absolute z-[999999] overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none bg-gray-900">
                        <div id="menu" className="w-[90%] h-[90%]">
                            <div className="w-96 md:w-full md:h-full dark:bg-gray-800 relative flex flex-col justify-center items-center bg-gray-900 py-16 px-4 md:px-24 xl:pt-24 xl:px-36">
                                <div role="banner">
                                    <img src={modal} alt="" className='h-full pb-6' />
                                </div>
                                <button onClick={closeModal} className="text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
*/