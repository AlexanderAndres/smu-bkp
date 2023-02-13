import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import {
    fetchLocalEvents,
    fetchLocal,
    fetchLocalArc,
    fetchLocalFire,
    fetchLocalMantenaince,
    fetchLocalIluminacion,
    fetchLocalCubierta,
    //fetchLocalCubierta
} from '../../state/slices/viewsSlice';
import Identificator from '../../components/views/Identificator';


const LocalLayout = () => {
    const { ceco } = useParams();
    const [loading, setLoading] = useState(true)
    const [dataFetched, setDataFetched] = useState(false);

    const dispatch = useDispatch()

    const dataFetch = [
        dispatch(fetchLocal(ceco)),
        dispatch(fetchLocalEvents(ceco)),
        dispatch(fetchLocalArc(ceco)),
        dispatch(fetchLocalFire(ceco)),
        dispatch(fetchLocalMantenaince(ceco)),
        dispatch(fetchLocalIluminacion(ceco)),
        dispatch(fetchLocalCubierta(ceco)),
    ]

    useEffect(() => {
        if (!dataFetched) {
            Promise.all(dataFetch).then(data => {
                //console.log('-> Promis All to fech state', data)
                setDataFetched(true)
                setLoading(false)
            })
        }

        return () => { }
    }, [])

    return (
        <>
            {/* heading section */}
            {/* sidebar section */}
            <Loader show={loading ? true : false} />
            <section className=''>
                <div className='grid grid-cols-12'>
                    <div className='col-span-3 bg-black h-screen md:col-span-2'>
                        <Sidebar />
                    </div>
                    <div className='col-span-10 bg-gray-900 grid h-screen pl-10 overflow-y-auto'>
                        <Identificator />
                        <Outlet className='h-full' ceco={ceco} />
                    </div>
                </div>
            </section>
        </>
    )

}

export default LocalLayout