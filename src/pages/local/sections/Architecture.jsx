import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HorizontalScroll from '../../../components/horizontalScroll/HorizontalScroll'
import PageLoader from '../../../components/loader/PageLoader'
import { fetchLocalArc } from '../../../state/slices/viewsSlice'

const Architecture = () => {

    const [modal, setModal] = useState({})
    const [showModal, setShowModal] = useState(false)
    const { ceco, name } = useSelector(state => state.views.local?.data?.[0])

    const dispatch = useDispatch()

    const [dataFetched, setDataFetched] = useState(false)
    const [loading, setLoading] = useState(true)

    const req = useSelector((state) => state.views.arquitectura)

    useEffect(() => {
        if (!dataFetched) {
            dispatch(fetchLocalArc(ceco)).then((data) => {
                setDataFetched(true)
                setLoading(false)
            })
        }

        return () => { }
    }, [])

    const closeModal = () => {
        setShowModal(false)
        setModal({})
    }

    const handleModal = (img) => {
        // console.log('Image from modal:', img)
        setModal(img)
        setShowModal(true)
    }

    if (loading || !req) {
        return <PageLoader show={loading ? true : false} />
    }

    return (
        <div className={`h-full w-full pl-24 pr-6 pt-6 pb-6 md:pl-36 md:pt-6 flex flex-col md:flex-col gap-4`}>
            <div className={`grid grid-cols-12 grid-rows-6 gap-6 h-full w-full bg-gray-800`}>
                <div className={`bg-red-900 col-span-4 row-span-6 rounded-lg`}>
                    <p className={`font-semibold w-full text-2xl py-4 pl-2`}>Caracteristicas tecnicas del local</p>
                    <p className=''><b>Sala ventas:</b>{req.data[0].salaVentas}</p>
                    <p className=''><b>Bodega:</b> {req.data[0].m2Bodega}</p>
                    <p className=''><b>Estacionamiento:</b> {req.data[0].m2Estacionamiento}</p>
                </div>
                <div className={`bg-red-600 col-span-8 row-span-3 rounded-lg`}>
                    a
                </div>
                <div className={`bg-red-900 col-span-8 row-span-3 rounded-lg`}>
                    a
                </div>
            </div>
        </div>
    )
}

export default Architecture

/* <h2 className='text-4xl w-full mt-5 mb-5 uppercase font-thin'>Datos arquitectonicos local <b className='font-semibold'>#{ceco} {name}</b></h2>
            <div className={`w-[95%] h-full mb-10 flex flex-row justify-between`}>
                <div className={`bg-slate-900 w-[32%] rounded-2xl p-4`}>
                    <p className={`font-semibold w-full text-2xl pb-4`}>Caracteristicas tecnicas del local</p>
                    <img src={req.data[0].interior} alt="" className={`h-[60%] w-full object-cover object-center rounded-lg`} />
                </div>
                <div className={`bg-slate-900 w-[32%] rounded-2xl p-4`}>
                    <p className={`font-semibold w-full text-2xl pb-4`}>Estacionamientos</p>
                    <img src={req.data[0].estacionamiento} alt="" className={`h-[60%] w-full object-cover object-center rounded-lg`} />
                </div>
                <div className={`bg-slate-900 w-[32%] rounded-2xl p-4`}>
                    <p className={`font-semibold w-full text-2xl pb-4`}>Detalle técnico</p>
                    <img src={req.data[0].plano} alt="" className={`h-[60%] w-full object-cover object-center rounded-lg`} />
                </div>
            </div> */

/*
<div className={`relative h-[50%] md:h-[97.5%] md:w-[50%] bg-cyan-600 rounded-lg overflow-hidden`}>
    <div className="h-full w-full">
        <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src={req.data[0].interior} alt="" />
    </div>
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 opacity-40 z-10"></div>
    <h2 className="absolute z-20 p-4 text-3xl font-semibold uppercase">Datos arquitectonicos</h2>
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
        <p className=''><b>Sala ventas:</b>{req.data[0].salaVentas}</p>
        <p className=''><b>Bodega:</b> {req.data[0].m2Bodega}</p>
        <p className=''><b>Estacionamiento:</b> {req.data[0].m2Estacionamiento}</p>
    </div>
</div>

<div className={`md:h-[97.5%] md:w-[50%] flex flex-col gap-4`}>
    <div className="relative md:max-w-1/2">
        <img className='rounded-lg h-full w-full object-cover' src={req.data[0].plano} alt="" />
    </div>
    
    <div className="flex bg-cyan-600 h-full">
        <div className="w-1/2 md:w-1/4 flex-1">
            <img className="h-full w-full object-cover object-center" src={req.data[0].bodega} alt="" />
        </div>
        <div className="w-1/2 md:w-1/4 flex-1">
            <img className="h-full w-full object-cover object-center" src={req.data[0].estacionamiento} alt="" />
        </div>
    </div>
</div>
*/