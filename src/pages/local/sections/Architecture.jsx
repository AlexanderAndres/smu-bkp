import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Identificator from '../../../components/views/Identificator'
//import { fetchLocalArc } from '../../../services/localService'

const Architecture = (props) => {
    const [modal, setModal] = useState({})
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const req = useSelector((state) => state.views.arquitectura)

    const closeModal = () => {
        setShowModal(false)
        setModal({})
    }

    const handleModal = (img) => {
        console.log('Image from modal:', img)
        setModal(img)
        setShowModal(true)
    }

    return (
        <div className='w-full min-h-screen bg-gray-900 p-6 flex flex-col items-center'>
            <div className="pt-4 w-full">
                <div className="grid grid-cols-2 grid-rows-3 gap-4">
                    <div className="bg-slate-50 text-slate-900 row-start-2 rounded-xl bg-cover bg-center p-6">
                        <p className='text-xl'>Sala ventas{req.data[0].name} </p>
                        <p>{req.data[0].salaVentas}</p>
                    </div>

                    <div className="bg-slate-600 rounded-xl col-start-2 row-span-3 grid place-items-center bg-cover bg-center"
                        style={{ backgroundImage: `url(${req.data[0].interior})` }}
                        onClick={() => handleModal(req.data[0].interior)}
                    >
                    </div>
                </div>

                <div className="grid grid-cols-2 grid-rows-3 gap-4">
                    <div className="bg-slate-50 text-slate-900 row-start-2 col-start-2 rounded-xl bg-cover bg-center p-6">
                        <p className='text-xl'>Bodega </p>
                        <p>{req.data[0].m2Bodega}</p>
                    </div>
                    <div className="bg-slate-600 rounded-xl row-span-3 grid place-items-center bg-cover bg-center"
                        style={{ backgroundImage: `url(${req.data[0].bodega})` }}
                        onClick={() => handleModal(req.data[0].bodega)}
                    >
                    </div>
                </div>

                <div className="grid grid-cols-2 grid-rows-3 gap-4">
                    <div className="bg-slate-50 text-slate-900 row-start-2 rounded-xl bg-cover bg-center p-6">
                        <p className='text-xl'>Estacionamiento </p>
                        <p>{req.data[0].m2Estacionamiento}</p>
                    </div>
                    <div className="bg-slate-600 rounded-xl col-start-2 row-span-3 grid place-items-center bg-cover bg-center"
                        style={{ backgroundImage: `url(${req.data[0].estacionamiento})` }}
                        onClick={() => handleModal(req.data[0].estacionamiento)}
                    >
                    </div>
                </div>
                {showModal ? (
                    <div className="grid place-items-center h-screen w-screen absolute z-[999999] overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none bg-gray-900">
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
        </div>

    )
}

export default Architecture