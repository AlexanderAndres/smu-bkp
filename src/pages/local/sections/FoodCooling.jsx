import React, { useEffect, useState } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditFoodCooling from '../../../components/EditFoodCooling'
import PageLoader from '../../../components/loader/PageLoader'
import { fetchLocalFoodCooling } from '../../../state/slices/viewsSlice'

const FoodCooling = () => {
    const dispatch = useDispatch()

    const data = useSelector((state) => state.views.frio_alimentario?.data?.[0])
    const { ceco } = useSelector(state => state.views.local.data[0])

    const [dataFetched, setDataFetched] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (!dataFetched) {
            dispatch(fetchLocalFoodCooling(ceco)).then((data) => {
                setDataFetched(true)
                setLoading(false)
            })
        }

        return () => { }
    }, [])

    const handleNav = () => {
        navigate('/editFoodCooling')
    }

    if (loading || !data) {
        return <PageLoader show={loading ? true : false} />
    }


    return (
        <div className={`min-h-full h-full w-full pl-24 pr-4 pt-4 md:pl-28 md:pt-5 flex flex-col md:flex-row gap-4`}>
            <button onClick={handleNav}
                className='fixed rounded-full h-10 w-10 bg-orange-400 right-0 bottom-1 m-5 z-50 grid place-items-center hover:drop-shadow-md shadow-orange-500 hover:bg-orange-500 transition-all duration-150'>
                <AiTwotoneEdit />
            </button>
            <div className={`relative h-[50%] md:h-[97.5%] md:w-[50%] rounded-lg overflow-hidden`}>
                <div className="h-full w-full">
                    <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src={data.central} alt="" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 opacity-40 z-10"></div>
                <h2 className="absolute z-20 p-4 text-3xl font-semibold uppercase">Datos arquitectonicos</h2>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                    <p>{data.cantidadCentral}</p>
                    <p>{data.capacidadCentral}</p>
                    <p>{data.suministroCentral}</p>
                </div>
            </div>

            <div className={`md:h-[97.5%] md:w-[50%] flex flex-col gap-4`}>
                <div className="rounded-lg grid place-items-center md:h-[50%] p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900">
                    <div className={`font-medium text-lg`}>
                        <p>{data.unidadesCondensadoras ? `Posee ${data.unidadesCondensadoras} unidades condensadoras` : ''}</p>
                        <p>{data.unidadesCondensadoras ? `Capacidad de unidades condensadoras: ${data.capacidadUniConden}` : ''}</p>
                        <p>{data.unidadesCondensadoras ? `${data.suministroUniConden}` : ''}</p>
                    </div>
                </div>

                <div className="flex h-[50%]">
                    <div className="w-1/2 md:w-1/4 flex-1">
                        <img className="h-full w-full object-cover object-center" src={data.pic1} alt="" />
                    </div>
                    <div className="w-1/2 md:w-1/4 flex-1">
                        <img className="h-full w-full object-cover object-center" src={data.pic2} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FoodCooling

/*
<div className={`min-h-full h-full w-full pl-24 pr-4 pt-4 md:pl-28 md:pt-5 flex flex-col md:flex-row`}>
            <button onClick={handleNav}
                className='fixed rounded-full h-10 w-10 bg-orange-400 right-0 bottom-1 m-5 z-50 grid place-items-center hover:drop-shadow-md shadow-orange-500 hover:bg-orange-500 transition-all duration-150'>
                <AiTwotoneEdit />
            </button>
            
            <div className="relative h-96 w-full md:h-[97.5%] md:w-[50%] rounded-lg overflow-hidden">
                <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src={data.central} alt="" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 opacity-40 z-10"></div>
                <h2 className="absolute z-20 p-4 text-3xl font-semibold uppercase">Central</h2>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                    <p>{data.cantidadCentral}</p>
                    <p>{data.capacidadCentral}</p>
                    <p>{data.suministroCentral}</p>
                </div>
            </div>

            <div className="md:max-h-[97.5%] md:pl-4 md:mb-5 md:ml-4 relative pt-4 md:pt-0">
                <div className="rounded-lg grid place-items-center md:h-[50%] p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900">
                    <div className={`font-medium text-lg`}>
                        <p>{data.unidadesCondensadoras ? `Posee ${data.unidadesCondensadoras} unidades condensadoras` : ''}</p>
                        <p>{data.unidadesCondensadoras ? `Capacidad de unidades condensadoras: ${data.capacidadUniConden}` : ''}</p>
                        <p>{data.unidadesCondensadoras ? `${data.suministroUniConden}` : ''}</p>
                    </div>
                </div>

                <div className="flex relative flex-row mt-4 md:gap-20 justify-evenly items-center w-full h-[50%] md:h-auto md:flex-1 md:mt-24">
                    <div className="relative md:h-72 md:w-72 bg-slate-600 rounded-lg overflow-hidden">
                        <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src={data.pic1} alt="" />
                    </div>
                    <div className="relative md:h-72 md:w-72 bg-slate-600 rounded-lg overflow-hidden">
                        <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src={data.pic2} alt="" />
                    </div>
                </div>
            </div>
        </div>
*/