import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { fetchLocal, fetchLocalEvents } from '../../state/slices/viewsSlice';
import Identificator from '../../components/views/Identificator';


const LocalLayout = () => {
    const { ceco } = useParams();
    const [loading, setLoading] = useState(true)
    const [dataFetched, setDataFetched] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        if (!dataFetched) {
            dispatch(fetchLocal(ceco)).then(() => {
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
                        {dataFetched ? <Identificator /> : null}
                        {dataFetched ? <Outlet className='h-full' ceco={ceco} /> : null}
                    </div>
                </div>
            </section>
        </>
    )

}

export default LocalLayout