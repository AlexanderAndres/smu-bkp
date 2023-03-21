import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useDispatch } from 'react-redux';
import { fetchLocal, fetchLocalEvents } from '../../state/slices/viewsSlice';
import Identificator from '../../components/views/Identificator';
import NewSidebar from '../../components/sidebar/NewSidebar';


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
            <Loader show={loading ? true : false} />
            <section className='flex'>
                <NewSidebar />
                <div className='min-h-screen w-screen'>
                    {dataFetched ? <Outlet className='' ceco={ceco} /> : null}
                </div>
            </section>
        </>
    )

}

export default LocalLayout

/*
        <>
            <Loader show={loading ? true : false} />
            <section className='bg-gray-900'>
                <div className='grid grid-cols-10'>
                    <div className='col-span-2 h-screen md:col-span-2'>
                        <Sidebar />
                    </div>
                    <div className='col-span-8  grid h-screen overflow-y-auto'>
                        {dataFetched ? <Identificator /> : null}
                        {dataFetched ? <Outlet className='h-full' ceco={ceco} /> : null}
                    </div>
                </div>
            </section>
        </>
*/